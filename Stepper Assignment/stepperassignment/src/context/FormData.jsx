import { useContext, createContext, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export const formDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [allData, setAllData] = useState([]);

  return (
    <formDataContext.Provider
      value={{
        register,
        handleSubmit,
        getValues,
        setValue,
        allData,
        setAllData,
        control,
        watch,
        formState: { errors },
        reset,
      }}
    >
      {children}
    </formDataContext.Provider>
  );
};

export default function useFormData() {
  return useContext(formDataContext);
}
