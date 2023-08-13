import React, { useLayoutEffect, useState } from "react";

function useDocumentWidth() {
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    const width = window.document.documentElement.clientWidth;
    const handleWidthChange = () => {
      setDocumentWidth(width);
    };
    window.addEventListener("resize", handleWidthChange);
    return () => removeEventListener("resize", handleWidthChange);
  }, []);

  return { documentWidth };
}

export default useDocumentWidth;
