import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import SendMessage from "@/components/sendMessage";

export default function MembersCard({ user }) {
  return (
    <Card
      key="1"
      className="rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-all duration-200"
    >
      <img
        alt="Profile picture"
        className="object-fill w-full h-36"
        src={"https://picsum.photos/300/300"}
      />
      <CardContent className="p-4">
        <h4 className=" text-xs font-bold text-gray-600 transition-all duration-200">
          {user.username}
        </h4>
        <p className="text-xs text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex mt-4 space-x-2">
          <SendMessage receiverId={user.id} />
        </div>
      </CardContent>
    </Card>
  );
}
