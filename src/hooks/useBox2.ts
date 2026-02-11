import { useBoxContext } from "./useBoxContext";

export const useBox2 = () => {
  const { countBox2, incrementBox2 } = useBoxContext();
  return { countBox2, incrementBox2 };
};
