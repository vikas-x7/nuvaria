import { z } from 'zod';

export const generateImageSchema = z.object({
    prompt: z.string().min(1, 'Prompt is required').max(1000, 'Prompt too long'),
    model: z.string().optional(),
    size: z.string().optional(),
});

export const idSchema = z.object({
    id: z.string().min(1, 'ID is required'),
});

export type GenerateImageDto = z.infer<typeof generateImageSchema>;
