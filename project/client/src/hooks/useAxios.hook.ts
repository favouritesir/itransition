/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface RequestOptions {
  body?: any;
  config?: AxiosRequestConfig;
}

const useAxios = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [path, setPath] = useState<string>("");
  const [opt, setOpt] = useState<RequestOptions>({});

  // setReq to set the URL and options
  const setReq = (url: string, options: RequestOptions = {}) => {
    setPath(url);
    setOpt(options);
    setLoading(true); // Set loading true when new request is set
  };

  useEffect(() => {
    if (!path) return; // If no path is set, do nothing

    const fetchData = async () => {
      setLoading(true); // Start loading before fetching data
      try {
        const { body, config } = opt; // Destructure body and config
        const response = body
          ? await axios.post(path, body, config) // POST request if body exists
          : await axios.get(path, config); // GET request if no body

        setData(response.data); // Set data from response
      } catch (err: any) {
        setError(err); // Handle errors
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchData(); // Fetch data only if path is set
  }, [path, opt]); // Now watching both path and options for changes

  return { data, loading, error, setReq };
};

export default useAxios;
