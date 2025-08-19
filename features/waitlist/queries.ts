import { useElysiaClient } from "@/lib/elysia-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types for waitlist API responses
interface WaitlistEntry {
    id: string;
    email: string;
    createdAt: Date;
}

interface WaitlistCreateResponse {
    success: true;
    data: WaitlistEntry;
}

interface WaitlistListResponse {
    success: true;
    data: WaitlistEntry[];
    count: number;
}

interface WaitlistErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
}

// Mutation for creating waitlist entries (public)
export const useCreateWaitlistEntry = () => {
    const { getClient } = useElysiaClient();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (email: string) => {
            const client = getClient();
            const response = await client.api.waitlist.post({ email });

            if (!response.data) {
                throw new Error('No response data');
            }

            if (!response.data.success) {
                const errorResponse = response.data as WaitlistErrorResponse;
                throw new Error(errorResponse.error.message);
            }

            const successResponse = response.data as WaitlistCreateResponse;
            return successResponse.data;
        },
        onSuccess: () => {
            // Invalidate waitlist queries to refresh admin data
            queryClient.invalidateQueries({ queryKey: ['waitlist'] });
        }
    });
};

// Query for getting waitlist entries (protected - admin only)
export const useGetWaitlistEntries = () => {
    const { getClient } = useElysiaClient();
    
    return useQuery({
        queryKey: ['waitlist'],
        queryFn: async () => {
            const client = getClient();
            const response = await client.api.waitlist.get();

            if (!response.data) {
                throw new Error('No response data');
            }

            if (!response.data.success) {
                const errorResponse = response.data as WaitlistErrorResponse;
                throw new Error(errorResponse.error.message);
            }

            const successResponse = response.data as WaitlistListResponse;
            return {
                entries: successResponse.data,
                count: successResponse.count
            };
        }
    });
};