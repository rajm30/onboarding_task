import { useNavigate } from "react-router-dom";
import useFormContext from "../context/Form";
import bgImage from "../Image/triangles-1430105_960_720.webp";

const Home = () => {
  const { forms, removeForm } = useFormContext();
  const navigate = useNavigate();

  const handleAddForm = () => navigate("/addForm");
  const handlePreview = (formId) => navigate(`/preview/${formId}`);
  const handleEditForm = (formId) => navigate(`/addForm/${formId}`);

  const handleRemoveForm = (formId) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      removeForm(formId);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="min-h-screen p-8 bg-cover relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {forms.map((form) => (
          <div
            key={form.id}
            className="bg-white/30 backdrop-blur-lg rounded-xl p-6 shadow-lg"
          >
            <div className="flex flex-col justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">{form.title} Form</h2>
              <div className="flex space-x-2 mt-5">
                <button
                  onClick={() => handleEditForm(form.id)}
                  className="px-3 py-1 border-2 border-black text-black rounded text-sm  hover:bg-gray-500 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handlePreview(form.id)}
                  className="px-3 py-1 border-2 border-black text-black rounded text-sm hover:bg-gray-500 hover:text-white"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleRemoveForm(form.id)}
                  className="px-3 py-1 border-2 border-black text-black rounded text-sm hover:bg-gray-500 hover:text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddForm}
        className="absolute bottom-24   right-42 w-16 h-16 rounded-full bg-red-500 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors animate-bounce"
      >
        ➕
      </button>
    </div>
  );
};

export default Home;
