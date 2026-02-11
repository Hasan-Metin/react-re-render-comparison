import { useCallback, useRef, useState } from "react";
import useRenderCount from "../hooks/useRenderCount";
import BoxSelfDriven, { type BoxSelfDrivenRef } from "../components/box-self-driven";

const SelfDriven: React.FC = () => {
  const [count, setCount] = useState(0);
  const RenderCount = useRenderCount();
  const boxRef = useRef<BoxSelfDrivenRef>(null);

  const handleTriggerIncrement = useCallback((e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e?.stopPropagation();
    if (boxRef.current) boxRef.current.triggerIncrement();
  }, []);

  return (
    <>
    <h1>Self Driven Components</h1>
      <div className="wrapper">
        <div className="box-main" onClick={() => setCount((count) => count + 1)}>
          <button onClick={handleTriggerIncrement} style={{ alignSelf: "flex-end" }}>
            Increase
          </button>
          <p>Page Render Count: {RenderCount}</p>
          <p>Page Click Count: {count}</p>
        </div>
        <BoxSelfDriven increase={handleTriggerIncrement} />
        <BoxSelfDriven ref={boxRef} />
      </div>
    </>
  );
};

export default SelfDriven;
