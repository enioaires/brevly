import { App } from "@/app/api/[[...slugs]]/route";
import { treaty } from "@elysiajs/eden";

export const useElysiaClient = () => {
    const getClient = () => {
        const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
        
        return treaty<App>(baseUrl);
    };
    
    return { getClient };
};