import { useNavigate } from "react-router-dom";
import useApp from "../hooks/useApp.store";
import { useEffect, useState } from "react";
import AppSkeletons from "../skeletons/App.skeletons";
// import Layout from "../components/application/Layout";
import useInitUserData from "../hooks/useInitUserData.hook";
import useUiLang from "../hooks/useUiLang.store";

/************************************************************************************************* HOME PAGE */
export default function HomePage() {
  const { appState } = useApp(); // get the user data and app state from the store
  const { loading: initDataLoading, reqErr } = useInitUserData();
  const navigate = useNavigate(); // to navigate other routes
  const { uiLan: _ } = useUiLang();

  /************************************************************************************************* PAGE STATE */
  const [loading, setLoading] = useState(true);

  /************************************************************************************************* USE EFFECT FOR INITIAL DATA LOADING */
  useEffect(() => {
    if (initDataLoading) return;
    // if loading false then check the app state user data
    if (!appState.fetch("user"))
      navigate("/auth"); // navigate to auth page if user data not found
    else setLoading(false);
  }, [initDataLoading]); // to watch that is user initial data loading or not (default true)

  /************************************************************************************************* USE EFFECT FOR ERROR */
  useEffect(() => {
    if (reqErr) alert("sorry cannot connect to the server: " + reqErr.message);
    else return;
  }, [reqErr]);

  return (
    <>
      {loading && <AppSkeletons />}

      {!loading && (
        //<Layout>
        <div className="flex justify-center flex-col items-center">
          <center>
            <h1 className="w-full text-8xl text-primary mb-16">
              {_("welcome to Home Page")}
            </h1>
          </center>
          <h1 className="text-xl">user info</h1>
          <div className="divider m-0 p-0"></div>
          <div>{JSON.stringify(appState.fetch("user"))}</div>
        </div>
        //</Layout>
      )}
    </>
  );
}
