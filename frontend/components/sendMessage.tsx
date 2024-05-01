import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import PaperAirplane from "./icons/PaperAirplane";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosReponse } from "axios";
import { useState } from "react";
import { ChatMessageResponse } from "@/types/chatMessageTypes";

export default function SendMessage({ receiverId }: { receiverId: number }) {
  const [success, setSuccess] = useState<boolean>(false);

  async function onSendMessage(formData: FormData) {
    if ("" !== formData.get("content")) {
      console.log(receiverId);
      await axiosInstance
        .post("/api/messages", {
          content: formData.get("content"),
          receiverId: receiverId,
        })
        .then(function (response: AxiosReponse<ChatMessageResponse>) {
          console.log(response);
          setSuccess(true);
        })
        .catch((err) => {
          //TODO: Error handleing
          console.log(err);
        });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full hover:bg-gray-700 hover:text-white transition-all duration-200"
          size="sm"
        >
          Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {success ? (
          <div className="space-y-5">
            <DialogHeader className="item-center flex items-center">
              <DialogTitle>Message sent!</DialogTitle>
              <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center">
              <DialogClose asChild className="mx-auto">
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </div>
          </div>
        ) : (
          <form action={onSendMessage} className="space-y-2">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
            </DialogHeader>
            <Textarea
              name="content"
              rows={5}
              placeholder="Type your message here."
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                Send message <PaperAirplane className="ml-2 h-4 w-4" />{" "}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
