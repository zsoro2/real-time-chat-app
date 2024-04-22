"use client";

import { useForm } from "react-hook-form";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import ChatList from "@/components/chatList";
import ChatWindow from "@/components/chatWindow";
import { useRouter } from "next/navigation";
import axios from "@/lib/axiosInstance";
import { BACKEND_URL } from "@/lib/config";

const socket = io(BACKEND_URL);

export default function Page() {
  const router = useRouter();
  const { user } = useAuth();
  const { chats, chatsAreLoading, chatsHasError, mutate } = useChats();
  const [selectedChat, setSelectedChat] = useState({});
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (selectedChat?.chatId && chats) {
      let currentSelectedChat = chats.find(
        (c) => selectedChat.chatId == c.chatId
      );
      console.log(currentSelectedChat);
      setSelectedChat({ ...currentSelectedChat });
    }
  }, [chats]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      if (newMessage.chatId === selectedChat.chatId) {
        console.log("update chat");
        mutate();
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedChat]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const sendMessage = async (data) => {
    try {
      const { content } = data;

      const receiverId = getReceiverIdFromSelectedChat(selectedChat, user.id);
      if (!receiverId) {
        console.error("Receiver ID is missing");
        return;
      }

      await axios.post("/api/messages", {
        content,
        userId: user.id,
        receiverId,
      });

      reset();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  function getReceiverIdFromSelectedChat(selectedChat, currentUserId) {
    return selectedChat.messages.find(
      (messages) => messages.userId !== currentUserId
    )?.userId;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />
      <div className="flex flex-1 overflow-hidden">
        <ChatList chats={chats} onSelectChat={handleChatSelect} />
        <div className="flex flex-col flex-1">
          <ChatWindow chat={selectedChat} />
          <div className="border-t p-4">
            <form
              className="flex items-center gap-2"
              onSubmit={handleSubmit(sendMessage)}
            >
              <Input placeholder="Type a message" {...register("content")} />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
