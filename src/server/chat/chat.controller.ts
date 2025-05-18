import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { ChatService } from './chat.service';
import { createChatSchema, chatIdSchema } from './chat.validation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export class ChatController {
  private service: ChatService;

  constructor() {
    this.service = new ChatService();
  }

  private async getUserId(): Promise<string> {
    const session = await auth();
    console.log('ChatController session:', session);
    if (!session?.user?.id) {
      console.error('Unauthorized: Session or User ID is missing in chat.');
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using fallback dummy-user-id for development testing.');
        // Ensure the dummy user exists in the database
        const existingUser = await prisma.user.findUnique({ where: { id: 'dummy-user-id' } });
        if (!existingUser) {
          await prisma.user.create({ data: { id: 'dummy-user-id', name: 'Dev User', email: 'dev@test.com' } });
        }
        return 'dummy-user-id';
      }
      throw new Error('Unauthorized');
    }
    return session.user.id;
  }

  async handleCreate(req: NextRequest) {
    try {
      const body = await req.json().catch(() => ({}));
      const parsedBody = createChatSchema.parse(body);
      const userId = await this.getUserId();

      const result = await this.service.createChat(userId, parsedBody.title);
      return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
      }
      if (error instanceof Error && error.message === 'Unauthorized') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
  }

  async handleGetAll(req: NextRequest) {
    try {
      const userId = await this.getUserId();
      const chats = await this.service.getUserChats(userId);
      return NextResponse.json({ success: true, data: chats }, { status: 200 });
    } catch (error) {
      console.error('handleGetAll error:', error);
      if (error instanceof Error && error.message === 'Unauthorized') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
  }

  async handleGetById(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const paramId = chatIdSchema.parse({ id: params.id }).id;
      const userId = await this.getUserId();

      const chat = await this.service.getChatById(paramId, userId);
      return NextResponse.json({ success: true, data: chat }, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
      }
      if (error instanceof Error && error.message === 'Unauthorized') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      if (error instanceof Error && error.message === 'Chat not found') {
        return NextResponse.json({ success: false, error: 'Chat not found' }, { status: 404 });
      }
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
  }

  async handleDelete(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const paramId = chatIdSchema.parse({ id: params.id }).id;
      const userId = await this.getUserId();

      await this.service.deleteChat(paramId, userId);
      return NextResponse.json({ success: true, message: 'Chat deleted correctly' }, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
      }
      if (error instanceof Error && error.message === 'Unauthorized') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
  }
}
