import axios from "axios";
import React, { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const baseURL = "https://codingtest-a3770-default-rtdb.firebaseio.com/";
      const response = await fetch(baseURL + requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  // const sendRequest = useCallback(async (requestConfig, applyData) => {
  //   setIsLoading(true);
  //   try {
  //     const baseURL = "https://codingtest-a3770-default-rtdb.firebaseio.com/";
  //     const response = await axios({
  //       method: requestConfig.method,
  //       url: baseURL + requestConfig.url,
  //       body: requestConfig.body,
  //     });
  //     const data = await response.data;
  //     applyData(data);
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.message || "Request failed");
  //   }
  // });

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
