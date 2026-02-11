import { createContext, useState, useCallback, type ReactNode } from "react";

export interface BoxContextState {
  countPage: number;
  countBox1: number;
  countBox2: number;
  incrementPage: () => void;
  incrementBox1: () => void;
  incrementBox2: () => void;
}

export const BoxContext = createContext<BoxContextState | null>(null);

export const BoxContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countPage, setCountPage] = useState(0);
  const [countBox1, setCountBox1] = useState(0);
  const [countBox2, setCountBox2] = useState(0);

  const incrementPage = useCallback(() => setCountPage((c) => c + 1), []);
  const incrementBox1 = useCallback(() => setCountBox1((c) => c + 1), []);
  const incrementBox2 = useCallback(() => setCountBox2((c) => c + 1), []);

  return (
    <BoxContext.Provider
      value={{
        countPage,
        countBox1,
        countBox2,
        incrementPage,
        incrementBox1,
        incrementBox2,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};
