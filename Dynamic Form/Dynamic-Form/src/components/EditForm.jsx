// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import useFormcontext from "../context/Form";
// import bgImage from "../Image/triangles-1430105_960_720.webp";

// const EditForm = () => {
//   const { id } = useParams();
//   const { editForm, getFormById } = useFormcontext();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     const form = getFormById(id);
//     if (form) {
//       setTitle(form.title);
//     }
//   }, [id, getFormById]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title.trim()) {
//       editForm(parseInt(id), title);
//       navigate("/");
//     }
//   };

//   const handleCancel = () => {
//     navigate("/");
//   };

//   return (
//     <div
//       style={{ backgroundImage: `url(${bgImage})` }}
//       className="bg-cover bg-center h-screen flex items-center justify-center"
//     >
//       <div className="bg-white/30 backdrop-blur-2xl shadow-xl rounded-lg p-8 w-[400px]">
//         <h1 className="font-bold text-4xl text-center">Edit Form</h1>
//         <form onSubmit={handleSubmit}>
//           <fieldset className="border-2 p-3 mt-7 rounded-md">
//             <legend className="text-lg font-semibold">Form Name:</legend>
//             <input
//               placeholder="Enter Name"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="border-2 border-gray-700 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </fieldset>

//           <div className="mt-3 flex justify-center">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="m-2 rounded-xl border-2 border-black px-4 py-2 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="m-2 rounded-xl border-2 border-black px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditForm;
