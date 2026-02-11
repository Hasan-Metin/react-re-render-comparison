interface CodeViewProps {
  pattern: "self-driven" | "parent-driven" | "context-driven";
  onNavigate: (path: string) => void;
}

interface CodeSection {
  title: string;
  fileName: string;
  code: string;
}

const selfDrivenCode: CodeSection[] = [
  {
    title: "Page Component",
    fileName: "pages/self-driven.tsx",
    code: `import { useCallback, useRef, useState } from "react";
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

export default SelfDriven;`,
  },
  {
    title: "Box Component",
    fileName: "components/box-self-driven.tsx",
    code: `import { useCallback, useState, useImperativeHandle, forwardRef, memo } from "react";
import useRenderCount from "../hooks/useRenderCount";

export interface BoxSelfDrivenRef {
  triggerIncrement: () => void;
}

export interface BoxSelfDrivenProps {
  increase?: () => void;
}

const BoxSelfDriven = forwardRef<BoxSelfDrivenRef, BoxSelfDrivenProps>(({ increase }, ref) => {
  const [count, setCount] = useState(0);  // Each box owns its own state
  const RenderCount = useRenderCount();

  const increaseSelf = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  // Expose increment method to parent via ref
  useImperativeHandle(ref, () => ({
    triggerIncrement: increaseSelf,
  }));

  return (
    <div className="box" onClick={increaseSelf}>
      {increase && <button onClick={increase}>Increase</button>}
      <p>Render Count: {RenderCount}</p>
      <p>Click Count: {count}</p>
    </div>
  );
});

export default memo(BoxSelfDriven);  // memo works perfectly - no props change`,
  },
];

const parentDrivenCode: CodeSection[] = [
  {
    title: "Page Component",
    fileName: "pages/parent-driven.tsx",
    code: `import { useCallback, useState } from "react";
import useRenderCount from "../hooks/useRenderCount";
import BoxParentDriven from "../components/box-parent-driven";

const ParentDriven: React.FC = () => {
  // Parent owns ALL state
  const [countPage, setCountPage] = useState(0);
  const [countBox1, setCountBox1] = useState(0);
  const [countBox2, setCountBox2] = useState(0);
  const RenderCount = useRenderCount();

  // useCallback ensures stable function references for memo() to work
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
        {/* State and callbacks passed as props */}
        <BoxParentDriven increase={handleBox2Increment} count={countBox1} increaseSelf={handleBox1Increment} />
        <BoxParentDriven count={countBox2} increaseSelf={handleBox2Increment} />
      </div>
    </>
  );
};

export default ParentDriven;`,
  },
  {
    title: "Box Component",
    fileName: "components/box-parent-driven.tsx",
    code: `import { memo } from "react";
import useRenderCount from "../hooks/useRenderCount";

export interface BoxParentDrivenProps {
  increase?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  increaseSelf: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  count: number;  // State received from parent as prop
}

const BoxParentDriven: React.FC<BoxParentDrivenProps> = ({ increase, increaseSelf, count }) => {
  const RenderCount = useRenderCount();

  return (
    <div className="box" onClick={increaseSelf}>
      {increase && <button onClick={increase}>Increase</button>}
      <p>Render Count: {RenderCount}</p>
      <p>Click Count: {count}</p>
    </div>
  );
};

// memo() prevents re-render when props unchanged
// Requires useCallback in parent for callback props
export default memo(BoxParentDriven);`,
  },
];

const contextDrivenCode: CodeSection[] = [
  {
    title: "Context Provider",
    fileName: "context/BoxContext.tsx",
    code: `import { createContext, useState, useCallback, type ReactNode } from "react";

export interface BoxContextState {
  countPage: number;
  countBox1: number;
  countBox2: number;
  incrementPage: () => void;
  incrementBox1: () => void;
  incrementBox2: () => void;
}

export const BoxContext = createContext<BoxContextState | null>(null);

// Single context holds ALL state - any change triggers all consumers to re-render
export const BoxContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countPage, setCountPage] = useState(0);
  const [countBox1, setCountBox1] = useState(0);
  const [countBox2, setCountBox2] = useState(0);

  const incrementPage = useCallback(() => setCountPage((c) => c + 1), []);
  const incrementBox1 = useCallback(() => setCountBox1((c) => c + 1), []);
  const incrementBox2 = useCallback(() => setCountBox2((c) => c + 1), []);

  return (
    <BoxContext.Provider value={{ countPage, countBox1, countBox2, incrementPage, incrementBox1, incrementBox2 }}>
      {children}
    </BoxContext.Provider>
  );
};`,
  },
  {
    title: "Page Component",
    fileName: "pages/context-driven.tsx",
    code: `import useRenderCount from "../hooks/useRenderCount";
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
          <button onClick={(e) => { e.stopPropagation(); incrementBox2(); }} style={{ alignSelf: "flex-end" }}>
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

const ContextDriven: React.FC = () => (
  <BoxContextProvider>
    <ContextDrivenContent />
  </BoxContextProvider>
);

export default ContextDriven;`,
  },
  {
    title: "Box Component 1",
    fileName: "components/box-context-driven-1.tsx",
    code: `import { memo } from "react";
import useRenderCount from "../hooks/useRenderCount";
import { useBox1 } from "../hooks/useBox1";
import { useBox2 } from "../hooks/useBox2";

const BoxContextDriven1: React.FC = () => {
  const renderCount = useRenderCount();
  const { countBox1, incrementBox1 } = useBox1();  // Gets state from context
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

// memo() doesn't help! Context changes bypass memo optimization
export default memo(BoxContextDriven1);`,
  },
  {
    title: "Box Component 2",
    fileName: "components/box-context-driven-2.tsx",
    code: `import { memo } from "react";
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

// memo() doesn't help with context consumers
export default memo(BoxContextDriven2);`,
  },
];

const patternData: Record<string, { title: string; code: CodeSection[]; demoPath: string; whenRenders: string[]; componentStructure: string }> = {
  "self-driven": {
    title: "Self-Driven Components",
    code: selfDrivenCode,
    demoPath: "/self-driven",
    whenRenders: [
      "Page: Only when page's own count changes",
      "Box1: Only when Box1's internal count changes",
      "Box2: Only when Box2's internal count changes",
      "Cross-trigger via ref: Only target box re-renders",
    ],
    componentStructure: `SelfDriven (Page)
├── useState(count) ─── page count only
├── box-main ─────────── displays page count
├── BoxSelfDriven ────── own useState(count)
│   └── useImperativeHandle ── exposes triggerIncrement
└── BoxSelfDriven (ref) ── own useState(count)
    └── controlled via ref.triggerIncrement()`,
  },
  "parent-driven": {
    title: "Parent-Driven Components",
    code: parentDrivenCode,
    demoPath: "/parent-driven",
    whenRenders: [
      "Page: Re-renders on ANY state change (countPage, countBox1, or countBox2)",
      "Box1: Only when countBox1 changes (memo + useCallback)",
      "Box2: Only when countBox2 changes (memo + useCallback)",
      "Without useCallback: ALL children re-render every time",
    ],
    componentStructure: `ParentDriven (Page)
├── useState(countPage)
├── useState(countBox1)
├── useState(countBox2)
├── handleBox1Increment ← useCallback
├── handleBox2Increment ← useCallback
├── box-main ─────────── displays countPage
├── BoxParentDriven (memo)
│   └── props: count, increaseSelf, increase
└── BoxParentDriven (memo)
    └── props: count, increaseSelf`,
  },
  "context-driven": {
    title: "Context-Driven Components",
    code: contextDrivenCode,
    demoPath: "/context-driven",
    whenRenders: [
      "Page Content: Re-renders on ANY context value change",
      "Box1: Re-renders on ANY context value change (not just countBox1)",
      "Box2: Re-renders on ANY context value change (not just countBox2)",
      "All consumers re-render together - no isolation",
    ],
    componentStructure: `ContextDriven (Page)
└── BoxContextProvider ─── owns all state
    ├── countPage, countBox1, countBox2
    ├── incrementPage, incrementBox1, incrementBox2
    └── ContextDrivenContent (re-renders on any change)
        ├── usePageCount() ─── still re-renders on box changes
        ├── BoxContextDriven1 (re-renders on any change)
        │   └── useBox1(), useBox2()
        └── BoxContextDriven2 (re-renders on any change)
            └── useBox2()`,
  },
};

const CodeView: React.FC<CodeViewProps> = ({ pattern, onNavigate }) => {
  const data = patternData[pattern];

  if (!data) {
    return <div>Pattern not found</div>;
  }

  return (
    <div className="code-view">
      <header className="code-view-header">
        <button className="back-btn" onClick={() => onNavigate("/")}>
          ← Back to Overview
        </button>
        <h1>{data.title} - Code</h1>
      </header>

      <div className="code-view-content">
        <div className="code-info-section">
          <div className="info-card">
            <h3>⚡ When Components Re-render</h3>
            <ul className="render-list">
              {data.whenRenders.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>🏗️ Component Structure</h3>
            <pre className="structure">{data.componentStructure}</pre>
          </div>
        </div>

        <div className="code-sections">
          {data.code.map((section, index) => (
            <div key={index} className="code-section-card">
              <div className="code-section-header">
                <h2>{section.title}</h2>
                <span className="file-name">{section.fileName}</span>
              </div>
              <pre className="code-snippet">{section.code}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeView;
