export interface ChatMessageResponse {
    message: ChatMessageContent,
    chat: object
}

export interface ChatMessageContent {
    content: string,
    chatId: number,
    userId: number
}