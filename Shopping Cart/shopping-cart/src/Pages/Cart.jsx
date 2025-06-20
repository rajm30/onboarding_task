import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useProductContext from "../context/Product";

const Cart = () => {
  const navigate = useNavigate();
  const { handlePostRequestForMinus, handlePostRequest } = useProductContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function getUserCart() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(
        "https://shopping-cart-backend-iae5.onrender.com/cart/get-cart",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data = await response.json();
      setCartItems(data);
      if (data.success) {
        setCartItems(data.data.items);
        setTotalAmount(data.data.totalAmount);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  async function calledBtnMinus(id) {
    try {
      console.log(1);
      await handlePostRequestForMinus(id);
      console.log(2);
      await getUserCart();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  }

  async function calledBtnPlus(id) {
    try {
      await handlePostRequest(id);
      await getUserCart();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  }

  async function handleDeleteAllCartItems() {
    const token = localStorage.getItem("token");

    return fetch(
      `https://shopping-cart-backend-iae5.onrender.com/cart/delete-cart`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error("Error:", error));
  }

  async function handleRemoveItem(itemId) {
    console.log("itemId", itemId);
    const token = localStorage.getItem("token");

    return fetch(
      `https://shopping-cart-backend-iae5.onrender.com/cart/delete-cart-item/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error("Error:", error));
  }

  async function calledRemoveBtn(id) {
    await handleRemoveItem(id);
    await getUserCart();
  }

  async function deleteCart() {
    await handleDeleteAllCartItems();
    await getUserCart();
  }

  return (
    <>
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600"
        >
          Shopping Cart
        </h1>
        <div className="flex gap-4">
          <button
            onClick={deleteCart}
            className="px-4 cursor-pointer py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Delete All Items
          </button>
          <button
            onClick={() => navigate("/Productlist")}
            className="px-4 cursor-pointer py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading cart...</p>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.productId.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.productId.description}
                    </p>
                    <div className="mt-2 flex items-center gap-4">
                      <button
                        onClick={() => calledBtnMinus(item.productId._id)}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                        disabled={isLoading}
                      >
                        -
                      </button>
                      <p className="font-medium text-lg">{item.quantity}</p>
                      <button
                        onClick={() => calledBtnPlus(item.productId._id)}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                        disabled={isLoading}
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      ${item.productId.price} each
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold text-gray-800">
                    ${(item.quantity * item.productId.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => calledRemoveBtn(item.productId._id)}
                    className="mt-2 cursor-pointer text-red-500 text-sm hover:underline"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6">
              <div className="text-lg font-bold">Total</div>
              <div className="text-xl font-semibold text-gray-800">
                ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-lg text-gray-500">
            Your cart is empty. Add some products to your cart!
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <footer className="flex justify-between  py-4 bg-white shadow-md fixed bottom-0 w-full ">
          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-3 ml-5 cursor-pointer bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
          <button
            onClick={() => navigate("/Productlist")}
            className="px-6 py-3 cursor-pointer mr-7 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue Shopping
          </button>
        </footer>
      )}
    </>
  );
};

export default Cart;
