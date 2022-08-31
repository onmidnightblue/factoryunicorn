import React, { useCallback, useState } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const baseURL =
        "https://asia-northeast3-fu-webapp.cloudfunctions.net/api/codingTest/";
      const accessKey = "kimsoojin";

      if (requestConfig.method === "GET") {
        const params = requestConfig.params;
        const response = await axios({
          url: baseURL + requestConfig.url,
          method: requestConfig.method,
          params: requestConfig.params
            ? { ...params, accessKey }
            : { accessKey },
        });
        const data = await response.data;
        applyData(data);
      }
      if (requestConfig.method === "POST") {
        const requestConfigData = requestConfig.data;
        const response = await axios({
          url: baseURL + requestConfig.url,
          method: requestConfig.method,
          data: requestConfig.data
            ? { accessKey, ...requestConfigData }
            : { accessKey },
        });
        const data = await response.data;
        applyData(data);
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
