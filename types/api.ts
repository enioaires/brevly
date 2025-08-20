// Tipos da API sem importar a implementação
export type ApiRoutes = {
    api: {
        url: {
            get: (options: { query: { page: string; limit: string } }) => Promise<any>;
            post: (body: { originalUrl: string }) => Promise<any>;
        };
        [key: string]: {
            get: (...args: any[]) => Promise<any>;
            post?: (...args: any[]) => Promise<any>;
            put?: (...args: any[]) => Promise<any>;
            delete?: (...args: any[]) => Promise<any>;
        };
    };
};