import { ChatRepository, ChatWithImages } from './chat.repository';

export class ChatService {
    private repository: ChatRepository;

    constructor() {
        this.repository = new ChatRepository();
    }

    async createChat(userId: string, title?: string) {
        return this.repository.createChat(userId, title);
    }

    async getUserChats(userId: string) {
        return this.repository.findAllByUserId(userId);
    }

    async getChatById(id: string, userId: string): Promise<ChatWithImages> {
        const chat = await this.repository.findById(id, userId);
        if (!chat) {
            throw new Error('Chat not found');
        }
        return chat;
    }

    async updateTitle(id: string, userId: string, title: string) {
        return this.repository.updateTitle(id, userId, title);
    }

    async deleteChat(id: string, userId: string) {
        return this.repository.deleteChat(id, userId);
    }
}
