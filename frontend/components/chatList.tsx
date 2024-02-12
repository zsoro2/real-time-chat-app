import { useUser } from "@/hooks/useUser";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

const ChatList = ({ chats, onSelectChat }) => {
  const { user } = useUser();

  const getLastMessageFromOthers = (chatData) => {
    const messagesFromOthers = chatData.messages
      .filter((message) => message.userId !== user?.id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    const lastMessage = messagesFromOthers[0];

    return {
      senderUsername: lastMessage?.senderUsername || "Unknown",
    };
  };

  return (
    <div className="w-64 border-r overflow-auto hidden md:block">
      <nav className="grid gap-4 p-4">
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
        {chats?.map((chat) => {
          const lastMessageValues = getLastMessageFromOthers(chat);

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
                <div className="font-semibold">
                  {lastMessageValues.senderUsername}
                </div>
                <div className="line-clamp-1 text-xs">
                  {chat?.messages[chat.messages.length - 1].content ??
                    "No messages"}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default ChatList;
