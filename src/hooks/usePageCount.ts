import { useBoxContext } from "./useBoxContext";

export const usePageCount = () => {
  const { countPage, incrementPage } = useBoxContext();
  return { countPage, incrementPage };
};
