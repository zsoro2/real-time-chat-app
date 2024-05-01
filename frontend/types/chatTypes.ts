import { ApiPaginationResponse } from "@/types/apiResponseTypes";

export interface Chat {
    chatId: number;
    messages: ChatMessage[];
    lastMessage: string;
    participantUsername: string;
    participantUserId: number;
}

export interface ChatMessage {
    id: number,
    userId: number;
    chatId: number;
    content: string;
    senderUsername: string;
    status: string;
    imageUrl: string | null;
    createdAt: string;
}

export interface UseChatsReturn {
    chats?: ApiPaginationResponse<Chat[]>;
    chatsAreLoading: boolean;
    chatsHasError: Error | undefined;
    mutate: void;
}