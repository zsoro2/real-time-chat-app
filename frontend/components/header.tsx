import axios from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import TextIcon from "@/components/icons/TextIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Button } from "@/components/ui/button";

const Header = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-gray-100">
      <div className="flex items-center gap-2">
        <TextIcon className="h-6 w-6" />
        <h1 className="text-lg font-semibold">Chat App</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center flex items-center">
          <Button size="icon" variant="ghost">
            <UserIcon className="h-5 w-5" />
          </Button>
          Profile
        </div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </header>
  );
};

export default Header;
