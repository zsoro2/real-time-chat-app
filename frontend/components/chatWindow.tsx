import { useEffect, useState, useRef } from "react";
import { useUser } from "@/hooks/useUser";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

interface ChatMessage {
  userId: number;
  chatId: number;
  content: string;
  senderUsername: string;
  status: string;
  imageUrl: string | null;
  createdAt: string;
}

const ChatWindow = ({ chat }) => {
  const { user } = useUser();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="flex flex-col gap-4">
        {chat?.messages?.map((message: ChatMessage) => (
          <div
            key={message.chatId}
            className={`flex items-start gap-2 ${
              message.userId === user.id ? "text-right self-end" : ""
            }`}
          >
            <Avatar>
              <AvatarImage alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{message.senderUsername}</div>
              <div className="line-clamp-1 text-xs">{message.createdAt}</div>
              <div className="line-clamp-1 text-sm">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default ChatWindow;
