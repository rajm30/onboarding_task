import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  // const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600"
      >
        Shopping Cart
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
