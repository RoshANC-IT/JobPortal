import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchJobQueryText } from "./redux/jobSlice";

function HeroSection() {
  const [query, setQuery] = useState(""); // State to store search input
  const dispatch = useDispatch(); // Dispatch to Redux store
  const navigate = useNavigate(); // Hook to navigate

  // Handler for the search button
  const searchJobHandler = () => {
    dispatch(setSearchJobQueryText(query)); // Dispatch the query text
    navigate("/browser"); // Navigate to the browser page
  };

  return (
    <div className="text-center">
      <div className="flex py-2 gap-5 my-1"></div>
      <span className="px-4 py-4 rounded-full bg-gray-100 text-[#d3453b] font-medium">
        No: 1 Job Hunt Website
      </span>

      <h1 className="text-5xl font-bold my-5">
        Search Apply & <br /> Get your{" "}
        <span className="text-[#d3453b]">Dream Jobs</span>
      </h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nesciunt
        earum fugit aut explicabo{" "}
      </p>

      {/* Search Bar */}
      <div className="flex w-[40%] shadow-2xl p-3 rounded items-center gap-4 mx-auto ">
        <input
          type="text"
          placeholder="Find your Dream's Jobs"
          className="w-full outline-none border-none  bg-transparent"
          onChange={(e) => {
            console.log("Input value: ", e.target.value); // Log input value when user types
            setQuery(e.target.value); // Update state
          }}
        />

        <Button onClick={searchJobHandler}>
          <Search className="h-5 w-5" />
        </Button>
      </div>
      {/* Search Bar End */}
    </div>
  );
}

export default HeroSection;
