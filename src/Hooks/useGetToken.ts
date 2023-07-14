import React, { useEffect, useState } from "react";

function useGetToken() {
  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    const origin = window.location.origin;
    const cookies = window.document.cookie
      .split(`${origin}=`)
      .find((cookie) => cookie.includes("ey"));
    const token = cookies;
    if (token) {
      setToken(token);
    } else {
      setToken(undefined);
    }
  }, []);

  return { token };
}

export default useGetToken;
