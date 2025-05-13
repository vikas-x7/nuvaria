import { z } from 'zod';

export const createChatSchema = z.object({
    title: z.string().optional(),
});

export const chatIdSchema = z.object({
    id: z.string().min(1, 'Chat ID is required'),
});

export type CreateChatDto = z.infer<typeof createChatSchema>;
