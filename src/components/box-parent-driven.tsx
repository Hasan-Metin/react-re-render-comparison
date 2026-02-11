import { memo } from "react";
import useRenderCount from "../hooks/useRenderCount";

export interface BoxParentDrivenProps {
  increase?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  increaseSelf: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  count: number;
}

const BoxParentDriven: React.FC<BoxParentDrivenProps> = ({ increase, increaseSelf, count }) => {
  const RenderCount = useRenderCount();

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

export default memo(BoxParentDriven);
