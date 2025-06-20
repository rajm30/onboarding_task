import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
const ProductList = lazy(() => import("./Pages/Productlist"));
import ProtectedRoute from "./components/ProtectedRoute";
import ViewDetails from "./Pages/ViewDetails";
import { ProductProvider } from "./context/Product";
import Cart from "./Pages/Cart";
import { Component, Suspense } from "react";
import Loading from "./components/Loading";

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
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              </Suspense>
            }
          />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
