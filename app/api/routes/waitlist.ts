import { Elysia, t } from 'elysia'
import prisma from '@/lib/prisma'
import { errorCodes } from '@/lib/constants'
import { authenticateRequest } from '../plugins/auth'

// Schema para validação de email
const EmailSchema = t.Object({
    email: t.String({
        format: 'email',
        description: 'Valid email address'
    })
})

// Schema para resposta da waitlist entry
const WaitlistEntrySchema = t.Object({
    id: t.String(),
    email: t.String(),
    createdAt: t.Date()
})

// Schema para resposta de sucesso
const SuccessResponseSchema = t.Object({
    success: t.Literal(true),
    data: WaitlistEntrySchema
})

// Schema para resposta de lista
const ListResponseSchema = t.Object({
    success: t.Literal(true),
    data: t.Array(WaitlistEntrySchema),
    count: t.Number()
})

// Schema para resposta de erro
const ErrorResponseSchema = t.Object({
    success: t.Literal(false),
    error: t.Object({
        code: t.String(),
        message: t.String(),
        details: t.Optional(t.Any())
    })
})

export const waitlistRoutes = new Elysia({ prefix: '/waitlist' })
    // POST /api/waitlist - Endpoint público para inscrições
    .post('/', async ({ body, set }) => {
        try {
            const { email } = body

            // Validação adicional de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                set.status = 400
                return {
                    success: false,
                    error: {
                        code: 'INVALID_EMAIL',
                        message: 'Please provide a valid email address'
                    }
                }
            }

            // Normalizar email (lowercase)
            const normalizedEmail = email.toLowerCase().trim()

            // Tentar criar a entrada na waitlist
            const waitlistEntry = await prisma.waitlist.create({
                data: {
                    email: normalizedEmail
                }
            })

            set.status = 201
            return {
                success: true,
                data: waitlistEntry
            }

        } catch (error: any) {
            // Tratar erro de email duplicado
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                set.status = 409
                return {
                    success: false,
                    error: {
                        code: 'DUPLICATE_EMAIL',
                        message: 'This email is already on the waitlist'
                    }
                }
            }

            // Erro genérico
            set.status = 500
            return {
                success: false,
                error: {
                    code: errorCodes.INTERNAL_ERROR,
                    message: 'Failed to add email to waitlist',
                    details: process.env.NODE_ENV === 'development' ? error : undefined
                }
            }
        }
    }, {
        body: EmailSchema,
        response: t.Union([SuccessResponseSchema, ErrorResponseSchema]),
        detail: {
            summary: 'Join waitlist',
            description: 'Add an email to the waitlist for product notifications',
            tags: ['Waitlist']
        }
    })

    // GET /api/waitlist - Endpoint protegido para listar inscrições
    .derive(async ({ cookie }) => {
        const { authenticated, userId } = await authenticateRequest(cookie)
        return {
            auth: {
                authenticated,
                userId
            }
        }
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
    .get('/', async ({ auth, set }) => {
        try {
            // Verificar autenticação
            if (!auth.authenticated || !auth.userId) {
                set.status = 401
                return {
                    success: false,
                    error: {
                        code: errorCodes.AUTH_ERROR,
                        message: 'Authentication required to access waitlist data'
                    }
                }
            }

            // Buscar todas as entradas da waitlist ordenadas por data de criação (mais recentes primeiro)
            const waitlistEntries = await prisma.waitlist.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return {
                success: true,
                data: waitlistEntries,
                count: waitlistEntries.length
            }

        } catch (error) {
            set.status = 500
            return {
                success: false,
                error: {
                    code: errorCodes.INTERNAL_ERROR,
                    message: 'Failed to fetch waitlist entries',
                    details: process.env.NODE_ENV === 'development' ? error : undefined
                }
            }
        }
    }, {
        response: t.Union([ListResponseSchema, ErrorResponseSchema]),
        detail: {
            summary: 'Get waitlist entries',
            description: 'Retrieve all waitlist entries (requires authentication)',
            tags: ['Waitlist']
        }
    })