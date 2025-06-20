import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Productlist from "./Pages/Productlist";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewDetails from "./Pages/ViewDetails";
import { ProductProvider } from "./context/Product";
import Cart from "./Pages/Cart";

function App() {
  return (
    <>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewdetailes" element={<ViewDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/Productlist"
            element={
              <ProtectedRoute>
                <Productlist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
