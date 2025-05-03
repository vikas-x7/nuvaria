import { NextRequest } from 'next/server';
import { ImageController } from '../../../../server/image/image.controller';

const controller = new ImageController();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return controller.handleGetById(req, { params });
}
