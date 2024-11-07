/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface RequestOptions {
  body?: any;
  config?: AxiosRequestConfig;
}
axios.defaults.withCredentials = true;

const useAxios = (url: string = "", obj?: RequestOptions) => {
  const [reqRes, setReqRes] = useState<any>(null);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [newReq, setNewReq] = useState<boolean>(false);
  const [path, setPath] = useState<string>(url);
  const [opt, setOpt] = useState<RequestOptions>(obj || {});

  const [reqErr, setReqErr] = useState<any>(null);

  /************************************************************************************************* SET NEW REQ FUNCTION */
  const setReq = (newUrl?: string, options: RequestOptions = {}) => {
    setRequesting(true); // Set loading true when new request is set
    setReqRes(null); // Set request response when new request is
    setPath((path) => newUrl || path); //finally set request path to update the useEffect dependency
    setOpt(options);
    setNewReq(true); // to make a new req
  };

  /************************************************************************************************* FETCH DATA EFFECT */
  useEffect(() => {
    if (!path && !newReq) return; // If no path is set, do nothing
    const fetchData = async () => {
      setRequesting(true); // Start loading before fetching data
      try {
        const { body, config } = opt; // Destructure body and config

        // default headers for each request
        const headers = {
          Authorization: `${import.meta.env.VITE_SERVER_API_KEY}`,
          "Content-Type": "application/json",
          ...(config?.headers || {}), // Merge with existing headers, if any
        };

        // Make the actual request to the server with the constructed headers and options
        const response = body
          ? await axios.post(import.meta.env.VITE_SERVER + path, body, {
              ...config,
              headers,
            }) // POST request if body exists
          : await axios.get(import.meta.env.VITE_SERVER + path, {
              ...config,
              headers,
            }); // GET request if no body

        setReqRes(response.data); // Set data from response
      } catch (err: any) {
        setReqErr(err);
        setReqRes(err.response.data || {});
      } finally {
        setRequesting(false); // Stop loading after fetching
        setNewReq(false); // Reset newReq after fetching
      }
    };

    fetchData(); // Fetch data only if path is set
  }, [newReq]); // Now watching both path and options for changes

  return { reqErr, reqRes, requesting, setReq };
};

export default useAxios;
