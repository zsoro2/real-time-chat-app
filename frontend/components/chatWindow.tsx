import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { ChatMessage, Chat } from "@/types/chatTypes";

const ChatWindow = ({ chat }: { chat: Chat | null }) => {
  const { user } = useAuth();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="flex flex-col gap-4">
        {chat?.messages?.map((message: ChatMessage) => (
          <div
            key={message.id}
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
