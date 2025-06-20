import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  function hendleHomebtn() {
    navigate("/");
  }

  const [obj, setObj] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin() {
    try {
      const response = await fetch(
        "https://shopping-cart-backend-iae5.onrender.com/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: obj.email,
            password: obj.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();
      const receivedToken = data.data.token;

      if (receivedToken) {
        localStorage.setItem("token", receivedToken);

        navigate("/Productlist");
      } else {
        alert("Login failed: Token not received");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }

    setObj({
      email: "",
      password: "",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={obj.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={obj.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="cursor-pointer w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-black hover:text-white transition"
          >
            Login
          </button>

          <button
            onClick={hendleHomebtn}
            className="cursor-pointer w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-black hover:text-white transition "
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
