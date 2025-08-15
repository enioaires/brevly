import { Elysia } from 'elysia'
import { generateShortId } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { UrlPlain, UrlPlainInputCreate } from '@/generated/prismabox/Url';


export const urlRoutes = new Elysia({ prefix: '/url' })
    .post('/', async ({ body }) => {
        const shortId = generateShortId()

        const url = await prisma.url.create({
            data: {
                ...body,
                shortId
            }
        });

        return url;
    }, {
        body: UrlPlainInputCreate,
        response: UrlPlain,
    })