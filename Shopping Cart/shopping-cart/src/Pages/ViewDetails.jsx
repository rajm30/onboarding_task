import useProductContext from "../context/Product";
import { useNavigate } from "react-router";

const ViewDetails = () => {
  const navigate = useNavigate();
  const { id, allProducts } = useProductContext();

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
      <div className=" w-[800px]  bg-white rounded-lg shadow-lg p-8">
        {allProducts
          .filter((productID) => productID._id === id)
          .map((filteredProduct) => (
            <div key={filteredProduct._id} className="space-y-8">
              <button
                onClick={() => navigate("/Productlist")}
                className="border-2 p-2 rounded-xl bg-blue-600 cursor-pointer text-white"
              >
                Back
              </button>
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                  {filteredProduct.title}
                </h1>
                <img
                  src={filteredProduct.image}
                  alt={filteredProduct.title}
                  className="w-full max-w-lg mx-auto mb-6 rounded-md"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xl text-gray-800 font-bold">{`$${filteredProduct.price}`}</div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-sm text-yellow-500 font-semibold">{`⭐ ${filteredProduct.rating.rate}`}</div>
                  <div className=" text-sm text-gray-600">
                    <p>{`Total Reviews: ${filteredProduct.rating.count}`}</p>
                  </div>
                </div>
              </div>
              <div className="text-gray-700 mt-4">
                <p className="text-lg leading-relaxed">
                  {filteredProduct.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewDetails;
