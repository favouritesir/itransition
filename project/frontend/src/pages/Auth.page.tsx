/* eslint-disable no-useless-escape */

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import FormInput from "../components/auth/FormInput";
import useAxios from "../hooks/useAxios.hook";
import ThemeController from "../components/utils/ThemeController";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import useApp from "../hooks/useApp.store";
import { useNavigate } from "react-router-dom";
import useInitUserData from "../hooks/useInitUserData.hook";
import PageLoader from "../components/utils/PageLoader";
import useUiLang from "../hooks/useUiLang.store";

/************************************************************************************************* AUTH PAGE */
const AuthPage = () => {
  // HOOKS OR OTHER DEPENDENCIES
  const navigate = useNavigate();
  const { reqRes: res, requesting, setReq } = useAxios();
  const { appState } = useApp(); // get the user data and app state from the store
  const { loading } = useInitUserData(); // get the user data and app state from the
  const { uiLan: _ } = useUiLang();

  /************************************************************************************************* AUTH PAGE STATES */
  const [loginMode, setLoginMode] = useState(true);
  const [alert, setAlert] = useState(false);
  const [form, setForm] = useState({
    name: "",
    identifier: "",
    password: "",
  });

  /*************************************************************************************************** PASSWORD VALIDATION STATE */
  const [nmErr, setNmErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  /*************************************************************************************************** EFFECTS FOR APP STATE RETURN IF USER FOUND */
  useEffect(() => {
    if (appState.fetch("user")) navigate("/documents");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  /*************************************************************************************************** EFFECTS FOR LOGIN MODE */
  useEffect(() => {
    if (loginMode) setNmErr(false);
  }, [loginMode]);

  useEffect(() => {
    if (!res) return;
  }, [res]);

  /*************************************************************************************************** ON CHANGE HANDLER FOR FORM INPUT */
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  /*************************************************************************************************** HANDLE AUTH FUNCTION */
  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 3000);

    if (!form.name && !loginMode) setNmErr(true);
    if (!form.identifier) setMailErr(true);
    if (!form.password) setPassErr(true);
    if (nmErr || mailErr || passErr) return;

    setReq("/api/auth/login", { body: form });
  };

  /************************************************************************************************* RETURN THE PAGE */
  return (
    <>
      {loading && <PageLoader />}
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-lg shadow-md bg-opacity-50">
          {/* APPEARANCE MODE BUTTON ************************************************************************************** APPEARANCE MODE BUTTON */}
          <ThemeController className=" opacity-60 m-2 w-16 h-16 fixed right-6 top-0"></ThemeController>

          {/* APP LOGO ************************************************************************************** APP LOGO */}
          <div className="w-full flex gap-3 pb-8 opacity-90">
            <ClipboardDocumentCheckIcon className="text-primary w-9 h-9 " />
            <h2 className="text-3xl font-semibold text-primary text-center">
              SUPER Fill
            </h2>
          </div>

          {/* NAME INPUT ************************************************************************************** NAME INPUT */}
          {!loginMode && (
            <FormInput
              type="text"
              label={_("Full Name")}
              placeholder={_("Enter full name here...")}
              value={form.name}
              name="name"
              onChange={onChangeHandler}
              className="opacity-80"
              setErr={setNmErr}
              err={nmErr}
              rules={/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/g}
              errMsg={_("Use a valid Name ")}
            />
          )}

          {/* EMAIL INPUT ************************************************************************************** EMAIL INPUT */}
          <FormInput
            type="text"
            label={loginMode ? _("Identifier") : _("Email")}
            placeholder={` ${
              loginMode
                ? _("Enter email or username here ...")
                : _("Enter email here ...")
            } `}
            value={form.identifier}
            name="identifier"
            onChange={onChangeHandler}
            className="opacity-80"
            setErr={setMailErr}
            err={mailErr}
            rules={
              loginMode
                ? /^(?:(?=[a-zA-Z0-9._]{3,20}$)[a-zA-Z0-9._]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
                : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            }
            errMsg={_(
              "Use a valid Email or user name where username should be 3-20 char"
            )}
          />

          {/* PASSWORD INPUT ************************************************************************************** PASSWORD INPUT */}
          <FormInput
            type="password"
            label={_("Password")}
            placeholder={_("Enter your password here ...")}
            value={form.password}
            name="password"
            onChange={onChangeHandler}
            className="opacity-80"
            setErr={setPassErr}
            err={passErr}
            rules={/(.+){8,}/}
            errMsg={_("Password must be at least 8 characters long")}
          />

          {/* FORGET PASSWORD OPT ************************************************************************************** FORGET PASSWORD OPT */}
          {loginMode && (
            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover text-secondary opacity-80"
              >
                {_("Forgot password ?")}
              </a>
            </label>
          )}

          {/* SUBMIT BUTTON **************************************************************************************  SUBMIT BUTTON  */}
          <div className="form-control mt-6 bg-opacity-80">
            <button
              className={`btn btn-primary text-accent-content w-full ${
                (nmErr || mailErr || passErr) && "cursor-not-allowed opacity-60"
              } `}
              onClick={handleAuth}
              disabled={requesting} // Disable button while requesting
            >
              {!requesting && (loginMode ? _("Login") : _("Register"))}
              {requesting && (
                <span className="loading loading-dots loading-md"></span>
              )}
            </button>
          </div>

          {/* DIVIDER ************************************************************************************** DIVIDER */}
          <div className="divider opacity-60">OR</div>

          {/* LINK TO REGISTER OR LOGIN ************************************************************************************** LINK TO REGISTER OR LOGIN */}
          <p
            className={`text-center text-sm opacity-60 `}
            onClick={() => setLoginMode(!loginMode)}
          >
            {loginMode
              ? _("Don't have an account?")
              : _("Already have an account ?")}{" "}
            <a href="#" className="link link-primary">
              {loginMode ? _("Register here.") : _("Sign in here.")}
            </a>
          </p>
        </div>

        {/* ALERT MESSAGE ************************************************************************************** ALERT MESSAGE */}
        {alert && (
          <div role="alert" className="alert alert-info fixed top-5 w-72 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              {_(
                "Sorry login functionality is close now to develop other part"
              )}
            </span>
          </div>
        )}
        {/* ALERT MESSAGE END ************************************************************************************** ALERT MESSAGE END */}
      </div>
    </>
  );
};

export default AuthPage;
