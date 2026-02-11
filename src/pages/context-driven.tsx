import useRenderCount from "../hooks/useRenderCount";
import { usePageCount } from "../hooks/usePageCount";
import { useBox2 } from "../hooks/useBox2";
import BoxContextDriven1 from "../components/box-context-driven-1";
import BoxContextDriven2 from "../components/box-context-driven-2";
import { BoxContextProvider } from "../context/BoxContext";

const ContextDrivenContent: React.FC = () => {
  const renderCount = useRenderCount();
  const { countPage, incrementPage } = usePageCount();
  const { incrementBox2 } = useBox2();

  return (
    <>
      <h1>Context Driven Components</h1>
      <div className="wrapper">
        <div className="box-main" onClick={incrementPage}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              incrementBox2();
            }}
            style={{ alignSelf: "flex-end" }}
          >
            Increase
          </button>
          <p>Page Render Count: {renderCount}</p>
          <p>Page Click Count: {countPage}</p>
        </div>
        <BoxContextDriven1 />
        <BoxContextDriven2 />
      </div>
    </>
  );
};

const ContextDriven: React.FC = () => {
  return (
    <BoxContextProvider>
      <ContextDrivenContent />
    </BoxContextProvider>
  );
};

export default ContextDriven;
