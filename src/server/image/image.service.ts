import { ImageRepository } from './image.repository';
import { GenerateImageDto } from './image.validation';
import { Image } from '../../../generated/prisma/client';

export class ImageService {
  private repository: ImageRepository;

  constructor() {
    this.repository = new ImageRepository();
  }

  async generateImage(userId: string, dto: GenerateImageDto): Promise<Image> {
    const imageRecord = await this.repository.createImage(userId, dto.prompt, dto.model, dto.size, dto.chatId);

    try {
      const apiKey = process.env.IMAGE_GENERATION_API_KEY;
      if (!apiKey) {
        throw new Error('IMAGE_GENERATION_API_KEY is not set in environment variables');
      }

      const apiUrl = process.env.IMAGE_GENERATION_API_URL || 'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3.5-large';

      console.log(`[ImageService] Calling API: ${apiUrl}`);
      console.log(`[ImageService] Prompt: "${dto.prompt}"`);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'image/*',
        },
        body: JSON.stringify({
          inputs: dto.prompt,
          parameters: {
            negative_prompt: '',
            width: 1024,
            height: 1024,
          },
        }),
      });

      console.log(`[ImageService] API response status: ${response.status} ${response.statusText}`);
      console.log(`[ImageService] Content-Type: ${response.headers.get('content-type')}`);

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[ImageService] API Error Body: ${errText}`);
        throw new Error(`API returned ${response.status}: ${errText}`);
      }

      const contentType = response.headers.get('content-type') || '';

      let imageUrl = '';

      if (contentType.startsWith('image/')) {
        // HuggingFace returns raw image bytes — convert to base64 data URI
        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const mimeType = contentType.split(';')[0].trim();
        imageUrl = `data:${mimeType};base64,${base64}`;
        console.log(`[ImageService] Got image binary, size: ${buffer.byteLength} bytes`);
      } else {
        // JSON response (OpenAI-compatible or other providers)
        const data = await response.json();
        if (data.data?.[0]?.b64_json) {
          imageUrl = `data:image/png;base64,${data.data[0].b64_json}`;
        } else if (data.data?.[0]?.url) {
          imageUrl = data.data[0].url;
        } else if (data.image) {
          imageUrl = `data:image/png;base64,${data.image}`;
        } else {
          console.error('[ImageService] Unknown JSON response:', JSON.stringify(data).substring(0, 200));
          throw new Error('Unknown API response format');
        }
      }

      return await this.repository.updateImage(imageRecord.id, {
        status: 'SUCCESS',
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error('[ImageService] Generation error:', error);
      await this.repository.updateImage(imageRecord.id, { status: 'FAILED' });
      const msg = error instanceof Error ? error.message : 'Image generation failed';
      throw new Error(msg);
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

    return this.generateImage(existingImage.userId, {
      prompt: existingImage.prompt,
      model: existingImage.model || undefined,
      size: existingImage.size || undefined,
      chatId: existingImage.chatId || undefined,
    });
  }

  async deleteUserImage(id: string, userId: string): Promise<void> {
    const existingImage = await this.getImageById(id);
    if (!existingImage) {
      throw new Error('Image not found');
    }
    if (existingImage.userId !== userId) {
      throw new Error('Forbidden');
    }

    await this.repository.deleteImage(id);
  }
}
