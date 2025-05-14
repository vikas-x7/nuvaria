import { NextRequest } from 'next/server';
import { ChatController } from '@/src/server/chat/chat.controller';

const controller = new ChatController();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return controller.handleGetById(req, { params });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return controller.handleDelete(req, { params });
}
