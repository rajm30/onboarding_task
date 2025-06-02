import { useNavigate } from "react-router-dom";
import useStepper from "../context/Stepper";
import useFormData from "../context/FormData";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { allData, setAllData, setValue } = useFormData();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const { navigateTo } = useStepper();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(allData);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewResume, setPreviewResume] = useState(null);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("employee"));
    if (storeData && storeData.length > 0) {
      setAllData(storeData);
    }
  }, []);

  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);

  function renderData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handlebutton = () => {
      navigate("/addemployee");
      navigateTo("Addemployee");
    };

    function handleEdit(id) {
      const employee = allData.find((data) => data.id === id);
      if (employee) {
        for (const key in employee) {
          setValue(key, employee[key] || "");
        }
        navigate("/addemployee");
        navigateTo("Addemployee");
      } else {
        console.error("Employee not found for id:", id);
      }
    }

    const handleDelete = (deleteData) => {
      const id = deleteData.id;
      const updatedData = allData.filter((data) => data.id !== id);
      setAllData(updatedData);
      localStorage.setItem("employee", JSON.stringify(updatedData));
    };

    function handleSearch(e) {
      const value = e.target.value;
      setSearch(value);
      const filtered = allData.filter(
        (data) =>
          data.firstName.toLowerCase().includes(value.toLowerCase()) ||
          data.email.toLowerCase().includes(value.toLowerCase()) ||
          data.department.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredData(filtered);
    }

    return (
      <>
        {previewImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setPreviewImage(null)}
          >
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-[80vh] rounded"
              />
            </div>
          </div>
        )}

        {previewResume && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setPreviewResume(null)}
          >
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <iframe
                src={previewResume}
                className="w-full h-[80vh]"
                title="Resume Preview"
              ></iframe>
            </div>
          </div>
        )}

        <div className="mt-10 w-full mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e)}
              placeholder="Search by First Name, Email or Department"
              className="w-full flex-grow border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#663bb7] shadow-sm transition"
            />
            <button
              onClick={handlebutton}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#663bb7] hover:bg-[#7e6aa6] text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              <svg
                fill="currentColor"
                width="18"
                height="18"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <circle cx="44.6" cy="36.3" r="16"></circle>
                  <path d="M48.8,79.6c2.7,0,1.2-1.9,1.2-1.9h0a19.58,19.58,0,0,1-2.5-20.1l.2-.4a1.17,1.17,0,0,0-.9-1.9h0a18.48,18.48,0,0,0-2.4-.1,24.26,24.26,0,0,0-24,20.9c0,1.2.4,3.5,4.2,3.5H48.8Z"></path>
                  <path d="M65.2,51.2A14.2,14.2,0,1,0,79.4,65.4,14.25,14.25,0,0,0,65.2,51.2ZM60.4,74a3.5,3.5,0,1,1,3.5-3.5A3.54,3.54,0,0,1,60.4,74Zm3.5-11.9a1.27,1.27,0,0,1-.4.7l-2.7,1.5a.48.48,0,0,1-.7,0l-2.7-1.5a1,1,0,0,1-.4-.7V59a1,1,0,0,1,.4-.7l2.7-1.5a.48.48,0,0,1,.7,0l2.7,1.5a1,1,0,0,1,.4.7Zm2.6-4.3a.68.68,0,0,1,.7-.7h5.2a.68.68,0,0,1,.7.7V63a.68.68,0,0,1-.7.7H67.3a.68.68,0,0,1-.7-.7l-.1-5.2ZM73.4,71l-3.1,3.2a.48.48,0,0,1-.7,0L66.5,71a.48.48,0,0,1,0-.7l3.1-3.2a.48.48,0,0,1,.7,0l3.1,3.2A.48.48,0,0,1,73.4,71Z"></path>
                </g>
              </svg>
              <span className="w-[140px]">Add-Employee</span>
            </button>
          </div>
        </div>

        <div className="mt-8 w-full p-6 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-x-auto">
          <table className="min-w-full text-sm md:text-base border-collapse">
            <thead className="border-b border-gray-300">
              <tr>
                {[
                  "Profile Picture",
                  "Name",
                  "Department",
                  "Designation",
                  "Email",
                  "Mobile Number",
                  "Resume",
                  "Action",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-4 py-3 text-center font-medium tracking-wide"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentItems.map((data, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-b border-gray-300 transition duration-200 text-center"
                >
                  <td className="px-4 py-3">
                    {data.images?.[0]?.base64 ? (
                      <img
                        src={data.images[0].base64}
                        alt="Profile"
                        onClick={() => setPreviewImage(data.images[0].base64)}
                        className="w-10 h-10 rounded-full object-cover shadow-md mx-auto cursor-pointer"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto"></div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{data.firstName}</td>
                  <td className="px-4 py-3">{data.department}</td>
                  <td className="px-4 py-3">{data.designation}</td>
                  <td className="px-4 py-3">{data.email}</td>
                  <td className="px-4 py-3">{data.mobileNumber}</td>
                  <td className="px-4 py-3 text-xl text-yellow-500">
                    {data.resume?.[0]?.base64 && (
                      <span
                        onClick={() => setPreviewResume(data.resume[0].base64)}
                        className="cursor-pointer hover:text-yellow-600"
                      >
                        📄
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => handleEdit(data.id)}
                        title="Edit"
                        className="text-purple-600 hover:text-purple-800 text-lg"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(data)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800 text-lg"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function goToNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function goToPrevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function goToSpecificPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function renderPaginationControls() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    function NumberOfitemsPerPage(e) {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value > 0) {
        setItemsPerPage(value);
      }
    }

    return (
      <div className="flex flex-wrap items-center justify-end gap-3 mt-8 mr-4">
        <label htmlFor="numberPerPage" className="text-gray-700 font-medium">
          Items per page:
        </label>
        <input
          type="number"
          id="numberPerPage"
          name="numberPerPage"
          value={itemsPerPage}
          min={2}
          max={7}
          onChange={NumberOfitemsPerPage}
          className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-xl border border-gray-400 transition duration-200 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-[#7e6aa6]"
            }`}
          >
            <svg
              viewBox="0 0 1024 1024"
              height={"22px"}
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSpecificPage(i + 1)}
              className={`px-4 py-1 rounded-xl border transition duration-200 ${
                currentPage === i + 1
                  ? "bg-[#663bb7] text-white border-blue-600 hover:bg-[#7e6aa6]"
                  : "border-gray-400 bg-white text-black hover:bg-[#7e6aa6] "
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-xl border border-gray-400 transition duration-200 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-[#7e6aa6]"
            }`}
          >
            <svg
              viewBox="0 0 1024 1024"
              height={"22px"}
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] h-full mt-7">
      <h1 className="text-3xl md:text-5xl text-center font-bold">
        Employee Management System
      </h1>

      <div>
        {renderData()}
        {renderPaginationControls()}
      </div>
    </div>
  );
};

export default HomePage;
