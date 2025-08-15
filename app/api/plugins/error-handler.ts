import { Prisma } from '@/app/generated/prisma/client'
import { Elysia } from 'elysia'

// Classe de erro customizada seguindo a documentação do Elysia
class AppError extends Error {
    status: number
    code: string
    details?: any

    constructor(message: string, code: string, status: number = 500, details?: any) {
        super(message)
        this.name = 'AppError'
        this.status = status
        this.code = code
        this.details = details
    }

    toResponse() {
        return {
            success: false,
            error: {
                code: this.code,
                message: this.message,
                details: this.details
            },
            timestamp: new Date().toISOString()
        }
    }
}

// Códigos de erro padronizados
export const ErrorCodes = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
    DATABASE_ERROR: 'DATABASE_ERROR',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    RATE_LIMIT: 'RATE_LIMIT'
} as const

export { AppError }

export const errorHandler = new Elysia({ name: 'error-handler' })
    .error('APP_ERROR', AppError)
    .onError(({ code, error, set }) => {
        console.log('🔥 ERROR HANDLER TRIGGERED! Code:', code)
        const timestamp = new Date().toISOString()

        // Log do erro
        console.error(`[${timestamp}] Error:`, {
            code,
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        })

        // Tratamento para AppError customizado
        if (code === 'APP_ERROR') {
            set.status = error.status
            return error.toResponse()
        }

        // Tratamento para erros do Prisma
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            let status = 500
            let errorCode: keyof typeof ErrorCodes = 'DATABASE_ERROR'
            let message = 'Database error occurred'

            switch (error.code) {
                case 'P2002':
                    status = 409
                    errorCode = ErrorCodes.DUPLICATE_ENTRY
                    message = 'A record with this data already exists'
                    break
                case 'P2025':
                    status = 404
                    errorCode = ErrorCodes.NOT_FOUND
                    message = 'Record not found'
                    break
                case 'P2003':
                    status = 400
                    errorCode = ErrorCodes.VALIDATION_ERROR
                    message = 'Foreign key constraint failed'
                    break
            }

            set.status = status
            return {
                success: false,
                error: {
                    code: errorCode,
                    message,
                    details: process.env.NODE_ENV === 'development' ? error.meta : undefined
                },
                timestamp
            }
        }

        // Tratamento para erros de validação do Elysia
        if (code === 'VALIDATION') {
            set.status = 400
            return {
                success: false,
                error: {
                    code: ErrorCodes.VALIDATION_ERROR,
                    message: 'Validation failed',
                    details: error instanceof Error ? error.message : String(error)
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
                    code: ErrorCodes.NOT_FOUND,
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
                code: ErrorCodes.INTERNAL_ERROR,
                message: process.env.NODE_ENV === 'production'
                    ? 'Internal server error'
                    : error instanceof Error ? error.message : String(error),
                details: process.env.NODE_ENV === 'development'
                    ? error instanceof Error ? error.stack : String(error)
                    : undefined
            },
            timestamp
        }
    })