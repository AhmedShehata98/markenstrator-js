import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// assets
import background from "../assets/images/signup-bg.webp";
import logoSignup from "../assets/images/logo-login.png";

// 3rd party libraries
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { SET_PAGE_TITLE, SET_USER_AUTH_STATE } from "../Redux/Slice/AppSlice";
import { SubmitHandler, useForm } from "react-hook-form";

// utilities
import { routesList } from "../Router/RoutesList";
import { SignupFormdata } from "../Types/pages-types";

//API Hook
import { useSignupMutation } from "../services/shoperzApi.service";

const Signup = () => {
  const navigator = useNavigate();
  const [fetchSignup, signupResponse] = useSignupMutation();
  const [responseMSG, setResponseMSG] = useState("");
  const timeoutRef = useRef(0);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<Partial<SignupFormdata>>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleShowPassword = (ev: React.MouseEvent) => {
    let button = ev.target as HTMLElement;
    let parentElement = button.closest("span");
    let icons = [button?.firstElementChild, button?.lastElementChild];
    let passwordInput = parentElement?.children[
      parentElement?.children.length - 2
    ] as HTMLInputElement;
    //
    icons.forEach((icon) => {
      if (icon?.classList.contains("inline-block")) {
        icon.classList.replace("inline-block", "hidden");
      } else {
        icon?.classList.contains("fi-sr-eye")
          ? icon?.classList.add("text-violet-600")
          : null;
        icon?.classList.replace("hidden", "inline-block");
      }
    });
    passwordInput.type === "password"
      ? passwordInput.setAttribute("type", "text")
      : passwordInput.setAttribute("type", "password");
  };
  const sendSignupData: SubmitHandler<Partial<SignupFormdata>> = (data) => {
    fetchSignup({
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      phone: data.phone,
    })
      .unwrap()
      .then((response) => {
        setResponseMSG(
          "account created success check your mail inbox!, redirect after 3 seconds"
        );
        dispatch(SET_USER_AUTH_STATE(true));
        timeoutRef.current = +setTimeout(() => {
          navigator("/", { state: response.data.token });
        }, 3000);
      })
      .catch((err) =>
        setResponseMSG(err.data.error?.[0].message || err.data.message)
      );
  };

  useLayoutEffect(() => {
    const title: string = "Sign up";
    dispatch(SET_PAGE_TITLE({ title }));
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      // buttonRef.current?.removeAttribute("disabled");
    } else {
      // buttonRef.current?.setAttribute("disabled", "true");
    }
  }, [
    watch("approval"),
    watch("fullname"),
    watch("email"),
    watch("password"),
    watch("phone"),
  ]);
  return (
    <main>
      <section
        style={{ backgroundImage: `url(${background})` }}
        className="flex items-center justify-between flex-col-reverse md:flex-row w-full min-h-screen bg-cover bg-no-repeat signup-bg-overlay"
      >
        <article className="z-10 flex items-center justify-center flex-col w-full sm:w-2/5 md:w-1/2 lg:w-3/5 h-28 lg:h-full">
          <figure>
            <img
              className="max-w-[10rem] md:max-w-[15rem] object-cover"
              src={logoSignup}
              alt="signup-logo"
            />
          </figure>
        </article>
        <article className="relative z-10 flex justify-center items-center flex-col w-11/12 sm:w-10/12 md:w-1/2 lg:w-1/3 h-[90vh] md:mr-12 border rounded bg-gray-100 dark:bg-zinc-800 dark:border-slate-500">
          <div className="flex items-start justify-center flex-col w-3/4 h-fit mb-3">
            {signupResponse.isError || signupResponse.isSuccess ? (
              <div
                className={`absolute top-0 left-0 w-full bg-gray-200 rounded border-b text-sm capitalize text-center font-medium p-2 ${
                  signupResponse.isError
                    ? "bg-red-200 !text-red-900 border-red-700"
                    : "bg-emerald-200 !text-emerald-900 border-emerald-700"
                }`}
              >
                {responseMSG}
              </div>
            ) : null}
            <h3 className="text-md font-semibold capitalize dark:text-white">
              welcome back to
              <mark className="bg-inherit text-violet-700 dark:text-violet-400 uppercase font-bold px-2">
                marketify
              </mark>
            </h3>
            <small className="dark:text-zinc-400">
              create your new account now
            </small>
          </div>
          <form
            onSubmit={handleSubmit(sendSignupData)}
            className="flex items-center justify-start flex-col gap-3 w-3/4 overflow-y-auto"
          >
            <span className="flex justify-start items-center gap-3 w-full">
              <p className="text-gray-600 dark:text-zinc-300 capitalize text-xs font-medium">
                sign up with :
              </p>
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
            <span className="relative bg-gray-400  h-[1px] my-2 w-3/4">
              <small className="absolute top-1/2 grid place-content-center px-[5px] py-[1px] rounded-full left-1/2 border -translate-x-1/2 -translate-y-1/2 bg-gray-100 dark:bg-zinc-600 text-sky-700 dark:text-white">
                or
              </small>
            </span>

            <span className="flex items-start justify-center flex-col gap-1 w-full">
              <label className="form-label" htmlFor="full-name">
                full name
              </label>
              <input
                type="text"
                id="full-name"
                className="form-input"
                {...register("fullname", {
                  required: "your name is required",
                })}
                placeholder={"Ex : John Doe"}
              />
              <small className="text-xs capitalize text-red-600 font-semibold">
                {errors.fullname?.message}
              </small>
            </span>
            <span className="flex items-start justify-center flex-col gap-1 w-full">
              <label className="form-label" htmlFor="phone">
                phone number
              </label>
              <input
                type="tel"
                id="phone"
                className="form-input"
                {...register("phone", {
                  required: "your phone number is required",
                })}
                placeholder={"Ex : +201234567891 "}
              />
              <small className="text-xs capitalize text-red-600 font-semibold">
                {errors.phone?.message}
              </small>
            </span>
            <span className="flex items-start justify-center flex-col gap-1 w-full">
              <label className="form-label" htmlFor="e-mail">
                e-mail
              </label>
              <input
                type="email"
                id="e-mail"
                {...register("email", { required: "E-mail is required" })}
                placeholder={"Ex : email@example.com"}
                className="form-input"
              />
              <small className="text-xs capitalize text-red-600 font-semibold">
                {errors.email?.message}
              </small>
            </span>
            {/* <span className="flex items-start justify-center flex-col gap-1 w-full">
              <label className="capitalize text-sm mb-1" htmlFor="company-name">
                company name
              </label>
              <input
                type="text"
                name="company-name"
                id="company-name"
                className="bg-gray-200 px-2 py-[2px] border-b-4 border-slate-500 rounded w-full outline-none focus:bg-slate-200"
              />
            </span> */}
            <span className="relative flex items-start justify-center flex-col gap-1 w-full">
              <label className="form-label" htmlFor="password">
                password
              </label>
              {errors.password ? null : (
                <button
                  type="button"
                  onClick={(ev: React.MouseEvent) => handleShowPassword(ev)}
                  className="absolute right-3 top-1/2 text-gray-600"
                  title="show password"
                >
                  <i className="fi fi-sr-eye-crossed select-none pointer-events-none inline-block text-gray-600"></i>
                  <i className="fi fi-sr-eye select-none pointer-events-none hidden "></i>
                </button>
              )}

              <input
                type="password"
                id="password"
                {...register("password", { required: "password is required" })}
                className="form-input"
                placeholder={" at least 8 characters required..."}
              />
              <small className="text-xs capitalize text-red-600 font-semibold">
                {errors.password?.message}
              </small>
            </span>
            <span className="flex items-start justify-center gap-2 w-full mt-2">
              <input
                type="checkbox"
                id="Approval"
                {...register("approval", { required: true })}
                className="accent-blue-700 mt-1"
              />
              <label
                className={
                  Boolean(errors.approval)
                    ? "form-label text-red-600 "
                    : "form-label text-violet-600"
                }
                htmlFor="Approval"
              >
                i aggre on the conditions and the user agreement
              </label>
            </span>
            <span className="flex items-start justify-center flex-col gap-1 w-full">
              <button
                type="submit"
                className="flex items-center justify-center bg-violet-600 text-white w-full h-9 rounded hover:bg-violet-300 hover:text-violet-800 capitalize disabled:bg-violet-200 disabled:text-gray-500 disabled:pointer-events-none"
                ref={buttonRef}
              >
                {signupResponse.isLoading ? (
                  <span className="block w-6 h-6 rounded-full border-4 border-white border-t-stone-500 shadow-md animate-spin"></span>
                ) : (
                  "create an account"
                )}
              </button>
            </span>
            <span className="flex items-center justify-center w-full">
              <small className="font-medium capitalize text-slate-500 dark:text-slate-400">
                have already an account ?
              </small>
              <Link
                className="text-violet-700 dark:text-violet-500 font-medium text-sm uppercase px-4"
                to={`/${routesList?.login}` || "#"}
              >
                login
              </Link>
            </span>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Signup;
