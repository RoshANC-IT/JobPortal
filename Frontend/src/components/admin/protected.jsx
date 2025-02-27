import { useEffect } from "react"; 
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth); // Get user from Redux store
  const navigate = useNavigate(); // Correct usage of useNavigate

  useEffect(() => {
    // If user is not logged in or doesn't have the 'recruiter' role, redirect to homepage
    if (user === null || user.role !== 'recruiter') {
      navigate("/"); // Redirect to homepage
    }
  }, [user, navigate]); // Ensure useEffect runs whenever user changes

  return <>{children}</>; // Render children if the user is valid
};

export default ProtectedRoute;
