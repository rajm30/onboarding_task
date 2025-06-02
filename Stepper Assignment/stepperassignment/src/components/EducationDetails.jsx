import { useNavigate } from "react-router";
import useStepper from "../context/Stepper";
import useFormData from "../context/FormData";
import { useState } from "react";
import * as yup from "yup";

const EducationDetails = () => {
  const { register, getValues } = useFormData();
  const [showInputField, setShowInputField] = useState(false);
  const [educations, setEducations] = useState([]);
  const [errors, setErrors] = useState({});
  const { navigateTo } = useStepper();
  const navigate = useNavigate();
  const navigateTOHome = () => navigate("/");
  const navigateToExperienceDetails = () => navigateTo("BankDetails");

  const handleSaveEducation = () => {
    const values = getValues([
      "educationName",
      "universityName",
      "result",
      "yearOfPassing",
    ]);
    setEducations((prev) => [...prev, values]);
    setShowInputField(false);
  };

  const handleNext = async (e) => {
    try {
      setShowInputField(true);
      let value = getValues();
      await validationSchema.validate(value, { abortEarly: false });
      navigateTo("ExperienceDetails");
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  const validationSchema = yup.object({
    educationName: yup.string().required("Education Name is Required"),
    universityName: yup.string().required("University Name Is Required"),
    result: yup.string().required("Result Is Required"),
    yearOfPassing: yup.string().required("Year Of Passing Is Required"),
  });

  return (
    <>
      <h1 className="flex justify-center text-4xl font-semibold text-[#663bb7] mt-8 mb-6">
        Education Details
      </h1>

      <div className="flex justify-end mb-6 px-6">
        <button
          className="bg-[#663bb7] text-white px-5 py-2 rounded-xl hover:bg-[#512a99] transition"
          onClick={() => setShowInputField(true)}
        >
          ➕ Add Education
        </button>
      </div>

      <div className="overflow-x-auto px-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-md bg-white">
            <thead className="bg-[#f3eaff] text-black">
              <tr>
                <th className="p-3 text-center">Education Name</th>
                <th className="p-3 text-center">University Name</th>
                <th className="p-3 text-center">Result</th>
                <th className="p-3 text-center">Year of Passing</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((edu, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 border-t text-center">
                    {edu.educationName}
                  </td>
                  <td className="p-3 border-t text-center">
                    {edu.universityName}
                  </td>
                  <td className="p-3 border-t text-center">{edu.result}</td>
                  <td className="p-3 border-t text-center">
                    {edu.yearOfPassing}
                  </td>
                  <td className="p-3 border-t text-center">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() =>
                        setEducations(educations.filter((_, i) => i !== index))
                      }
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}

              {showInputField && (
                <tr className="bg-white h-full">
                  <td className="p-2 border-t text-center">
                    <input
                      type="text"
                      {...register("educationName")}
                      placeholder="Enter Education Name"
                      className="w-full p-2 rounded border focus:outline-none focus:border-[#663bb7] text-center"
                    />
                    {errors.educationName && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.educationName}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border-t text-center">
                    <input
                      type="text"
                      {...register("universityName")}
                      placeholder="Enter University Name"
                      className="w-full p-2 rounded border focus:outline-none focus:border-[#663bb7] text-center"
                    />
                    {errors.universityName && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.universityName}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border-t text-center">
                    <input
                      type="text"
                      {...register("result")}
                      placeholder="Enter Result"
                      className="w-full p-2 rounded border focus:outline-none focus:border-[#663bb7] text-center"
                    />
                    {errors.result && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.result}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border-t text-center">
                    <input
                      type="number"
                      {...register("yearOfPassing")}
                      placeholder="Enter Year"
                      className="w-full p-2 rounded border focus:outline-none focus:border-[#663bb7] text-center"
                    />
                    {errors.yearOfPassing && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.yearOfPassing}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border-t flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveEducation}
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
              onClick={navigateToExperienceDetails}
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

export default EducationDetails;
