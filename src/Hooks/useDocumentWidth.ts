import React, { useLayoutEffect, useState } from "react";

function useDocumentWidth() {
  const [documentWidth, setDocumentWidth] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setDocumentWidth(window.innerWidth);
    });
    return () =>
      removeEventListener("resize", () => {
        setDocumentWidth(window.innerWidth);
      });
  }, [window.innerWidth]);

  return { documentWidth };
}

export default useDocumentWidth;
