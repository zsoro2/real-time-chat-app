import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import PaperAirplane from "./icons/PaperAirplane";

export default function SendMessage() {
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
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
          <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
        </DialogHeader>
        <Textarea rows={5} placeholder="Type your message here." />
        <DialogFooter>
          <Button type="submit" className="w-full">
            Send message <PaperAirplane className="ml-2 h-4 w-4" />{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
