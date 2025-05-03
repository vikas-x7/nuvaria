import { NextRequest } from 'next/server';
import { ImageController } from '../../../../../server/image/image.controller';

const controller = new ImageController();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    return controller.handleRegenerate(req, { params });
}
