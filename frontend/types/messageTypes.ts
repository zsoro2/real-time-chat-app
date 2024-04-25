interface ChatMessageResponse {
    message: ChatMessageContent,
    chat: object
}

interface ChatMessageContent {
    content: string,
    chatId: number,
    userId: number
}