import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [inputStatus, setInputStatus] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [values, setValues] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [folderStructure, setFolderStructure] = useState({
    name: "",
    type: "",
    id: "",
    pid: "",
    children: [],
  });
  const [folderType, setFolderType] = useState("Folder");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    console.log("folderStructure", folderStructure);
    console.log("values", values);
  }, [folderStructure, values]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFolderStructure((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddFolder() {
    setParentId(null);
    setInputStatus(true);
    setFolderType("Folder");
  }

  function handleClose() {
    setInputStatus(false);
    setShowInput(false);
    setFolderStructure({
      name: "",
      type: "",
      id: "",
      pid: "",
      children: [],
    });
  }

  function createChildren(prev, newItem) {
    return prev.map((item) => {
      if (item.id === parentId && item.type === "Folder") {
        return {
          ...item,
          children: [...item.children, newItem],
        };
      } else if (item.children?.length) {
        return {
          ...item,
          children: createChildren(item.children, newItem),
        };
      } else {
        return item;
      }
    });
  }

  function addHandler() {
    const newItem = {
      name: folderStructure.name,
      type: folderType,
      id: Date.now().toString(),
      pid: parentId,
      children: [],
    };

    if (parentId === null) {
      setValues((prev) => [...prev, newItem]);
    } else {
      setValues((prev) => createChildren(prev, newItem));
    }

    handleClose();
  }

  function addFolder(id, type = "Folder") {
    setShowInput(true);
    setParentId(id);
    setFolderType(type);
  }

  function deletes(prev, id) {
    return prev
      .filter((item) => item.id !== id)
      .map((item) => ({
        ...item,
        children: deletes(item.children, id),
      }));
  }

  function deleteHandler(id) {
    setValues((prev) => deletes(prev, id));
  }

  function updateValues(items, id, editValues) {
    return items.map((item) => {
      if (item.id === id) {
        return { ...item, name: editValues };
      }
      if (item.children?.length) {
        return {
          ...item,
          children: updateValues(item.children, id, editValues),
        };
      }
      return item;
    });
  }

  function saveEdit(id) {
    setValues((prev) => updateValues(prev, id, editValue));
    setEditId(null);
    setEditValue("");
  }

  function renderFolders(folders) {
    return folders.map((data) => (
      <motion.div
        key={data.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="ml-6 border-l-2 border-purple-400 pl-4"
      >
        <div className="group inline-flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 transition duration-200 shadow-sm transform hover:scale-105">
          <span className="text-xl">
            {data.type === "Folder" ? "📁" : "📄"}
          </span>
          <span className="text-purple-800 font-semibold mr-3">
            {data.name}
          </span>

          <div className="hidden group-hover:flex ml-2 bg-white rounded-xl">
            {data.type === "Folder" && (
              <>
                <button
                  onClick={() => addFolder(data.id, "Folder")}
                  className="hover:scale-110 transition"
                  title="Add Folder"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 4 4 C 2.9057453 4 2 4.9057453 2 6 L 2 18 C 2 19.094255 2.9057453 20 4 20 L 20 20 C 21.094255 20 22 19.094255 22 18 L 22 8 C 22 6.9057453 21.094255 6 20 6 L 12 6 L 10 4 L 4 4 z M 4 6 L 9.171875 6 L 11.171875 8 L 20 8 L 20 18 L 4 18 L 4 6 z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => addFolder(data.id, "File")}
                  className="hover:scale-110 transition"
                  title="Add File"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 6 2 C 4.9057453 2 4 2.9057453 4 4 L 4 20 C 4 21.094255 4.9057453 22 6 22 L 18 22 C 19.094255 22 20 21.094255 20 20 L 20 8 L 14 2 L 6 2 z M 6 4 L 13 4 L 13 9 L 18 9 L 18 20 L 6 20 L 6 4 z"></path>
                  </svg>
                </button>
              </>
            )}
            <button
              onClick={() => {
                setEditId(data.id);
                setEditValue(data.name);
              }}
              className="hover:scale-110 transition"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteHandler(data.id)}
              className="hover:scale-110 transition"
              title="Delete"
            >
              ❌
            </button>
          </div>
        </div>

        {editId === data.id && (
          <div className="mt-2 ml-6 bg-white p-2 rounded-xl shadow border border-purple-300 w-fit">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="p-2 border border-purple-400 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => saveEdit(data.id)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600 transition"
            >
              💾 Save
            </button>
            <button
              onClick={() => setEditId(null)}
              className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition"
            >
              ❎ Cancel
            </button>
          </div>
        )}

        {showInput && parentId === data.id && (
          <motion.div
            key={`input-${data.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-2 ml-6 bg-white p-3 rounded-xl shadow border border-purple-300 w-fit"
          >
            <input
              type="text"
              placeholder={`Enter ${folderType} Name`}
              name="name"
              value={folderStructure.name}
              onChange={handleChange}
              className="p-2 border border-purple-400 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addHandler}
              className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2 hover:bg-green-600 transition"
            >
              ✅ Add
            </button>
            <button
              onClick={handleClose}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
            >
              ❎ Cancel
            </button>
          </motion.div>
        )}

        {data.type === "Folder" &&
          data.children &&
          renderFolders(data.children)}
      </motion.div>
    ));
  }

  return (
    <div className="w-screen p-4">
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
        className="text-3xl font-bold text-white bg-purple-700 rounded-xl p-4 text-center shadow-lg"
      >
        📂 Folder Structure Maker
      </motion.h1>

      <div className="mt-6">
        <button
          onClick={handleAddFolder}
          className="bg-purple-700 w-[200px] flex items-center m-2 hover:bg-purple-800 transition text-white text-lg px-6 py-2 rounded-lg shadow-md"
        >
          <svg
            fill="#000000"
            height="18px"
            width="18px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 27.963 27.963"
            xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g id="c140__x2B_">
                  {" "}
                  <path d="M13.98,0C6.259,0,0,6.26,0,13.982s6.259,13.981,13.98,13.981c7.725,0,13.983-6.26,13.983-13.981 C27.963,6.26,21.705,0,13.98,0z M21.102,16.059h-4.939v5.042h-4.299v-5.042H6.862V11.76h5.001v-4.9h4.299v4.9h4.939v4.299H21.102z "></path>{" "}
                </g>{" "}
                <g id="Capa_1_9_"> </g>{" "}
              </g>{" "}
            </g>
          </svg>
          <div className="ml-2">Add Root Folder</div>
        </button>

        <AnimatePresence>
          {inputStatus && parentId === null && (
            <motion.div
              key="input-root"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-4 bg-white p-4 rounded-xl shadow-lg border border-purple-300 w-fit"
            >
              <input
                type="text"
                placeholder={`Enter ${folderType} Name`}
                name="name"
                value={folderStructure.name}
                onChange={handleChange}
                className="p-2 border border-purple-400 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={addHandler}
                className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2 hover:bg-green-600 transition"
              >
                ✅ Add
              </button>
              <button
                onClick={handleClose}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                ❎ Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6">
          {values.length ? (
            renderFolders(values)
          ) : (
            <p className="text-gray-500 italic mt-4">No folders created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
