import { memo } from "react";
import useRenderCount from "../hooks/useRenderCount";
import { useBox2 } from "../hooks/useBox2";

const BoxContextDriven2: React.FC = () => {
  const renderCount = useRenderCount();
  const { countBox2, incrementBox2 } = useBox2();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    incrementBox2();
  };

  return (
    <div className="box" onClick={handleClick}>
      <p>Render Count: {renderCount}</p>
      <p>Click Count: {countBox2}</p>
    </div>
  );
};

export default memo(BoxContextDriven2);
