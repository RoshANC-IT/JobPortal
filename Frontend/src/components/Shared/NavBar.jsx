import  { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { api } from "@/services/api";
import "../Notify/ToastifyCSS.css";
import "../../components/index.css"
export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [theme, setTheme] = useState("light");

  // Handle logout
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

  // Toggle the theme between dark and light
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Save theme to localStorage and apply it on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Save the theme to localStorage
    localStorage.setItem("theme", theme);

    // Apply theme class to the body element
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16  px-4 top-0 left-0 right-0">
        <Link to={"/"}>
       
        <div className="cursor-pointer ">
          <h1 className="text-2xl font-bold ">
            <span className="text-red-600">E</span>
            <span>Ai</span>
          </h1>
        </div>
        </Link>
        <div className="flex gap-5 items-center">
          <ul className="flex gap-12 font-medium items-center ">
            {user && user.role === "recruiter" ? (
              <>
                <Link to={"/admin/companies"}>
                  <li>Companies</li>
                </Link>
                <Link to={"/admin/job"}>
                  <li>Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/jobs"}>
                  <li>Jobs</li>
                </Link>
                <Link to={"/browser"}>
                  <li>Browse</li>
                </Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-2 items-center">
              <Link to="/login">
                <Button >Login</Button>
              </Link>
              <Link to="/signup">
                <Button >Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ">
                  <AvatarImage 
                    src={user?.avatar || "https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png"}
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-4 space-y-4   bg-white/20 shadow-xl backdrop-blur-[4px] rounded-b-xl ">
                <div className="flex gap-4 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.avatar || "https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png"}
                    />
                  </Avatar>

                  <div>
                    <h4 className="font-medium text-red-500">{user?.fullname || "User Name"}</h4>
                    <p className="text-sm text-muted-foreground text-red-500">
                      {user?.profile?.bio || "Your bio goes here..."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col  ">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 className="text-2xl  text-green-600" />
                      <Button variant="link"className="text-green-600 text-sm bg-transparent hover:bg-transparent hover:no-underline">
                        <Link to="/Profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="text-2xl text-red-600" />
                    <Button
                      variant="link"
                     className="text-sm text-red-600 bg-transparent hover:bg-transparent hover:no-underline"
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
        <button
          onClick={toggleTheme}
          className="ml-5 p-2 bg-gray-300 rounded-full hover:scale-105"
        >
          {theme === "dark" ? "🌙" : "🌞"}
        </button>
      </div>
    </div>
  );
}
