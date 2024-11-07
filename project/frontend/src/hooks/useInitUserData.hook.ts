/*
 * Title: useInit Hooks
 * Description: this hook is designed to load the initial data & check the authentication
 * Author: Ashikur Rahman SA
 * Date: Sunday, 27 -October-2024 (06:38:52)
 *
 */

import { useEffect, useState } from "react";
import useApp from "./useApp.store";
import useAxios from "./useAxios.hook";

// Hook to handle initial data loading and user state update
const useInitUserData = () => {
  const { appState } = useApp(); // get current user from the store
  const { reqRes: initRes, setReq, reqErr } = useAxios(); // call the initial API to validate the user and load some data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (appState.fetch("initCall")) {
      setLoading(false);
      return;
    } else setReq("/api/auth"); // not fetching if already fetched previously

    if (!initRes) return;
    try {
      // console.log(appState.fetch("user"), "init hook feched data");
      appState.push("initCall", true); // set the initCall flag to true to prevent unnecessary API calls on refresh or page reload
      appState.push("user", initRes.data.user || ""); // if user present in response data then push it or push {}
      appState.push("uiData", initRes.data.uiData || ""); // if user present in response data then push it or push {}
      setLoading(false); // set loading to false when data is loaded successfully
    } catch (error) {
      console.log(error);
    }
  }, [initRes]); // now watching the reqRes object

  return { loading, initRes, reqErr }; // return the response & reqError if useAxios failed to fetch data
};

export default useInitUserData;
