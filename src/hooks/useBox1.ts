import { useBoxContext } from "./useBoxContext";

export const useBox1 = () => {
  const { countBox1, incrementBox1 } = useBoxContext();
  return { countBox1, incrementBox1 };
};
