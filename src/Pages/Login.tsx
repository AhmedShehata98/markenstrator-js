import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// assets
import background from "../assets/images/login-bg.webp";
import logoLogin from "../assets/images/logo-login.png";

// 3rd party libraries
import { Link, redirect, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { SET_PAGE_TITLE } from "../Redux/Slice/AppSlice";

// redux actions
import {
  LOGIN_ACCOUNT_ACTION,
  BACK_INITIAL_STATE,
} from "../Redux/Slice/UserSlice";
import { routesList } from "../Router/RoutesList";

const Login = () => {
  const {
    pending,
    isLoggedIn,
    isError,
    errorMessage,
    isSuccess,
    successMessage,
  } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    const name: string = ev.target.name;
    const value: string = ev.target.value;
    //
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };
  //
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    dispatch(
      LOGIN_ACCOUNT_ACTION({
        email: formdata.email,
        password: formdata.password,
      })
    );
  };

  const handleSubmitBtnBackground = (
    buttonRef: React.MutableRefObject<HTMLButtonElement | null>,
    state: "add" | "remove",
    isError: boolean | "idle",
    isSuccess: boolean | "idle"
  ) => {
    if (state === "remove") {
      submitBtnRef.current?.classList.remove(
        ...["bg-emerald-500", "text-black"]
      );
      submitBtnRef.current?.lastElementChild?.classList.remove(
        ...["text-black"]
      );
      submitBtnRef.current?.classList.remove(...["bg-red-500", "text-white"]);
      submitBtnRef.current?.lastElementChild?.classList.remove(
        ...["text-white"]
      );
    }
    if (state === "add") {
      if (isError === true) {
        if (submitBtnRef.current?.classList.contains("bg-emerald-500")) {
          submitBtnRef.current?.classList.replace(
            "bg-emerald-500",
            "bg-red-500"
          );
          submitBtnRef.current?.classList.replace("text-white", "text-black");
          submitBtnRef.current?.lastElementChild?.classList.replace(
            "text-black",
            "text-white"
          );
        } else {
          submitBtnRef.current?.classList.add(...["bg-red-500", "text-white"]);
          submitBtnRef.current?.lastElementChild?.classList.add(
            ...["text-white"]
          );
        }
      } else if (isSuccess === true) {
        if (submitBtnRef.current?.classList.contains("bg-red-500")) {
          submitBtnRef.current?.classList.replace(
            "bg-red-500",
            "bg-emerald-500"
          );
          submitBtnRef.current?.classList.replace("text-black", "text-white");
          submitBtnRef.current?.lastElementChild?.classList.replace(
            "text-white",
            "text-black"
          );
        } else {
          submitBtnRef.current?.classList.add(
            ...["bg-emerald-500", "text-black"]
          );
          submitBtnRef.current?.lastElementChild?.classList.add(
            ...["text-black"]
          );
        }
      } else {
        submitBtnRef.current?.classList.remove(
          ...["bg-emerald-500", "text-black"]
        );
        submitBtnRef.current?.lastElementChild?.classList.remove(
          ...["text-black"]
        );
        submitBtnRef.current?.classList.remove(...["bg-red-500", "text-white"]);
        submitBtnRef.current?.lastElementChild?.classList.remove(
          ...["text-white"]
        );
      }
    }
  };
  //
  useEffect(() => {
    const title: string = "Login";
    dispatch(SET_PAGE_TITLE({ title: title }));
  }, []);
  useEffect(() => {
    if (formdata.email === "" && formdata.password === "") {
      submitBtnRef.current?.classList.add("login-btn-disabled");
    } else {
      submitBtnRef.current?.classList.remove("login-btn-disabled");
    }
  }, [formdata.email, formdata.password]);
  useLayoutEffect(() => {
    let timeout: number;
    if (pending === false && isLoggedIn) {
      timeout = +setTimeout(() => {
        redirect("/", { status: 200, statusText: "ok" });
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [pending, isLoggedIn, isError, isSuccess]);

  useEffect(() => {
    let timeout: number;

    if (isSuccess === true) {
      handleSubmitBtnBackground(submitBtnRef, "add", isError, isSuccess);
    } else if (isError === true) {
      handleSubmitBtnBackground(submitBtnRef, "add", isError, isSuccess);
    }

    timeout = +setTimeout(() => {
      handleSubmitBtnBackground(submitBtnRef, "remove", isError, isSuccess);
      dispatch(BACK_INITIAL_STATE());
    }, 1600);

    return () => {
      clearTimeout(timeout);
    };
  }, [isError, isSuccess]);

  return (
    <main className="min-h-screen w-full">
      <section
        style={{ backgroundImage: `url(${background})` }}
        className="flex items-center justify-between flex-col-reverse md:flex-row min-h-screen w-full bg-cover bg-no-repeat login-bg-overlay"
      >
        <form
          onSubmit={(ev: React.FormEvent) => handleSubmit(ev)}
          className="flex flex-col items-center justify-center z-10 w-11/12 sm:w-3/5 md:w-[40%] lg:w-[30%] h-[77vh] border shadow-lg p-3 bg-gray-100 dark:bg-zinc-800 dark:border-slate-500 sm:ml-14 sm:mr-4 rounded-md"
        >
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
              value={formdata.email}
              placeholder="email address .."
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(ev)
              }
              required={true}
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
              value={formdata.password}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(ev)
              }
              required={true}
            />
          </span>
          <span className="flex items-center justify-start gap-2 w-3/4">
            <input
              className=" w-3 h-3 rounded"
              type="checkbox"
              name="remember-me"
              id="remember-me"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(ev)
              }
            />
            <label
              className="text-violet-700 dark:text-violet-300 font-medium text-sm capitalize"
              htmlFor="remember-me"
            >
              remember me
            </label>
          </span>
          <div className="mb-1 mt-2 w-3/4">
            <button ref={submitBtnRef} className="login-btn" type="submit">
              {pending && (
                <>
                  <span className="loading-spiner h-6 w-6 border-2"></span>
                  <p className="uppercase font-semibold">signing in ..</p>
                </>
              )}
              {isError === true && pending === false && (
                <>
                  <span>
                    <i className="fi fi-sr-exclamation leading-3"></i>
                  </span>
                  <small className="uppercase font-semibold">
                    {errorMessage}
                  </small>
                </>
              )}
              {!pending && isError === "idle" && isSuccess === "idle" && (
                <>
                  <p className="font-semibold">log in</p>
                  <span className="flex items-center">
                    <i className="fi fi-sr-sign-in-alt leading-3"></i>
                  </span>
                </>
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
