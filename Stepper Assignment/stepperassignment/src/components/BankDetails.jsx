import React, { useState } from "react";
import { useNavigate } from "react-router";
import useStepper from "../context/Stepper";
import useFormData from "../context/FormData";
import * as yup from "yup";

const BankDetails = () => {
  const { navigateTo } = useStepper();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { register, getValues } = useFormData();

  function navigateTOHome() {
    navigate("/");
  }

  function navigateToExperienceDetails() {
    navigateTo("Addemployee");
  }

  const handlebutton = async (e) => {
    e.preventDefault();
    const value = getValues();
    try {
      await validationSchema.validate(value, { abortEarly: false });
      navigateTo("EducationDetails");
    } catch (error) {
      const newError = {};

      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  const validationSchema = yup.object({
    bankName: yup.string().required("Bank Name is Required"),
    accountHolderName: yup.string().required("Account Holder Name Is Required"),
    bankAccountNumber: yup
      .string()
      .required("Bank Account Number Is Required")
      .matches("^[0-9]{9,18}$", `Must be in this format: "635802010014976"`),
    ifscCode: yup
      .string()
      .required("IFSC Code Is Required")
      .matches("^[A-Z]{4}0[A-Z0-9]{6}$", `IFSC Code Format is: "SBIN0125620"`),
    aadharcardNumber: yup
      .string()
      .required("Aadhar Card Number Is Required")
      .matches(
        "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$",
        "must be in 12 digit ex: 3675 9834 6015"
      ),
    panCardNumber: yup
      .string()
      .required("Pan Card Number Is Required")
      .matches(
        /([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
        `Enter Pan CArd number in this Format "VODMP2671P"`
      ),
  });

  return (
    <div className=" p-6">
      <h1 className="text-4xl font-bold text-center text-[#663bb7] mb-10">
        Bank Details
      </h1>
      <form className="mx-4 md:mx-10 mb-10 bg-white shadow-xl p-8 rounded-2xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div>
            <label className="text-gray-700 font-semibold mb-1 block">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("bankName")}
              className="w-full border-2 rounded-lg border-gray-300 p-2 focus:outline-none focus:border-[#663bb7]"
            />
            {errors.bankName && (
              <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
            )}
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-1 block">
              Account Holder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("accountHolderName")}
              className="w-full border-2 rounded-lg p-2 border-gray-300 focus:outline-none focus:border-[#663bb7]"
            />
            {errors.accountHolderName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.accountHolderName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700 font-semibold mb-1 block">
              Bank Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("bankAccountNumber")}
              className="w-full border-2 rounded-lg p-2 border-gray-300 focus:outline-none focus:border-[#663bb7]"
            />
            {errors.bankAccountNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bankAccountNumber}
              </p>
            )}
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-1 block">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("ifscCode")}
              className="w-full border-2 rounded-lg p-2 border-gray-300 focus:outline-none focus:border-[#663bb7]"
            />
            {errors.ifscCode && (
              <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700 font-semibold mb-1 block">
              Aadhar Card Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("aadharcardNumber")}
              className="w-full border-2 rounded-lg p-2 border-gray-300 focus:outline-none focus:border-[#663bb7]"
            />
            {errors.aadharcardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.aadharcardNumber}
              </p>
            )}
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-1 block">
              PAN Card Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("panCardNumber")}
              className="w-full border-2 rounded-lg p-2 border-gray-300 focus:outline-none focus:border-[#663bb7]"
            />
            {errors.panCardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.panCardNumber}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <button
            type="button"
            onClick={navigateTOHome}
            className="bg-white border-2 border-[#663bb7] text-[#663bb7] px-6 py-3 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
          >
            Back to List
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={navigateToExperienceDetails}
              className="bg-white border-2 border-[#663bb7] text-[#663bb7] px-6 py-3 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
            >
              Back
            </button>
            <button
              onClick={handlebutton}
              className=" bg-white border-2 border-[#663bb7] text-[#663bb7] px-6 py-3 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankDetails;
