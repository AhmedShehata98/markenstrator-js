import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";

function App() {
  const showSidebarRef: React.MutableRefObject<null> = useRef(null);

  return (
    <>
      <Navbar showSidebarRef={showSidebarRef} />
      <Home showSidebarRef={showSidebarRef} />
    </>
  );
}

export default App;
