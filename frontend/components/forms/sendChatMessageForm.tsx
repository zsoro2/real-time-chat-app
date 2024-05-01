import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Chat } from "@/types/chatTypes";

interface SendChatMessageForm {
  selectedChat: Chat;
  onMessageSent: () => void;
}

const SendChatMessageForm = ({
  selectedChat,
  onMessageSent,
}: SendChatMessageForm) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const receiverId = selectedChat.participantUserId;

  const sendMessage = async (data: any) => {
    try {
      const { content }: { content: string } = data;

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

  return (
    <>
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(sendMessage)}
      >
        <Input placeholder="Type a message" {...register("content")} />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
};

export default SendChatMessageForm;
