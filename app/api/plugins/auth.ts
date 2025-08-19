import { verifyToken } from "@clerk/backend";
import { Cookie } from "elysia";

export async function authenticateRequest(cookies: Record<string, Cookie<string | undefined>>) {
    try {
        // Pega o token do cookie que o Clerk envia automaticamente
        const sessionCookie = cookies['__session'] || cookies['__clerk_session'];
        const token = sessionCookie?.value;

        if (!token) {
            return { authenticated: false, userId: null };
        }

        const verified = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY!,
        });

        return {
            authenticated: true,
            userId: verified.sub
        };
    } catch (error) {
        console.error('Session verification failed:', error);
        return { authenticated: false, userId: null };
    }
}