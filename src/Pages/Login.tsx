import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// assets
import background from "../assets/images/login-bg.webp";
import logoLogin from "../assets/images/logo-login.png";

// Icons
import { ImSpinner8 } from "react-icons/im";

// 3rd party libraries
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { SET_PAGE_TITLE, SET_USER_AUTH_STATE } from "../Redux/Slice/AppSlice";

// routes
import { routesList } from "../Router/RoutesList";
// redux rtk query
import { useLoginMutation } from "../services/shoperzApi.service";
import { useMutation } from "@tanstack/react-query";
import { accountLogin } from "../lib/apiMethods";
import { Login as loginType } from "../../types";

const Login = () => {
  const { data, isError, error, isLoading, isSuccess, mutate } = useMutation({
    mutationFn: (login: loginType) =>
      accountLogin({ email: login.email, password: login.password }),
    mutationKey: ["login"],
  });

  const timeoutRef = useRef(0);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const [isEmptyFields, setIsEmptyFields] = useState(true);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formdata = new FormData(ev.currentTarget);
    const email = formdata.get("email") as string,
      password = formdata.get("password") as string;
    if (email || password) {
      mutate({ email, password });
    }
  };

  const handleFormChanges = (ev: React.ChangeEvent<HTMLFormElement>) => {
    if (ev.target.reportValidity()) {
      setIsEmptyFields(false);
    } else {
      setIsEmptyFields(true);
    }
  };
  //

  useEffect(() => {
    if (isSuccess) {
      dispatch(SET_USER_AUTH_STATE(true));
      timeoutRef.current = +setTimeout(() => {
        navigator(routesList.app, { state: { isLoggedIn: true } });
      }, 1000);
    }
  }, [isSuccess]);

  useEffect(() => {
    const title: string = "Login";
    dispatch(SET_PAGE_TITLE({ title: title }));
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen w-full">
      <section
        style={{ backgroundImage: `url(${background})` }}
        className="flex items-center justify-between flex-col-reverse md:flex-row min-h-screen w-full bg-cover bg-no-repeat login-bg-overlay"
      >
        <form
          onSubmit={(ev: React.FormEvent<HTMLFormElement>) => handleSubmit(ev)}
          className="relative flex flex-col items-center justify-center z-10 w-11/12 sm:w-3/5 md:w-[40%] lg:w-[30%] h-[77vh] border shadow-lg p-3 bg-gray-100 dark:bg-zinc-800 dark:border-slate-500 sm:ml-14 sm:mr-4 rounded-md"
          onChange={handleFormChanges}
        >
          {/* {loginResponse.isError || loginResponse.isSuccess ? ( */}
          {isError || isSuccess ? (
            <div
              className={`absolute top-0 left-0 w-full bg-gray-200 rounded border-b text-sm capitalize text-center font-medium p-2 ${
                isError
                  ? "bg-red-200 !text-red-900 border-red-700"
                  : "bg-emerald-200 !text-emerald-900 border-emerald-700"
              }`}
            >
              {isError ? JSON.stringify(error) : data?.message}
            </div>
          ) : null}
          <div className="flex justify-center items-start gap-3 flex-col w-3/4 h-32">
            <h4 className="text-lg font-medium uppercase mb-2 dark:text-white">
              welcome back
            </h4>
            <span className="flex items-center justify-start gap-2 capitalize">
              <p className="dark:text-white">sign in : </p>
              <span className="flex justify-start items-center gap-1">
                <button
                  type="button"
                  className="flex items-center justify-center text-lg border-slate-500 w-8 h-7 rounded transition-colors  bg-[#3b5998] text-white bg-opacity-80"
                >
                  <i className="fi fi-brands-facebook leading-3"></i>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center text-lg border-slate-500 w-8 h-7 rounded transition-colors bg-[#555555] text-white bg-opacity-80"
                >
                  <i className="fi fi-brands-apple leading-3"></i>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center text-lg border-slate-500 w-8 h-7 rounded transition-colors bg-[#EA4335] text-white bg-opacity-80"
                >
                  <i className="fi fi-brands-google leading-3"></i>
                </button>
              </span>
            </span>
          </div>
          <span className="login-input-wrapper w-3/4">
            <label
              className="form-label"
              htmlFor="email"
              aria-required={"true"}
            >
              e-mail
            </label>
            <input
              className="form-input"
              type="email"
              name="email"
              id="email"
              placeholder="email address .."
              required={true}
              disabled={isLoading}
              readOnly={isLoading}
            />
          </span>
          <span className="login-input-wrapper w-3/4">
            <span className="flex justify-between items-center w-full">
              <label className="form-label" htmlFor="password">
                password
              </label>
              <span className="flex items-center justify-end gap-2 w-1/2">
                <Link
                  className="text-violet-800 font-medium dark:text-violet-300 text-xs capitalize underline"
                  to={routesList?.resetPassword || "#"}
                >
                  forget password
                </Link>
              </span>
            </span>
            <input
              className="form-input"
              type="password"
              name="password"
              id="password"
              placeholder="password .."
              required={true}
              disabled={isLoading}
              readOnly={isLoading}
            />
          </span>
          <span className="flex items-center justify-start gap-2 w-3/4">
            <input
              className=" w-3 h-3 rounded"
              type="checkbox"
              name="remember-me"
              id="remember-me"
            />
            <label
              className="text-violet-700 dark:text-violet-300 font-medium text-sm capitalize"
              htmlFor="remember-me"
            >
              remember me
            </label>
          </span>
          <div className="mb-1 mt-2 w-3/4">
            <button
              ref={submitBtnRef}
              className="login-btn"
              type="submit"
              disabled={isLoading || isEmptyFields}
            >
              {isLoading ? (
                <ImSpinner8 className="inline-block text-2xl animate-spin" />
              ) : (
                "login"
              )}
            </button>
          </div>
          <span className="relative bg-gray-400 h-[1px] my-3 w-3/5">
            <small className="absolute top-1/2 grid place-content-center px-[5px] py-[1px] rounded-full left-1/2 border -translate-x-1/2 -translate-y-1/2 bg-gray-100 dark:bg-zinc-600 dark:border-slate-500 dark:text-white text-indigo-700">
              or
            </small>
          </span>
          <span className="flex items-center justify-center w-3/4">
            <small className="font-medium capitalize text-slate-500 dark:text-slate-300">
              create a new account ?
            </small>
            <Link
              className="text-violet-600 dark:text-violet-400 font-medium text-sm uppercase px-4"
              to={routesList?.signUp || "#"}
            >
              sign up
            </Link>
          </span>
        </form>
        <article className="flex items-center justify-center z-10 w-full sm:w-2/5 md:w-1/2 lg:w-2/3 h-[20vh] lg:h-[77vh]">
          <figure className="w-48 lg:w-64 aspect-square">
            <img
              src={logoLogin}
              alt="logo"
              className="max-w-full object-cover object-center"
            />
          </figure>
        </article>
      </section>
    </main>
  );
};

export default Login;
