import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFormcontext from "../context/Form";
import bgImage from "../Image/triangles-1430105_960_720.webp";

const EditQuestion = () => {
  const { formId, questionId } = useParams();
  const { editQuestion, getFormById } = useFormcontext();
  const navigate = useNavigate();

  const form = getFormById(formId);
  const question = form?.questions[parseInt(questionId)];

  const [options, setOptions] = useState([""]);
  const [questionText, setQuestionText] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [validation, setValidation] = useState({
    required: false,
    minLength: null,
    maxLength: null,
  });

  useEffect(() => {
    if (question) {
      setQuestionText(question.Questions);
      setFieldType(question.fieldType);
      setValidation(
        question.validation || {
          required: false,
          minLength: null,
          maxLength: null,
        }
      );
      setOptions(question.options || [""]);
    }
  }, [question]);

  const handleValidationChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setValidation((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setValidation((prev) => ({
        ...prev,
        [name]: value ? parseInt(value) : null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedQuestion = {
      Questions: questionText,
      fieldType,
      validation: {
        required: validation.required,
        ...(validation.minLength !== null && {
          minLength: validation.minLength,
        }),
        ...(validation.maxLength !== null && {
          maxLength: validation.maxLength,
        }),
      },
      ...(fieldType === "dropdown" ||
      fieldType === "radio" ||
      fieldType === "checkbox" ||
      fieldType === "multiple"
        ? { options: options.filter((opt) => opt.trim() !== "") }
        : {}),
    };

    editQuestion(parseInt(formId), parseInt(questionId), updatedQuestion);
    navigate(`/addForm/${formId}`);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover min-h-screen flex items-center justify-center"
    >
      <div className="bg-white/30 backdrop-blur-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Question</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Question</label>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="textarea">TextArea</option>
              <option value="date">Date</option>
              <option value="dropdown">Dropdown</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
              <option value="multiple">Multiple Select</option>
            </select>
          </div>

          {(fieldType === "dropdown" ||
            fieldType === "radio" ||
            fieldType === "checkbox" ||
            fieldType === "multiple") && (
            <div>
              <label className="block mb-1 font-medium">Options</label>
              {options.map((opt, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    className="flex-1 p-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newOptions = [...options];
                        newOptions.splice(index, 1);
                        setOptions(newOptions);
                      }}
                      className="ml-2 bg-red-500 text-white px-2 rounded"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setOptions([...options, ""])}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add Option
              </button>
            </div>
          )}

          <div className="space-y-2">
            <label className="font-semibold text-sm">Validation</label>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="required"
                checked={validation.required}
                onChange={handleValidationChange}
                className="mr-2"
              />
              <span>Required</span>
            </div>

            {(fieldType === "text" || fieldType === "textarea") && (
              <>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="minLength"
                    checked={validation.minLength !== null}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setValidation((prev) => ({ ...prev, minLength: null }));
                      } else {
                        setValidation((prev) => ({ ...prev, minLength: 1 }));
                      }
                    }}
                    className="mr-2"
                  />
                  <span>Min Length</span>
                  {validation.minLength !== null && (
                    <input
                      type="number"
                      name="minLength"
                      value={validation.minLength || ""}
                      onChange={handleValidationChange}
                      min="1"
                      className="ml-2 w-20 border-2 border-black p-1 rounded-md"
                    />
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="maxLength"
                    checked={validation.maxLength !== null}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setValidation((prev) => ({ ...prev, maxLength: null }));
                      } else {
                        setValidation((prev) => ({ ...prev, maxLength: 1 }));
                      }
                    }}
                    className="mr-2"
                  />
                  <span>Max Length</span>
                  {validation.maxLength !== null && (
                    <input
                      type="number"
                      name="maxLength"
                      value={validation.maxLength || ""}
                      onChange={handleValidationChange}
                      min="1"
                      className="ml-2 w-20 border-2 border-black p-1 rounded-md"
                    />
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(`/addForm/${formId}`)}
              className="px-4 py-2 border-2 border-black rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
