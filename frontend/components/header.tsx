import axios from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import TextIcon from "@/components/icons/TextIcon";
import ProfileModal from "@/components/profileModal";

const Header = () => {
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
    <header className="flex items-center justify-between px-6 py-4 border-b bg-gray-900 text-white">
      <div className="flex items-center gap-2">
        <TextIcon className="h-6 w-6" />
        <h1 className="text-lg font-semibold text-white">Chat App</h1>
      </div>
      <div className="flex items-center gap-6 text-white">
        <ProfileModal />
        <button onClick={handleLogout}>Log out</button>
      </div>
    </header>
  );
};

export default Header;
