import { useEffect, useState } from "react";
import useProductContext from "../context/Product";
import { useNavigate } from "react-router";

const Productlist = () => {
  const [selected, setSelected] = useState("All Product");
  const navigate = useNavigate();
  const { allProducts, handleViewBtn, handlePostRequest } = useProductContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const initialProducts = allProducts.map((product) => ({
      ...product,
      quantity: 0,
    }));
    setProducts(initialProducts);
    console.log(products);
  }, [allProducts]);

  const filteredProducts =
    selected === "All Product"
      ? products
      : products.filter((product) => product.category === selected);

  const checkSelectedCategory = (e) => {
    setSelected(e.target.value);
  };

  // const handleQuantity = (id, type) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) => {
  //       if (product._id === id) {
  //         const newQty =
  //           type === "inc"
  //             ? product.quantity + 1
  //             : Math.max(0, product.quantity - 1);
  //         return { ...product, quantity: newQty };
  //       }
  //       return product;
  //     })
  //   );
  // };
  // console.log(products._id);

  async function hendleAddToCartBtn(id) {
    try {
      await handlePostRequest(id);
      await getUserCart();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
    navigate("/cart");
  }
  return (
    <>
      <div>
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600"
          >
            Shopping Cart
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="px-4 cursor-pointer py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
            >
              <svg
                fill="#ffffff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="26px"
                height="26px"
                viewBox="0 0 902.86 902.86"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"></path>{" "}
                      <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
          </div>
        </header>
      </div>
      <div className="bg-gray-100 min-h-screen py-8 px-4">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-8 border-2">
            <select
              value={selected}
              onChange={checkSelectedCategory}
              className="p-2"
            >
              <option value="All Product">All Products</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 rounded-md mb-6"
              />
              <h2 className="font-semibold text-lg text-gray-800 truncate">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 truncate mb-6">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">
                  ${product.price}
                </span>
              </div>

              <div className="flex justify-between mt-4">
                <div className="flex items-center">
                  {/* <button
                    onClick={() => handleQuantity(product._id, "dec")}
                    className="border-2 rounded-2xl bg-blue-600 text-white cursor-pointer p-2 w-12"
                  >
                    -
                  </button> */}
                  <button
                    onClick={() => hendleAddToCartBtn(product._id)}
                    className="rounded-md text-sm  mr-2 cursor-pointer bg-blue-600 text-white p-2"
                  >
                    Add-To-Cart
                  </button>
                  {/* <button
                    onClick={() => handleQuantity(product._id, "inc")}
                    className="border-2 rounded-2xl bg-blue-600 text-white cursor-pointer p-2 w-12"
                  >
                    +
                  </button> */}
                </div>
                <button
                  onClick={() => handleViewBtn(product._id)}
                  className="text-white bg-blue-600 px-4 py-2 rounded-md text-sm transition-colors duration-200 hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Productlist;
