import { useCallback, useState, useImperativeHandle, memo, type Ref } from "react";
import useRenderCount from "../hooks/useRenderCount";

export interface BoxSelfDrivenRef {
  triggerIncrement: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
}

export interface BoxSelfDrivenProps {
  ref?: Ref<BoxSelfDrivenRef>;
  increase?: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
}

const BoxSelfDriven: React.FC<BoxSelfDrivenProps> = ({ increase, ref }) => {
  const [count, setCount] = useState(0);
  const RenderCount = useRenderCount();

  const increaseSelf = useCallback((e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    e?.stopPropagation();
    setCount((count) => count + 1);
  }, []);

  useImperativeHandle(ref, () => ({
    triggerIncrement: increaseSelf,
  }));

  return (
    <div className="box" onClick={increaseSelf}>
      {increase ? (
        <button style={{ alignSelf: "flex-end" }} onClick={increase}>
          Increase
        </button>
      ) : (
        <></>
      )}
      <p>Render Count: {RenderCount}</p>
      <p>Click Count: {count}</p>
    </div>
  );
};

export default memo(BoxSelfDriven);
