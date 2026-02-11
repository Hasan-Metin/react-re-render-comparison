import { memo } from "react";
import useRenderCount from "../hooks/useRenderCount";
import { useBox1 } from "../hooks/useBox1";
import { useBox2 } from "../hooks/useBox2";

const BoxContextDriven1: React.FC = () => {
  const renderCount = useRenderCount();
  const { countBox1, incrementBox1 } = useBox1();
  const { incrementBox2 } = useBox2();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    incrementBox1();
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    incrementBox2();
  };

  return (
    <div className="box" onClick={handleClick}>
      <button style={{ alignSelf: "flex-end" }} onClick={handleButtonClick}>
        Increase
      </button>
      <p>Render Count: {renderCount}</p>
      <p>Click Count: {countBox1}</p>
    </div>
  );
};

export default memo(BoxContextDriven1);
