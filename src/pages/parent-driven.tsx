import { useCallback, useState } from "react";
import useRenderCount from "../hooks/useRenderCount";
import BoxParentDriven from "../components/box-parent-driven";

const ParentDriven: React.FC = () => {
  const [countPage, setCountPage] = useState(0);
  const [countBox1, setCountBox1] = useState(0);
  const [countBox2, setCountBox2] = useState(0);
  const RenderCount = useRenderCount();

  const handleBox1Increment = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCountBox1((count) => count + 1);
  }, []);

  const handleBox2Increment = useCallback((e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e?.stopPropagation();
    setCountBox2((count) => count + 1);
  }, []);

  return (
    <>
      <h1>Parent Driven Components</h1>
      <div className="wrapper">
        <div className="box-main" onClick={() => setCountPage((count) => count + 1)}>
          <button onClick={handleBox2Increment} style={{ alignSelf: "flex-end" }}>
            Increase
          </button>
          <p>Page Render Count: {RenderCount}</p>
          <p>Page Click Count: {countPage}</p>
        </div>
        <BoxParentDriven increase={handleBox2Increment} count={countBox1} increaseSelf={handleBox1Increment} />
        <BoxParentDriven count={countBox2} increaseSelf={handleBox2Increment} />
      </div>
    </>
  );
};

export default ParentDriven;
