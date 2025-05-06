import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Profile = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleLogout() {
    try {
      const response = await fetch(`${apiUrl}/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaRegUserCircle className='transition ease-in hover:cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
