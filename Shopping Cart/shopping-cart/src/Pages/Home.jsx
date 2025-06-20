import Header from "../components/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Shopping Cart
          </h1>
          <p className="text-gray-600 mb-6">
            Please login or sign up to browse our products
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
