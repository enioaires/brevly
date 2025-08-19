import { useElysiaClient } from "@/lib/elysia-client";
import { useQuery } from "@tanstack/react-query"

export const useGetShortUrl = (shortId: string) => {
    const { getClient } = useElysiaClient();
    
    return useQuery({
        queryKey: ['url/shortId', shortId],
        queryFn: async () => {
            const client = getClient();
            const response = await client.api.url({ shortId }).get()

            if (!response.data) {
                throw new Error('No response data')
            }

            if (!response.data.success) {
                throw new Error('URL not found')
            }

            if ('data' in response.data) {
                return response.data.data
            }

            throw new Error('Invalid response format')
        }
    })
}