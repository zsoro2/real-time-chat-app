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
import axiosInstance from "@/lib/axiosInstance";
import { BACKEND_URL } from "@/lib/config";
import { UpdateUserResponse } from "@/types/userTypes";

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

    axiosInstance.post();

    var formData = new FormData();
    formData.append("pictureImage", file);
    axiosInstance
      .put("/api/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ response }: UpdateUserResponse) => {
        //TODO: UPDATE WITH PRETTIER
        alert("success");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleFormSubmit = (formData: FormData) => {
    const nickaname = formData.get("nickname");
    if (nickaname) {
      var formData = new FormData();
      formData.append("nickname", nickaname);
      axiosInstance
        .put("/api/users", formData, {})
        .then(({ response }: UpdateUserResponse) => {
          //TODO: UPDATE WITH PRETTIER
          alert("Successfully updated nicname");
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
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
        <form action={handleFormSubmit} className="space-y-2">
          <DialogHeader>
            <DialogTitle>Profile update</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <div className="flex">
              <Avatar
                className="h-20 w-20 cursor-pointer"
                onClick={handleAvatarClick}
              >
                {user?.profileImage ? (
                  <div class>
                    <img src={BACKEND_URL + "/" + user?.profileImage} />
                  </div>
                ) : (
                  <>
                    <AvatarImage alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </>
                )}
              </Avatar>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                name="nickname"
                placeholder="Nickname"
                defaultValue={user?.nickname}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant={"ghost"}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
