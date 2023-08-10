import React, { useLayoutEffect, useRef, useState } from "react";

function useDebounceValue(inCommingValue: string | number, timeout: number) {
  const [debouncedValue, setDebouncedValue] = useState<string | number>();

  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useLayoutEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(inCommingValue);
    }, timeout || 300);
    return () => clearTimeout(timeoutRef.current);
  }, [inCommingValue]);

  return { debouncedValue };
}

export default useDebounceValue;
