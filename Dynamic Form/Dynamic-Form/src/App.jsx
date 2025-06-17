import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Preview from "./components/Preview";
import AddForm from "./components/AddForm";
import AddQuestion from "./components/AddQuesion";
// import EditForm from "./components/EditForm";
import EditQuestion from "./components/EditQuestion";
import { FormProvider } from "./context/Form";

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/addForm" element={<AddForm />} />
        <Route path="/addForm/:id" element={<AddQuestion />} />
        {/* <Route path="/editForm/:id" element={<EditForm />} /> */}
        <Route
          path="/editQuestion/:formId/:questionId"
          element={<EditQuestion />}
        />
      </Routes>
    </FormProvider>
  );
}

export default App;
