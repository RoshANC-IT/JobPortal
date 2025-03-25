import HeroSection from "./HeroSection";
import CategoryCsousel from "./CategoryCsousel";
import LatestJob from "./LatestJob";
import useGetAllJobs from "@/Hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"
const Home = () => {
  useGetAllJobs();  // Make sure this hook handles the data fetch or any other side effect

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]); // Add user and navigate as dependencies

  return (
    <div>
      <HeroSection />
      <CategoryCsousel />
      <LatestJob />
    </div>
  );
};

export default Home;
