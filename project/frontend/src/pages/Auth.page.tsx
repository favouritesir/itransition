// import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import FormInput from "../components/auth/FormInput";
import useAxios from "../hooks/useAxios.hook";
import ThemeController from "../components/utils/ThemeController";

const AuthPage = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [form, setForm] = useState({
    name: "",
    identifier: "",
    password: "",
  });
  const { res, loading } = useAxios();
  const [alert, setAlert] = useState(false);

  // handleAuth function: TypeScript friendly type
  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
    // setReq("/api/auth/login", { body: form });
  };

  useEffect(() => {
    if (res) console.log(res);
  }, [res]);

  // onChangeHandler function: Use ChangeEvent for correct typing
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded-lg shadow-md">
        <ThemeController className="m-2 w-5 h-5 fixed right-4 top-4"></ThemeController>
        {/* Name Input */}
        {!loginMode && (
          <FormInput
            type="text"
            label="Full Name"
            placeholder="Enter full name here..."
            value={form.name}
            name="name"
            onChange={onChangeHandler}
          />
        )}

        {/* Email Input */}
        <FormInput
          type="text"
          label={loginMode ? "Identifier" : "Email"}
          placeholder={`Enter ${
            loginMode ? "email or username" : "email"
          } here ...`}
          value={form.identifier}
          name="identifier"
          onChange={onChangeHandler}
        />

        {/* Password Input */}
        <FormInput
          type="password"
          label="Password"
          placeholder="Enter your password here ..."
          value={form.password}
          name="password"
          onChange={onChangeHandler}
        />

        {loginMode && (
          <label className="label">
            <a
              href="#"
              className="label-text-alt link link-hover text-secondary"
            >
              Forgot password?
            </a>
          </label>
        )}

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            className="btn btn-primary text-accent-content w-full"
            onClick={handleAuth}
            disabled={loading} // Disable button while loading
          >
            {!loading && (loginMode ? "Login" : "Register")}
            {loading && (
              <span className="loading loading-dots loading-md"></span>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Signup link */}
        <p
          className="text-center text-sm"
          onClick={() => setLoginMode(!loginMode)}
        >
          {loginMode ? "Don't" : "Already"} have an account?{" "}
          <a href="#" className="link link-primary">
            {loginMode ? "Register" : "Sign in"} here
          </a>
        </p>
      </div>
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
            Sorry login functionality is close now to develop other part{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
