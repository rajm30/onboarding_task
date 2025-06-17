import { useParams, useNavigate } from "react-router-dom";
import useFormcontext from "../context/Form";
import bgImage from "../Image/triangles-1430105_960_720.webp";

const Preview = () => {
  const { getFormById } = useFormcontext();
  const navigate = useNavigate();
  const { id } = useParams();

  const form = getFormById(id);

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElement = e.target;
    if (formElement.checkValidity()) {
      alert("Form submitted successfully!");
    } else {
      const invalidElements = formElement.querySelectorAll(":invalid");
      if (invalidElements.length > 0) {
        invalidElements[0].focus();
      }
    }
  };

  if (!form) {
    return (
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover min-h-screen flex items-center justify-center"
      >
        <div className="bg-white/30 backdrop-blur-xl p-8 rounded-xl text-center">
          <p className="text-2xl font-bold text-white mb-4">Form not found</p>
          <button
            onClick={handleBack}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover min-h-screen p-10"
    >
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/30 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{form.title}</h1>
            <p className="text-white/80 mb-6">Form Preview</p>

            {form.questions.length === 0 ? (
              <div className="bg-white/20 p-4 rounded-lg">
                <p className="text-white">
                  No questions added to this form yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {form.questions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-white/20 p-4 rounded-lg border border-white/10"
                  >
                    <label className="block text-white font-medium mb-2">
                      {index + 1}. {question.Questions}
                      {question.validation?.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    {question.validation?.minLength && (
                      <p className="text-sm text-yellow-300 mb-1">
                        Minimum length: {question.validation.minLength}
                      </p>
                    )}
                    {question.validation?.maxLength && (
                      <p className="text-sm text-yellow-300 mb-1">
                        Maximum length: {question.validation.maxLength}
                      </p>
                    )}

                    {question.fieldType === "text" && (
                      <input
                        type="text"
                        className="w-full p-2 rounded border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={question.validation?.required || false}
                        minLength={question.validation?.minLength || undefined}
                        maxLength={question.validation?.maxLength || undefined}
                        onInput={(e) => {
                          if (
                            question.validation?.minLength &&
                            e.target.value.length <
                              question.validation.minLength
                          ) {
                            e.target.setCustomValidity(
                              `Minimum length is ${question.validation.minLength}`
                            );
                          } else if (
                            question.validation?.maxLength &&
                            e.target.value.length >
                              question.validation.maxLength
                          ) {
                            e.target.setCustomValidity(
                              `Maximum length is ${question.validation.maxLength}`
                            );
                          } else {
                            e.target.setCustomValidity("");
                          }
                        }}
                      />
                    )}

                    {question.fieldType === "textarea" && (
                      <textarea
                        className="w-full p-2 rounded border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        required={question.validation?.required || false}
                        minLength={question.validation?.minLength || undefined}
                        maxLength={question.validation?.maxLength || undefined}
                        onInput={(e) => {
                          if (
                            question.validation?.minLength &&
                            e.target.value.length <
                              question.validation.minLength
                          ) {
                            e.target.setCustomValidity(
                              `Minimum length is ${question.validation.minLength}`
                            );
                          } else if (
                            question.validation?.maxLength &&
                            e.target.value.length >
                              question.validation.maxLength
                          ) {
                            e.target.setCustomValidity(
                              `Maximum length is ${question.validation.maxLength}`
                            );
                          } else {
                            e.target.setCustomValidity("");
                          }
                        }}
                      />
                    )}

                    {question.fieldType === "number" && (
                      <input
                        type="number"
                        className="w-full p-2 rounded border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={question.validation?.required || false}
                      />
                    )}

                    {question.fieldType === "date" && (
                      <input
                        type="date"
                        className="w-full p-2 rounded border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={question.validation?.required || false}
                      />
                    )}

                    {(question.fieldType === "radio" ||
                      question.fieldType === "checkbox") &&
                      question.options?.map((option, i) => (
                        <div key={i} className="flex items-center mt-2">
                          <input
                            type={question.fieldType}
                            name={`question-${index}`}
                            id={`option-${index}-${i}`}
                            className="mr-2"
                            required={
                              question.validation?.required && i === 0
                                ? true
                                : false
                            }
                          />
                          <label
                            htmlFor={`option-${index}-${i}`}
                            className="text-white"
                          >
                            {option}
                          </label>
                        </div>
                      ))}

                    {question.fieldType === "dropdown" && (
                      <select
                        className="w-full p-2 rounded border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={question.validation?.required || false}
                      >
                        <option value="">Select an option</option>
                        {question.options?.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {question.fieldType === "multiple" && (
                      <select
                        multiple
                        className="w-full p-2 rounded border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={question.validation?.required || false}
                      >
                        {question.options?.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Submit Form
                </button>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preview;
