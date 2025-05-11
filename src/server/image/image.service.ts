import { ImageRepository } from './image.repository';
import { GenerateImageDto } from './image.validation';
import { Image } from '../../../generated/prisma/client';

export class ImageService {
    private repository: ImageRepository;

    constructor() {
        this.repository = new ImageRepository();
    }

    async generateImage(userId: string, dto: GenerateImageDto): Promise<Image> {
        // 1. Create a pending image record in the database
        const imageRecord = await this.repository.createImage(userId, dto.prompt, dto.model, dto.size);

        try {
            // 2. Here you would normally call your external AI provider
            // e.g., const response = await openai.images.generate({ prompt: dto.prompt })
            // For now, we simulate a delay and mock a generation
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const mockImageUrl = `https://via.placeholder.com/${dto.size?.replace('x', '') || '512'}.png?text=${encodeURIComponent(dto.prompt)}`;

            // 3. Update the record to SUCCESS with the new URL
            return await this.repository.updateImage(imageRecord.id, {
                status: 'SUCCESS',
                imageUrl: mockImageUrl,
            });
        } catch (error) {
            // 4. Update the record to FAILED on error
            await this.repository.updateImage(imageRecord.id, { status: 'FAILED' });
            throw new Error('Image generation failed');
        }
    }

    async getUserImages(userId: string): Promise<Image[]> {
        return this.repository.findAllByUserId(userId);
    }

    async getImageById(id: string): Promise<Image | null> {
        return this.repository.findById(id);
    }

    async regenerateImage(id: string): Promise<Image> {
        const existingImage = await this.getImageById(id);
        if (!existingImage) {
            throw new Error('Image not found');
        }

        // Reuse the previous parameters (we'll just call the same generation logic for the same user)
        // To strictly follow regenerate, we update its status to PENDING or create a new one.
        // Usually, regeneration creates a new record. Let's create a new record.
        return this.generateImage(existingImage.userId, {
            prompt: existingImage.prompt,
            model: existingImage.model || undefined,
            size: existingImage.size || undefined,
        });
    }

    async deleteUserImage(id: string, userId: string): Promise<void> {
        const existingImage = await this.getImageById(id);
        if (!existingImage) {
            throw new Error('Image not found');
        }
        if (existingImage.userId !== userId) {
            throw new Error('Forbidden'); // Using a general message, controller map to 403
        }

        await this.repository.deleteImage(id);
    }
}
