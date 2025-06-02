import { useNavigate } from "react-router";
import useStepper from "../context/Stepper";
import useFormData from "../context/FormData";
import { useState } from "react";
import * as yup from "yup";

const ExperienceDetails = () => {
  const [errors, setErrors] = useState({});
  const { navigateTo } = useStepper();
  const navigate = useNavigate();
  const { register, getValues } = useFormData();
  const [showInputField, setShowInputField] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const navigateTOHome = () => navigate("/");
  const navigateToEducationDetails = () => navigateTo("EducationDetails");

  const handleNext = async (e) => {
    try {
      setShowInputField(true);
      let value = getValues();
      await validationSchema.validate(value, { abortEarly: false });
      navigateTo("ProfessionalDetails");
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  const handleSaveExperience = () => {
    const values = getValues([
      "companyName",
      "position",
      "totalYear",
      "lastCTC",
    ]);
    setExperiences((prev) => [...prev, values]);
    setShowInputField(false);
  };

  const validationSchema = yup.object({
    companyName: yup.string().required("Company Name is Required"),
    position: yup.string().required("Position Is Required"),
    totalYear: yup.string().required("Total Year Is Required"),
    lastCTC: yup.string().required("Last CTC Is Required"),
  });

  return (
    <>
      <h1 className="flex justify-center text-4xl font-semibold text-[#663bb7] mt-8 mb-6">
        Experience Details
      </h1>

      <div className="flex justify-end mb-6 px-6">
        <button
          className="bg-[#663bb7] text-white px-5 py-2 rounded-xl hover:bg-[#512a99] transition"
          onClick={() => setShowInputField(true)}
        >
          ➕ Add Experience
        </button>
      </div>

      <div className="overflow-x-auto px-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-md bg-white">
            <thead className="bg-[#f3eaff] text-black">
              <tr>
                <th className="p-3 text-center">Company Name</th>
                <th className="p-3 text-center">Position</th>
                <th className="p-3 text-center">Total Year</th>
                <th className="p-3 text-center">Last CTC</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 border-t text-center">
                    {exp.companyName}
                  </td>
                  <td className="p-3 border-t text-center">{exp.position}</td>
                  <td className="p-3 border-t text-center">{exp.totalYear}</td>
                  <td className="p-3 border-t text-center">{exp.lastCTC}</td>
                  <td className="p-3 border-t text-center">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() =>
                        setExperiences(
                          experiences.filter((_, i) => i !== index)
                        )
                      }
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}

              {showInputField && (
                <tr className="bg-white">
                  <td className="p-2 border-t text-center">
                    <input
                      type="text"
                      {...register("companyName")}
                      placeholder="Enter Company Name"
                      className="w-full p-2 rounded border focus:outline-none focus:border-[#663bb7] text-center"
                    />
                    {errors.companyName && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.companyName}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border-t text-center">
                    <input
                      type="text"
                      {...register("position")}
                      placeholder="Enter Position"
                      className="w-full p-2 rounded border focus:outline-none focus:border-[#663bb7] text-center"
                    />
                    {errors.position && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.position}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border-t text-center">
                    <input
                      type="number"
                      {...register("totalYear")}
                      placeholder="Enter Years"
                      className="w-full p-2 rounded border focus:outline-none focus:border-[#663bb7] text-center"
                    />
                    {errors.totalYear && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.totalYear}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border-t text-center">
                    <input
                      type="text"
                      {...register("lastCTC")}
                      placeholder="Enter Last CTC"
                      className="w-full p-2 rounded border focus:outline-none focus:border-[#663bb7] text-center"
                    />
                    {errors.lastCTC && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.lastCTC}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border-t flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveExperience}
                      className="px-4 py-1 text-white bg-green-600 rounded hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInputField(false)}
                      className="px-4 py-1 border border-gray-400 rounded hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </form>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 px-6">
          <button
            onClick={navigateTOHome}
            className="bg-white border-2 border-[#663bb7] text-[#663bb7] font-medium px-6 py-2 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
          >
            Back to List
          </button>
          <div className="flex gap-3">
            <button
              onClick={navigateToEducationDetails}
              className="bg-white border-2 border-[#663bb7] text-[#663bb7] font-medium px-6 py-2 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-white border-2 border-[#663bb7] text-[#663bb7] font-medium px-6 py-2 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceDetails;
