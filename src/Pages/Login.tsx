import React, { useEffect, useRef, useState } from "react";

// assets
import background from "../assets/images/carlos-muza-hpjSkU2UYSU-unsplash.webp";
import logo from "../assets/images/logo.png";

// 3rd party libraries
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { SET_PAGE_TITLE } from "../Redux/Slice/AppSlice";

// redux actions
import { LOGIN_ACCOUNT_ACTION } from "../Redux/Slice/UserSlice";

const Login = () => {
  const { pathname } = useLocation();
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
  //
  useEffect(() => {
    const title: string = pathname.split("/")[1].toLocaleUpperCase();
    dispatch(SET_PAGE_TITLE({ title: title }));
  }, []);
  useEffect(() => {
    if (formdata.email === "" && formdata.password === "") {
      submitBtnRef.current?.classList.add("login-btn-disabled");
    } else {
      submitBtnRef.current?.classList.remove("login-btn-disabled");
    }
  }, [formdata.email, formdata.password]);
  return (
    <main>
      <section className="login-wrapper">
        <article className="login-box">
          <figure>
            <img src={logo} alt="logo" className="w-40" />
          </figure>
          <div className="p-2 w-3/5 text-start mb-3">
            <h4 className="text-gray-800 font-bold leading-3 capitalize dark:text-gray-100">
              login
            </h4>
            <small className="font-bold text-xs capitalize text-gray-400 ">
              wlecome back, please login to your account .
            </small>
          </div>
          <form
            className=" p-2 w-3/5 rounded-md"
            onSubmit={(ev: React.FormEvent) => handleSubmit(ev)}
          >
            <div className="flex flex-col capitalize mt-2">
              <label
                className="text-gray-600 text-sm dark:text-gray-100"
                htmlFor="email"
              >
                email address *
              </label>
              <span className="login-input-wrapper">
                <span className="flex items-center">
                  <i className="fi fi-sr-envelope leading-3 text-gray-900 dark:text-gray-100"></i>
                </span>
                <input
                  className="login-input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email here .."
                  value={formdata.email}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(ev)
                  }
                  required={true}
                />
              </span>
            </div>
            <div className="flex flex-col capitalize mt-2">
              <label
                className="text-gray-600 text-sm dark:text-gray-100"
                htmlFor="password"
              >
                password *
              </label>
              <span className="login-input-wrapper">
                <span className="flex items-center">
                  <i className="fi fi-sr-lock leading-3 text-gray-900 dark:text-gray-100"></i>
                </span>
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password "
                  value={formdata.password}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(ev)
                  }
                  required={true}
                />
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 mb-6">
              <span className="flex items-center gap-2">
                <input
                  className="accent-cyan-700 dark:accent-cyan-300 outline-none border-0"
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-600 dark:text-gray-300 capitalize text-sm"
                >
                  remember me
                </label>
              </span>
              <Link
                className="text-cyan-800 text-sm font-semibold capitalize underline dark:text-cyan-200"
                to="#"
              >
                forget password ?
              </Link>
            </div>
            <div className="w-full mb-1 mt-9">
              <button ref={submitBtnRef} className="login-btn" type="submit">
                <p className="font-semibold ">log in</p>
                <span className="flex items-center">
                  <i className="fi fi-sr-sign-in-alt leading-3"></i>
                </span>
              </button>
            </div>
          </form>
        </article>
        <article
          style={{ backgroundImage: `url(${background})` }}
          className="login-hero "
        ></article>
      </section>
    </main>
  );
};

export default Login;
