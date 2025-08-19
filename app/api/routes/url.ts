import { Elysia, t } from 'elysia'
import { generateShortId } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { UrlPlain, UrlPlainInputCreate } from '@/generated/prismabox/Url';
import { errorCodes } from '@/lib/constants';
import { authenticateRequest } from '../plugins/auth';

export const UrlWithShortLink = t.Composite([
    UrlPlain,
    t.Object({
        shortLink: t.String()
    })
]);

export const urlRoutes = new Elysia({ prefix: '/url' })
    .derive(async ({ cookie }) => {
        const { authenticated, userId } = await authenticateRequest(cookie);

        return {
            auth: {
                authenticated,
                userId
            }
        };
    })
    .onBeforeHandle(async ({ auth, set }) => {
        if (!auth.authenticated || !auth.userId) {
            set.status = 401;
            return {
                success: false,
                error: {
                    code: errorCodes.AUTH_ERROR,
                    message: 'Você precisa estar autenticado para usar essa rota'
                }
            };
        }
    })
    .post('/', async ({ body, headers, set, auth }) => {
        try {
            if (!body.originalUrl) {
                set.status = 400;
                return {
                    success: false,
                    error: {
                        code: errorCodes.VALIDATION_ERROR,
                        message: 'URL original é obrigatória'
                    }
                };
            }

            try {
                new URL(body.originalUrl);
            } catch {
                set.status = 400;
                return {
                    success: false,
                    error: {
                        code: errorCodes.INVALID_URL,
                        message: 'URL inválida. Por favor, forneça uma URL válida incluindo o protocolo (http:// ou https://)'
                    }
                };
            }

            let shortId = generateShortId();
            let attempts = 0;
            const maxAttempts = 5;

            while (attempts < maxAttempts) {
                const existing = await prisma.url.findUnique({
                    where: { shortId }
                });

                if (!existing) break;

                shortId = generateShortId();
                attempts++;
            }

            if (attempts === maxAttempts) {
                set.status = 500;
                return {
                    success: false,
                    error: {
                        code: errorCodes.GENERATION_ERROR,
                        message: 'Não foi possível gerar um ID único. Tente novamente.'
                    }
                };
            }

            const host = headers.host || 'localhost:3000';
            const protocol = headers['x-forwarded-proto'] || 'http';
            const baseUrl = `${protocol}://${host}`;

            const url = await prisma.url.create({
                data: {
                    ...body,
                    shortId,
                    // Adiciona o userId do usuário autenticado
                    createdBy: auth.userId as string
                }
            });

            set.status = 201;

            return {
                ...url,
                shortLink: `${baseUrl}/${url.shortId}`
            };
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                error: {
                    code: errorCodes.INTERNAL_ERROR,
                    message: 'Erro ao criar URL encurtada',
                    details: process.env.NODE_ENV === 'development' ? error : undefined
                }
            };
        }
    }, {
        body: UrlPlainInputCreate,
        response: t.Union([
            UrlWithShortLink,
            t.Object({
                success: t.Boolean(),
                error: t.Object({
                    code: t.String(),
                    message: t.String(),
                    details: t.Optional(t.Any())
                })
            })
        ]),
        detail: {
            summary: 'Criar URL encurtada',
            description: 'Cria uma nova URL encurtada e retorna o link completo',
            tags: ['URL']
        }
    })
    .get('/:shortId', async ({ params: { shortId }, set }) => {
        const url = await prisma.url.findUnique({
            where: { shortId }
        });

        if (!url) {
            set.status = 404;
            return {
                success: false,
                error: {
                    code: errorCodes.NOT_FOUND,
                    message: 'URL não encontrada'
                }
            };
        }

        await prisma.url.update({
            where: { shortId },
            data: { clicks: { increment: 1 } }
        });

        return {
            success: true,
            data: url
        }
    }, {
        params: t.Object({
            shortId: t.String()
        }),
        response: t.Union([
            t.Object({
                success: t.Boolean(),
                data: UrlPlain
            }),
            t.Object({
                success: t.Boolean(),
                error: t.Object({
                    code: t.String(),
                    message: t.String(),
                    details: t.Optional(t.Any())
                })
            })
        ]),
        detail: {
            summary: 'Buscar URL por shortId',
            description: 'Busca uma URL pelo seu ID curto e incrementa o contador de cliques',
            tags: ['URL']
        }
    })