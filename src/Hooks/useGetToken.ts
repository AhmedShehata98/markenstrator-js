import React, { useEffect, useState } from "react";

function useGetToken() {
  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    const origin = window.location.origin;
    const cookies = window.document.cookie
      .split(`; `)
      .find((cookie) => cookie.startsWith(origin));
    const token = cookies?.split("=")[1];
    if (token) {
      setToken(token);
    } else {
      setToken(undefined);
    }
  }, []);

  return { token };
}

export default useGetToken;
