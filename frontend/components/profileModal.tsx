import { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

import UserIcon from "@/components/icons/UserIcon";

export default function ProfileModal() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef?.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const file = event.target.files[0];
    const fileType = file.type;
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(fileType)) {
      alert("Invalid file type. Only JPG, PNG, or JPEG are allowed.");
      return;
    }

    console.log("File is valid, process it here");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-center flex items-center">
          <Button size="icon" variant="ghost">
            <UserIcon className="h-5 w-5" />
          </Button>
          Profile update
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile update</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-5">
          <div className="flex">
            <Avatar
              className="h-20 w-20 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <AvatarImage alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={user?.username} readOnly />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button">Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
