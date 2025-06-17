import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useFormcontext from "../context/Form";
import bgImage from "../Image/triangles-1430105_960_720.webp";

const AddQuesion = () => {
  const { id } = useParams();
  const { addQuestion, removeQuestion, getFormById } = useFormcontext();
  const navigate = useNavigate();
  const [options, setOptions] = useState([""]);
  const [question, setQuestion] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [validation, setValidation] = useState({
    required: false,
    minLength: null,
    maxLength: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const form = getFormById(id);
  if (form && isLoading) {
    setIsLoading(false);
  }

  const handleBack = () => {
    navigate("/");
  };

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOptionField = () => {
    setOptions([...options, ""]);
  };

  const handleDeleteQuestion = (questionIndex) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      removeQuestion(parseInt(id), questionIndex);
    }
  };

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
    const newErrors = {};

    if (!question.trim()) {
      newErrors.question = "Question is required";
    } else if (question.trim().length < 2) {
      newErrors.question = "Question must be at least 2 characters";
    } else if (question.trim().length > 200) {
      newErrors.question = "Question must not exceed 200 characters";
    }

    if (!fieldType) {
      newErrors.fieldType = "Field type is required";
    }

    if (["dropdown", "radio", "checkbox", "multiple"].includes(fieldType)) {
      if (options.length === 0 || options.every((opt) => !opt.trim())) {
        newErrors.options = "At least one option is required";
      } else {
        options.forEach((opt, index) => {
          if (!opt.trim()) {
            newErrors.options = newErrors.options || [];
            newErrors.options[index] = "Option cannot be empty";
          }
        });
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newQuestion = {
      Questions: question,
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

    addQuestion(parseInt(id), newQuestion);

    setQuestion("");
    setFieldType("text");
    setValidation({
      required: false,
      minLength: null,
      maxLength: null,
    });
    setOptions([""]);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center min-h-screen w-screen flex items-start justify-around p-10"
      >
        <div className="bg-white/30 backdrop-blur-2xl rounded-2xl shadow-xl w-1/3 p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            {form?.title || "Form"} Questions
          </h1>

          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border-2 border-black p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Question*"
              />
              {errors.question && (
                <p className="text-red-500 text-sm">{errors.question}</p>
              )}
            </div>

            <div>
              <select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="border-2 w-full text-gray-700 border-black rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled hidden>
                  Type*
                </option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="textarea">TextArea</option>
                <option value="date">Date</option>
                <option value="dropdown">Dropdown</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="multiple">Multiple Select</option>
              </select>
              {errors.fieldType && (
                <p className="text-red-500 text-sm">{errors.fieldType}</p>
              )}
            </div>

            {(fieldType === "dropdown" ||
              fieldType === "radio" ||
              fieldType === "checkbox" ||
              fieldType === "multiple") && (
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm">Options</label>
                {options.map((opt, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(e.target.value, index)
                      }
                      placeholder={`Option ${index + 1}`}
                      className="border-2 border-black p-2 rounded-md focus:outline-none w-full"
                    />
                    {errors.options && errors.options[index] && (
                      <p className="text-red-500 text-sm">
                        {errors.options[index]}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOptionField}
                  className="bg-blue-300 hover:bg-blue-400 text-white text-sm py-1 px-2 rounded-md w-fit"
                >
                  + Add Option
                </button>
                {errors.options && typeof errors.options === "string" && (
                  <p className="text-red-500 text-sm">{errors.options}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <details className="border-2 border-black rounded-md p-2">
                <summary className="text-gray-700 font-semibold text-sm cursor-pointer focus:outline-none">
                  Validation
                </summary>
                <div className="mt-2 space-y-3 pl-2">
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
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="minLength"
                            checked={validation.minLength !== null}
                            onChange={(e) => {
                              if (!e.target.checked) {
                                setValidation((prev) => ({
                                  ...prev,
                                  minLength: null,
                                }));
                              } else {
                                setValidation((prev) => ({
                                  ...prev,
                                  minLength: 1,
                                }));
                              }
                            }}
                            className="mr-2"
                          />
                          <span>Min Length</span>
                        </div>
                        {validation.minLength !== null && (
                          <div className="ml-6 mt-1">
                            <input
                              type="number"
                              name="minLength"
                              value={validation.minLength || ""}
                              onChange={handleValidationChange}
                              min="1"
                              className="w-20 border p-1 rounded"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="maxLength"
                            checked={validation.maxLength !== null}
                            onChange={(e) => {
                              if (!e.target.checked) {
                                setValidation((prev) => ({
                                  ...prev,
                                  maxLength: null,
                                }));
                              } else {
                                setValidation((prev) => ({
                                  ...prev,
                                  maxLength: 1,
                                }));
                              }
                            }}
                            className="mr-2"
                          />
                          <span>Max Length</span>
                        </div>
                        {validation.maxLength !== null && (
                          <div className="ml-6 mt-1">
                            <input
                              type="number"
                              name="maxLength"
                              value={validation.maxLength || ""}
                              onChange={handleValidationChange}
                              min="1"
                              className="w-20 border p-1 rounded"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </details>
            </div>

            <button
              type="submit"
              className="bg-orange-300 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
            >
              Add Question To Form
            </button>

            <button
              onClick={handleBack}
              className="border-2 p-2 rounded-lg hover:bg-gray-200"
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-2xl rounded-2xl shadow-xl w-1/3 p-6">
          <h2 className="text-xl font-bold mb-4">Questions</h2>
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : form?.questions?.length > 0 ? (
              form.questions.map((data, index) => (
                <div
                  key={index}
                  className="bg-white/30 backdrop-blur-md text-black p-3 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      {index + 1}. {data.Questions}
                    </p>
                    <p className="text-sm text-gray-100">{data.fieldType}</p>
                    {data.validation?.required && (
                      <p className="text-xs text-red-400">Required</p>
                    )}
                    {data.validation?.minLength && (
                      <p className="text-xs text-yellow-400">
                        Min Length: {data.validation.minLength}
                      </p>
                    )}
                    {data.validation?.maxLength && (
                      <p className="text-xs text-yellow-400">
                        Max Length: {data.validation.maxLength}
                      </p>
                    )}
                    {data.options && (
                      <ul className="list-disc ml-4 text-xs text-white">
                        {data.options.map((opt, i) => (
                          <li key={i}>{opt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/editQuestion/${id}/${index}`}
                      className="text-white hover:text-yellow-300"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDeleteQuestion(index)}
                      className="text-white hover:text-red-400"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white/30 backdrop-blur-md text-black p-4 rounded-xl text-center">
                <p>No questions available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddQuesion;
