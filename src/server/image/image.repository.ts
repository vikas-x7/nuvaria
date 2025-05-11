import { prisma } from '@/lib/prisma';
import { Image } from '../../../generated/prisma/client';

export class ImageRepository {
    async createImage(userId: string, prompt: string, model?: string, size?: string): Promise<Image> {
        return prisma.image.create({
            data: {
                userId,
                prompt,
                model,
                size,
                status: 'PENDING',
                imageUrl: '', // Will be updated later
            },
        });
    }

    async updateImage(id: string, updateData: Partial<Pick<Image, 'status' | 'imageUrl' | 'model' | 'size'>>): Promise<Image> {
        return prisma.image.update({
            where: { id },
            data: updateData,
        });
    }

    async findAllByUserId(userId: string): Promise<Image[]> {
        return prisma.image.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string): Promise<Image | null> {
        return prisma.image.findUnique({
            where: { id },
        });
    }

    async deleteImage(id: string): Promise<void> {
        await prisma.image.delete({
            where: { id },
        });
    }
}
