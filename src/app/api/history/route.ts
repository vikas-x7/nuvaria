import { NextRequest } from 'next/server';
import { ImageController } from '@/src/server/image/image.controller';

const controller = new ImageController();

export async function GET(req: NextRequest) {
    return controller.handleGetAll(req);
}
