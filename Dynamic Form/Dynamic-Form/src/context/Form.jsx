import { useContext, createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useState([]);

  const addForm = (title) => {
    const newForm = {
      id: Date.now(),
      title,
      questions: [],
    };
    setForms((prev) => [...prev, newForm]);
    return newForm.id;
  };

  const editForm = (formId, newTitle) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId ? { ...form, title: newTitle } : form
      )
    );
  };

  const removeForm = (formId) => {
    setForms((prev) => prev.filter((form) => form.id !== formId));
  };

  const addQuestion = (formId, question) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? { ...form, questions: [...form.questions, question] }
          : form
      )
    );
  };

  const editQuestion = (formId, questionIndex, updatedQuestion) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((q, idx) =>
                idx === questionIndex ? updatedQuestion : q
              ),
            }
          : form
      )
    );
  };

  const removeQuestion = (formId, questionIndex) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.filter(
                (_, idx) => idx !== questionIndex
              ),
            }
          : form
      )
    );
  };

  const getFormById = (formId) => {
    return forms.find((form) => form.id.toString() === formId.toString());
  };

  return (
    <FormContext.Provider
      value={{
        forms,
        addForm,
        editForm,
        removeForm,
        addQuestion,
        editQuestion,
        removeQuestion,
        getFormById,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default function useFormContext() {
  return useContext(FormContext);
}
