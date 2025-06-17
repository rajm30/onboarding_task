import { useContext, createContext, useState, useEffect } from "react";
import AddForm from "../components/AddForm";
import Home from "../components/Home";
import AddQuesion from "../components/AddQuesion";
import Preview from "../components/Preview";

export const forRoutesContext = createContext();

export const ForRoutesProvider = ({ children }) => {
  const [activeState, setActiveState] = useState(0);
  const step = [
    { label: "AddForm", content: <AddForm /> },
    { label: "Home", content: <Home /> },
    { label: "AddQuesion", content: <AddQuesion /> },
    { label: "Preview", content: <Preview /> },
  ];

  const navigateTo = (label) => {
    setActiveState(step.findIndex((step) => step.label === label));
  };
  return (
    <forRoutesContext.Provider value={{ navigateTo, activeState, step }}>
      {children}
    </forRoutesContext.Provider>
  );
};

export default function useForRoutes() {
  return useContext(forRoutesContext);
}
