import { useContext, createContext, useState, useEffect } from "react";
import AddEmployee from "../components/AddEmployee";
import BankDetails from "../components/BankDetails";
import ProfessionalDetails from "../components/ProfessionalDetails";
import EducationDetails from "../components/EducationDetails";
import ExperienceDetails from "../components/ExperienceDetails";
import CurrentOrganizationDetails from "../components/CurrentOrganizationDetails";

export const stepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [activeState, setActiveState] = useState(0);
  const step = [
    { label: "Addemployee", content: <AddEmployee /> },
    { label: "BankDetails", content: <BankDetails /> },
    { label: "EducationDetails", content: <EducationDetails /> },
    { label: "ExperienceDetails", content: <ExperienceDetails /> },
    { label: "ProfessionalDetails", content: <ProfessionalDetails /> },
    {
      label: "CurrentOrganizationDetails",
      content: <CurrentOrganizationDetails />,
    },
  ];

  const navigateTo = (label) => {
    setActiveState(step.findIndex((step) => step.label === label));
  };
  return (
    <stepperContext.Provider value={{ navigateTo, activeState, step }}>
      {children}
    </stepperContext.Provider>
  );
};

export default function useStepper() {
  return useContext(stepperContext);
}
