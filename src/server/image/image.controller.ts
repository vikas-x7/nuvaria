import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { ImageService } from './image.service';
import { generateImageSchema, idSchema } from './image.validation';
import { z } from 'zod';

export class ImageController {
    private service: ImageService;

    constructor() {
        this.service = new ImageService();
    }

    // Helper to extract the authenticated user id
    private async getUserId(req: NextRequest): Promise<string> {
        const session = await auth();
        console.log("ImageController session:", session);
        if (!session?.user?.id) {
            console.error("Unauthorized: Session or User ID is missing in image.");
            if (process.env.NODE_ENV === 'development') {
                console.warn("Using fallback dummy-user-id for development testing.");
                return 'dummy-user-id';
            }
            throw new Error('Unauthorized');
        }
        return session.user.id;
    }

    async handleGenerate(req: NextRequest) {
        try {
            const body = await req.json();
            const parsedBody = generateImageSchema.parse(body);
            const userId = await this.getUserId(req);

            const result = await this.service.generateImage(userId, parsedBody);
            return NextResponse.json({ success: true, data: result }, { status: 201 });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
            }
            const msg = error instanceof Error ? error.message : 'Unknown error';
            return NextResponse.json({ success: false, error: msg }, { status: 500 });
        }
    }

    async handleGetAll(req: NextRequest) {
        try {
            const userId = await this.getUserId(req);
            const images = await this.service.getUserImages(userId);
            return NextResponse.json({ success: true, data: images }, { status: 200 });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Unknown error';
            return NextResponse.json({ success: false, error: msg }, { status: 500 });
        }
    }

    async handleGetById(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            // Need to await params in Next.js 15+ sometimes, but next-env.d.ts doesn't specify version.
            // Assuming params is synchronous or handled by Next.js app router.
            const paramId = idSchema.parse({ id: params.id }).id;

            const image = await this.service.getImageById(paramId);
            if (!image) {
                return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: image }, { status: 200 });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
            }
            const msg = error instanceof Error ? error.message : 'Unknown error';
            return NextResponse.json({ success: false, error: msg }, { status: 500 });
        }
    }

    async handleRegenerate(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            const paramId = idSchema.parse({ id: params.id }).id;

            const result = await this.service.regenerateImage(paramId);
            return NextResponse.json({ success: true, data: result }, { status: 201 });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
            }
            const msg = error instanceof Error ? error.message : 'Unknown error';
            if (msg === 'Image not found') {
                return NextResponse.json({ success: false, error: msg }, { status: 404 });
            }
            return NextResponse.json({ success: false, error: msg }, { status: 500 });
        }
    }

    async handleDelete(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            const paramId = idSchema.parse({ id: params.id }).id;
            const userId = await this.getUserId(req);

            await this.service.deleteUserImage(paramId, userId);
            // Reusing NextResponse with just success since 200 is default or empty 204
            return NextResponse.json({ success: true, message: 'Generation deleted successfully' }, { status: 200 });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
            }
            const msg = error instanceof Error ? error.message : 'Unknown error';
            if (msg === 'Image not found') {
                return NextResponse.json({ success: false, error: msg }, { status: 404 });
            }
            if (msg === 'Forbidden') {
                return NextResponse.json({ success: false, error: 'Only owner can delete' }, { status: 403 });
            }
            return NextResponse.json({ success: false, error: msg }, { status: 500 });
        }
    }
}
