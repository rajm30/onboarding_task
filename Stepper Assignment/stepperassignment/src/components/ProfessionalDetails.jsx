import { useNavigate } from "react-router";
import useStepper from "../context/Stepper";
import useFormData from "../context/FormData";
import * as yup from "yup";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import Select from "react-select";

const skillOptions = [
  { value: "React", label: "React" },
  { value: "Angular", label: "Angular" },
  { value: "Vue", label: "Vue" },
  { value: "Node.js", label: "Node.js" },
  { value: "Python", label: "Python" },
  { value: "SQL", label: "SQL" },
];

const ProfessionalDetails = () => {
  const [errors, setErrors] = useState({});
  const { navigateTo } = useStepper();
  const navigate = useNavigate();
  const { register, getValues, control, setValue, watch } = useFormData();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "resume",
  });

  function navigateTOHome() {
    navigate("/");
  }

  function navigateToExperienceDetails() {
    navigateTo("ExperienceDetails");
  }

  const handlebutton = async (e) => {
    e.preventDefault();
    try {
      let value = getValues();
      await validationSchema.validate(value, { abortEarly: false });
      navigateTo("CurrentOrganizationDetails");
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  const validationSchema = yup.object({
    designation: yup.string().required("Designation is Required"),
    department: yup.string().required("Department is Required"),
    years: yup.string().required("Years is Required"),
    months: yup.string().required("Months is Required"),
    currentLocation: yup.string().required("CurrentLocation is Required"),
    skills: yup
      .array()
      .min(1, "At least one skill is required")
      .required("Skills are Required"),
  });

  return (
    <>
      <h1 className="text-4xl text-[#663bb7] font-bold text-center mt-7 mb-10">
        Professional Details
      </h1>
      <div className="mx-4 md:mx-10 mb-10 p-6 mt-8 bg-white rounded-2xl shadow-lg">
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="designation"
                className="text-gray-700 font-semibold"
              >
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("designation", { required: true })}
                className="w-full border-2 rounded-lg border-gray-300 p-2 focus:outline-none focus:border-[#663bb7]"
              />
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.designation}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="department"
                className="text-gray-700 font-semibold"
              >
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("department", { required: true })}
                className="w-full border-2 rounded-lg border-gray-300 p-2 focus:outline-none focus:border-[#663bb7]"
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label htmlFor="years" className="text-gray-700 font-semibold">
                Years <span className="text-red-500">*</span>
              </label>
              <select
                {...register("years", { required: true })}
                className="w-full border-2 rounded-lg border-gray-300 p-2 focus:outline-none focus:border-[#663bb7]"
              >
                <option value="">Select</option>
                {[...Array(11).keys()].map((val) => (
                  <option key={val} value={val}>
                    {val} {val === 1 ? "Year" : "Years"}
                  </option>
                ))}
              </select>
              {errors.years && (
                <p className="text-red-500 text-sm mt-1">{errors.years}</p>
              )}
            </div>

            <div>
              <label htmlFor="months" className="text-gray-700 font-semibold">
                Months <span className="text-red-500">*</span>
              </label>
              <select
                {...register("months", { required: true })}
                className="w-full border-2 rounded-lg border-gray-300 p-2 focus:outline-none focus:border-[#663bb7]"
              >
                <option value="">Select</option>
                {[...Array(13).keys()].map((val) => (
                  <option key={val} value={val}>
                    {val} Month{val !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              {errors.months && (
                <p className="text-red-500 text-sm mt-1">{errors.months}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="currentLocation"
                className="text-gray-700 font-semibold"
              >
                Current Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("currentLocation", { required: true })}
                className="w-full border-2 rounded-lg border-gray-300 p-2 focus:outline-none focus:border-[#663bb7]"
              />
              {errors.currentLocation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentLocation}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="skills" className="text-gray-700 font-semibold">
              Skills <span className="text-red-500">*</span>
            </label>
            <Select
              isMulti
              name="skills"
              options={skillOptions}
              classNamePrefix="select"
              onChange={(selected) => {
                setValue(
                  "skills",
                  selected.map((item) => item.value)
                );
              }}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
          </div>

          <div className="mt-10">
            <label
              htmlFor="chooseFile"
              className="cursor-pointer inline-block border-2 border-[#663bb7] px-4 py-2 rounded-xl text-black hover:bg-[#663bb7] hover:text-white transition"
            >
              Upload Resume
            </label>
            <input
              type="file"
              id="chooseFile"
              name="chooseFile"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () =>
                    append({ file, base64: reader.result });
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div className="flex gap-4 mt-4">
              {fields.map((item, index) => (
                <div key={item.id} className="relative">
                  <img
                    src={item.base64}
                    alt="Preview"
                    className="w-20 h-20 object-cover border rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={navigateTOHome}
              className="bg-white border-2 border-[#663bb7] text-[#663bb7] px-6 py-2 rounded-lg hover:bg-[#663bb7] hover:text-white transition"
            >
              Back to List
            </button>

            <div className="space-x-4">
              <button
                type="button"
                onClick={navigateToExperienceDetails}
                className="bg-white border-2 border-[#663bb7] text-[#663bb7] px-6 py-2 rounded-lg hover:bg-[#663bb7] hover:text-white transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlebutton}
                className="bg-white border-2 border-[#663bb7] text-[#663bb7] px-6 py-2 rounded-lg hover:bg-[#663bb7] hover:text-white transition"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfessionalDetails;
