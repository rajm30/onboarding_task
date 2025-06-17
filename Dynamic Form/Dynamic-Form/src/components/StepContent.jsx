import useForRoutes from "../context/ForRoutes";

export function StepContent() {
  const { step, activeState } = useForRoutes();
  return <>{step[activeState]?.content}</>;
}
