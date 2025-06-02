import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { StepperProvider } from "./context/Stepper";
import { FormDataProvider } from "./context/FormData";
import { StepContent } from "./components/StepContent";

function App() {
  return (
    <FormDataProvider>
      <StepperProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addemployee" element={<StepContent />} />
        </Routes>
      </StepperProvider>
    </FormDataProvider>
  );
}

export default App;
