import { useContext, createContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  function handleViewBtn(_id) {
    setId(_id);
    navigate("/viewdetailes");
  }

  async function getProductList() {
    const token = localStorage.getItem("token");

    let Data = await fetch(
      "https://shopping-cart-backend-iae5.onrender.com/product/get-product-list",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let response = await Data.json();
    setAllProducts(response.data);
  }

  useEffect(() => {
    getProductList();
  }, []);

  async function handlePostRequest(id) {
    console.log("id is iddnms d fdhb", id);
    const token = localStorage.getItem("token");
    return fetch(
      "https://shopping-cart-backend-iae5.onrender.com/cart/add-to-cart",
      {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: 1,
          isIncreasing: true,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("response...");
        return response.json();
      })
      .then((json) => console.log(json));
  }

  async function handlePostRequestForMinus(id) {
    console.log("id is ", id);
    const token = localStorage.getItem("token");
    return fetch(
      "https://shopping-cart-be-ea14.onrender.com/cart/add-to-cart",
      {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          quantity: -1,
          isIncreasing: true,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <ProductContext.Provider
      value={{
        getProductList,
        setAllProducts,
        allProducts,
        handleViewBtn,
        id,
        handlePostRequest,
        handlePostRequestForMinus,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default function useProductContext() {
  return useContext(ProductContext);
}
