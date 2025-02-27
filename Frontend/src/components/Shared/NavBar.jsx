import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { api } from "@/services/api";
import "../Notify/ToastifyCSS.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Access user state from Redux for check user : Employer or Admin 

  const logoutHandle = async () => {
    try {
      const res = await api.get(`/user/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null)); // Clear user data in Redux store
        navigate("/home"); // Redirect to home page after successful logout
        toast.success("Logged Out Successfully", { className: "success" }); // Show success notification
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed", {
        className: "error",
      }); // Show error notification
    }
  };

  return (
    <div className="bg-[#6A38C2]">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-red-600">Job </span>
            <span className="text-white">Portal</span>
          </h1>
        </div>
        <div className="flex gap-5 items-center">
          <ul className="flex gap-12 font-medium items-center text-white">

            {user && user.role === "recruiter" ? ( // if user is recruiter then show only Componies and jobs for creating 
              <>
                <Link to={"/admin/companies"}>
                  {" "}
                  <li>Companies</li>{" "}
                </Link>
                <Link to={"/admin/job"}>
                  {" "}
                  <li>Jobs</li>
                </Link>
                 {/* For extra, you can add here something for recruiter only  */}
              </>
            ) : ( // else user is Employer then show Home , Jobs, Browswers  for Applying  
              <>
                <Link to={"/"}>
                  {" "}
                  <li>Home</li>{" "}
                </Link>
                <Link to={"/jobs"}>
                  {" "}
                  <li>Jobs</li>
                </Link>
                <Link to={"/browser"}>
                  {" "}
                  <li>Browse</li>
                </Link>
                {/* For extra, you can add here something for user only  */}
              </>
            )}

          </ul>
          {!user ? (
            <div className="flex gap-2 items-center">
              <Link to="/login">
                <Button className="text-white">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="text-white">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={ user?.avatar || "https://via.placeholder.com/150"} // Dynamic user avatar
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-4 space-y-4 bg-white shadow-lg rounded-lg">
                <div className="flex gap-4 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={ user?.avatar || "https://via.placeholder.com/150"} // Dynamic user avatar
                    />
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user?.name || "User Name"}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.bio || "Your bio goes here..."}
                    </p>
                  </div> 
                </div>


                <div className="flex flex-col text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 className="text-2xl text-green-600" />
                      <Button variant="link" className="text-sm">
                        <Link to="/Profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="text-2xl text-red-600" />
                    <Button
                      variant="link"
                      className="text-sm"
                      onClick={logoutHandle}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}
