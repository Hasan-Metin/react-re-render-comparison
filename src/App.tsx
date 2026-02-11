import "./App.css";
import SelfDriven from "./pages/self-driven";
import ParentDriven from "./pages/parent-driven";
import ContextDriven from "./pages/context-driven";
import Overview from "./pages/Overview";
import CodeView from "./pages/CodeView";
import { useState, useEffect, type JSX } from "react";

// Helper to get hash route (e.g., "/#/self-driven" -> "/self-driven")
const getHashRoute = () => window.location.hash.slice(1) || "/";

function App() {
  const [route, setRoute] = useState(getHashRoute());

  const navigate = (path: string) => {
    window.location.hash = path;
    setRoute(path);
  };

  useEffect(() => {
    const handleHashChange = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  let Component: JSX.Element;
  switch (route) {
    case "/":
      Component = <Overview onNavigate={navigate} />;
      break;
    case "/self-driven":
      Component = <SelfDriven />;
      break;
    case "/self-driven/code":
      Component = <CodeView pattern="self-driven" onNavigate={navigate} />;
      break;
    case "/parent-driven":
      Component = <ParentDriven />;
      break;
    case "/parent-driven/code":
      Component = <CodeView pattern="parent-driven" onNavigate={navigate} />;
      break;
    case "/context-driven":
      Component = <ContextDriven />;
      break;
    case "/context-driven/code":
      Component = <CodeView pattern="context-driven" onNavigate={navigate} />;
      break;
    default:
      navigate("/");
      return null;
  }

  return Component;
}

export default App;
