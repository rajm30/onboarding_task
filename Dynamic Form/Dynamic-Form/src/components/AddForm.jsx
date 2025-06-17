import { useState } from "react";
import bgImage from "../Image/triangles-1430105_960_720.webp";
import useFormcontext from "../context/Form";
import { useNavigate } from "react-router-dom";

const AddForm = () => {
  const { addForm } = useFormcontext();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleBack = () => {
    navigate("/");
  };

  const handleAddQuestion = () => {
    if (!title.trim()) {
      setError("Form title is required");
      return;
    }

    if (title.trim().length < 3) {
      setError("Form title must be at least 3 characters");
      return;
    }

    if (title.trim().length > 50) {
      setError("Form title must not exceed 50 characters");
      return;
    }

    setError("");
    const formId = addForm(title);
    navigate(`/addForm/${formId}`);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover bg-center h-screen flex items-center justify-center"
    >
      <div className="bg-white/30 backdrop-blur-2xl shadow-xl rounded-lg p-8 w-[400px]">
        <h1 className="font-bold text-4xl text-center">Add Form</h1>
        <fieldset className="border-2 p-3 mt-7 rounded-md">
          <legend className="text-lg font-semibold">Form Name:</legend>
          <input
            placeholder="Enter Name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-700 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </fieldset>

        <div className="mt-3 flex justify-center">
          <button
            onClick={handleBack}
            className="m-2 rounded-xl border-2 border-black px-4 py-2 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out"
          >
            Back to List
          </button>
          <button
            onClick={handleAddQuestion}
            disabled={!title.trim()}
            className={`m-2 rounded-xl border-2 border-black px-4 py-2 transition duration-300 ease-in-out ${
              !title.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-gray-500 hover:text-white"
            }`}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
