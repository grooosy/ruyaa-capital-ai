import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-gray-300">Oops! Page not found</p>
        <a href="/" className="text-yellow-500 hover:text-yellow-400 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
