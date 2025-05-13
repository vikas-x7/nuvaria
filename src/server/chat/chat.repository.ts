import { prisma } from '@/lib/prisma';
import { Chat, Image } from '../../../generated/prisma/client';

export type ChatWithImages = Chat & { images: Image[] };

export class ChatRepository {
    async createChat(userId: string, title?: string): Promise<Chat> {
        return prisma.chat.create({
            data: {
                userId,
                title: title || 'New Chat',
            },
        });
    }

    async findAllByUserId(userId: string): Promise<Chat[]> {
        return prisma.chat.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string, userId: string): Promise<ChatWithImages | null> {
        return prisma.chat.findUnique({
            where: { id, userId },
            include: {
                images: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });
    }

    async updateTitle(id: string, userId: string, title: string): Promise<Chat> {
        return prisma.chat.update({
            where: { id, userId },
            data: { title },
        });
    }

    async deleteChat(id: string, userId: string): Promise<void> {
        await prisma.chat.delete({
            where: { id, userId },
        });
    }
}
