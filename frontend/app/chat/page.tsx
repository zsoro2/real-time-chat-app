import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b bg-gray-100">
        <div className="flex items-center gap-2">
          <TextIcon className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Chat App</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost">
            <UserIcon className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r overflow-auto hidden md:block">
          <nav className="grid gap-4 p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">Olivia Davis</div>
                <div className="line-clamp-1 text-xs">Active now</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">John Doe</div>
                <div className="line-clamp-1 text-xs">2 unread messages</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">Jane Smith</div>
                <div className="line-clamp-1 text-xs">Offline</div>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-auto p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <Avatar>
                  <AvatarImage alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">Olivia Davis</div>
                  <div className="line-clamp-1 text-xs">10:00 AM</div>
                  <div className="line-clamp-1 text-sm">
                    Hello! How are you today?
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 text-right self-end">
                <div className="grid gap-1">
                  <div className="font-semibold">John Doe</div>
                  <div className="line-clamp-1 text-xs">10:05 AM</div>
                  <div className="line-clamp-1 text-sm">
                    I'm good, thanks! How about you?
                  </div>
                </div>
                <Avatar>
                  <AvatarImage alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="border-t p-4">
            <form className="flex items-center gap-2">
              <Input placeholder="Type a message" />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
