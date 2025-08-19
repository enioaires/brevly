import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { opentelemetry } from '@elysiajs/opentelemetry'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { urlRoutes } from '../routes/url'

export const app = new Elysia({ prefix: '/api' })
    .onError(({ code, error, set }) => {
        const timestamp = new Date().toISOString()

        // Tratamento para erros de validação do Elysia
        if (code === 'VALIDATION') {
            set.status = 400

            let details = undefined
            let message = 'Validation failed'

            try {
                const errorStr = error instanceof Error ? error.message : String(error)
                const validationError = JSON.parse(errorStr)

                if (validationError.errors && Array.isArray(validationError.errors)) {
                    // Extrai mensagens mais legíveis dos erros
                    details = validationError.errors.map((err: any) => ({
                        field: err.path?.replace('/', '') || 'unknown',
                        message: err.summary || err.message || 'Invalid value'
                    }))

                    // Cria uma mensagem mais amigável
                    const fieldNames = details.map((d: any) => d.field).join(', ')
                    message = `Validation failed for: ${fieldNames}`
                }
            } catch {
                // Se não conseguir fazer parse, usa o erro original
                details = error instanceof Error ? error.message : String(error)
            }

            return {
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message,
                    details
                },
                timestamp
            }
        }

        // Tratamento para NOT_FOUND
        if (code === 'NOT_FOUND') {
            set.status = 404
            return {
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Endpoint not found'
                },
                timestamp
            }
        }

        // Erro genérico
        set.status = 500
        return {
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: process.env.NODE_ENV === 'production'
                    ? 'Internal server error'
                    : error instanceof Error ? error.message : String(error)
            },
            timestamp
        }
    })
    .use(swagger())
    .use(
        opentelemetry({
            spanProcessors: [
                new BatchSpanProcessor(
                    new OTLPTraceExporter({
                        url: 'https://api.axiom.co/v1/traces',
                        headers: {
                            Authorization: `Bearer ${process.env.AXIOM_TOKEN}`,
                            'X-Axiom-Dataset': process.env.AXIOM_DATASET || 'brevly',
                        }
                    })
                )
            ]
        })
    )
    .get('/health', () => ({
        message: 'Hello World! API is running 🚀',
        timestamp: new Date().toISOString()
    }))

    .use(urlRoutes)

export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle

export type App = typeof app