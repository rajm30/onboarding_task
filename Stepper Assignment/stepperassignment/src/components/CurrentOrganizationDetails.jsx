import { useNavigate } from "react-router";
import useStepper from "../context/Stepper";
import useFormData from "../context/FormData";
const CurrentOrganizationDetails = () => {
  const { navigateTo } = useStepper();
  const navigate = useNavigate();

  const {
    allData,
    register,
    handleSubmit,
    setAllData,
    reset,
    formState: { errors },
  } = useFormData();

  function navigateTOHome() {
    navigate("/");
  }

  function navigateToExperienceDetails() {
    navigateTo("ProfessionalDetails");
  }

  function handleSubmitData(data) {
    if (data.id) {
      const updatedDataList = allData.map((item) =>
        item.id === data.id ? { ...item, ...data } : item
      );
      setAllData(updatedDataList);
      localStorage.setItem("employee", JSON.stringify(updatedDataList));
    } else {
      const dataWithId = { ...data, id: Date.now() };
      const updatedList = [...allData, dataWithId];
      setAllData(updatedList);
      localStorage.setItem("employee", JSON.stringify(updatedList));
    }

    navigate("/");
    reset();
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl text-center font-semibold text-[#663bb7] mb-12">
        Current Organization Details
      </h1>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <label
              htmlFor="joiningDate"
              className="block text-gray-700 font-medium mb-1"
            >
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("joiningDate", {
                required: "Joining date is required",
              })}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#663bb7] py-1"
            />
            {errors.joiningDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.joiningDate.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="nextAppraisalDate"
              className="block text-gray-700 font-medium mb-1"
            >
              Next Appraisal Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("nextAppraisalDate", {
                required: "Next appraisal date is required",
              })}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#663bb7] py-1"
            />
            {errors.nextAppraisalDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nextAppraisalDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-10">
          <label
            htmlFor="currentCTC"
            className="block text-gray-700 font-medium mb-1"
          >
            Current CTC <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("currentCTC", {
              required: "Current CTC is required",
            })}
            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#663bb7] py-1"
          />
          {errors.currentCTC && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentCTC.message}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12">
          <button
            type="button"
            onClick={navigateTOHome}
            className="bg-white border-2 border-[#663bb7] text-[#663bb7] font-medium px-6 py-2 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
          >
            Back to List
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={navigateToExperienceDetails}
              className="bg-white border-2 border-[#663bb7] text-[#663bb7] font-medium px-6 py-2 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
            >
              Back
            </button>
            <input
              type="submit"
              value="Submit"
              className="cursor-pointer bg-[#663bb7] text-white font-medium px-6 py-2 rounded-xl hover:bg-[#867b9b] transition"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CurrentOrganizationDetails;
