import { useAuth } from "@/hooks/useAuth";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import MembersSearch from "@/components/membersSearch";
import { Chat } from "@/types/chatTypes";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}

const ChatList = ({ chats, onSelectChat }: ChatListProps) => {
  const { user } = useAuth();

  return (
    <nav className="grid gap-4 p-4">
      <MembersSearch />
      <div className="flex items-center gap-2 bg-gray-200 rounded-md p-2">
        <Avatar>
          <AvatarImage alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="font-semibold">{user?.username}</div>
          <div className="line-clamp-1 text-xs">{user?.email}</div>
        </div>
      </div>
      {chats.map((chat: Chat) => {
        return (
          <div
            key={chat.chatId}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <Avatar>
              <AvatarImage alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{chat.participantUsername}</div>
              <div className="line-clamp-1 text-xs">
                {chat.lastMessage ?? "No messages"}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default ChatList;
