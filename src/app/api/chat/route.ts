import { NextRequest } from 'next/server';
import { ChatController } from '@/src/server/chat/chat.controller';

const controller = new ChatController();

export async function GET(req: NextRequest) {
    return controller.handleGetAll(req);
}

export async function POST(req: NextRequest) {
    return controller.handleCreate(req);
}
