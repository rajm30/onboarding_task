import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [obj, setObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function hendleHomebtn() {
    navigate("/");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function handlesignUp() {
    fetch("https://shopping-cart-backend-iae5.onrender.com/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        password: obj.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setObj({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

        <div className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={obj.firstName}
              onChange={handleChange}
              type="text"
              placeholder="Enter First Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              value={obj.lastName}
              type="text"
              onChange={handleChange}
              placeholder="Enter Last Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
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
              name="password"
              type="password"
              value={obj.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            // type="submit"
            onClick={handlesignUp}
            className="cursor-pointer w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-black hover:text-white transition"
          >
            SignUp
          </button>

          <button
            type="button"
            onClick={hendleHomebtn}
            className="cursor-pointer w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-black hover:text-white transition"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
