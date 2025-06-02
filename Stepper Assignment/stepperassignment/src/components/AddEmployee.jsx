import { useNavigate } from "react-router-dom";
import useStepper from "../context/Stepper";
import useFormData from "../context/FormData";
import * as yup from "yup";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

const AddEmployee = () => {
  const { register, getValues, setValue, control } = useFormData();
  const { navigateTo } = useStepper();
  const navigate = useNavigate();
  const [errorss, setErrors] = useState({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  function navigateTOHome() {
    navigate("/");
  }

  function copyButton() {
    let value = getValues();
    setValue("permanentAddress", value.presentAddress);
  }
  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is Required"),
    middleName: yup.string().required("Middle Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid Email Format"),
    mobileNumber: yup
      .string()
      .required("Mobile Number is Required")
      .matches(/^\+?[1-9][0-9]{7,14}$/, "Invalid Format"),
    birthDate: yup.string().required("Birth Date is Required"),
    presentAddress: yup.string().required("Present Address is Required"),
    permanentAddress: yup.string().required("Parmnent Address is Required"),
  });

  const handlebutton = async (e) => {
    e.preventDefault();
    try {
      let value = getValues();
      await validationSchema.validate(value, { abortEarly: false });
      navigate("/addemployee");
      navigateTo("BankDetails");
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  return (
    <>
      <div className="text-center text-4xl font-bold text-[#663bb7] mb-7 mt-7">
        Personal Details
      </div>

      <form className="mx-4 md:mx-10  bg-white p-8 rounded-2xl shadow-md text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
          {[
            { id: "firstName", label: "First Name" },
            { id: "middleName", label: "Middle Name" },
            { id: "lastName", label: "Last Name" },
          ].map(({ id, label }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-black font-medium">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register(id, { required: true })}
                className="w-full border-b-2 text-black border-gray-400 focus:outline-none focus:border-[#663bb7] py-1"
              />
              {errorss[id] && (
                <div className="text-red-500 text-sm mt-1">{errorss[id]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { id: "email", label: "Email", type: "email" },
            { id: "mobileNumber", label: "Mobile Number", type: "text" },
            { id: "birthDate", label: "Birth Date", type: "date" },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-black font-medium">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                {...register(id, { required: true })}
                className="w-full border-b-2  border-gray-400 focus:outline-none focus:border-[#663bb7] py-1"
              />
              {errorss[id] && (
                <div className="text-red-500 text-sm mt-1">{errorss[id]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <label
            htmlFor="chooseFile"
            className="cursor-pointer inline-block border-2 border-[#663bb7] px-4 py-2 rounded-xl text-black hover:bg-[#663bb7] hover:text-white transition"
          >
            Upload Image
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            { id: "presentAddress", label: "Present Address" },
            { id: "permanentAddress", label: "Permanent Address" },
          ].map(({ id, label }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-black font-medium">
                {label} <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register(id, { required: true })}
                className="w-full h-24 border-b-2 border-gray-400 focus:outline-none focus:border-[#663bb7] resize-none"
              />
              {errorss[id] && (
                <div className="text-red-500 text-sm mt-1">{errorss[id]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <input
            type="checkbox"
            id="copyCheckbox"
            className="accent-[#663bb7]"
            onClick={copyButton}
          />
          <label htmlFor="copyCheckbox" className="ml-2 text-gray-600">
            Copy to Permanent Address
          </label>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-10 gap-4">
          <button
            type="button"
            onClick={navigateTOHome}
            className="border-2 border-[#663bb7] text-[#663bb7] px-6 py-3 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
          >
            Back to List
          </button>
          <button
            type="button"
            onClick={handlebutton}
            className="bg-white border-2 border-[#663bb7] text-[#663bb7] px-6 py-3 rounded-xl hover:bg-[#663bb7] hover:text-white transition"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEmployee;
