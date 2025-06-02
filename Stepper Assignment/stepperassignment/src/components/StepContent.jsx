import useStepper from "../context/Stepper";

export function StepContent() {
  const { step, activeState } = useStepper();
  return <>{step[activeState]?.content}</>;
}
