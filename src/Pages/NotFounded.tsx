import React from "react";
import useDocumentWidth from "../Hooks/useDocumentWidth";
import notFoundedImage from "../assets/images/Page-not-Found.svg";
import { useNavigate } from "react-router-dom";

const NotFounded = () => {
  const navigate = useNavigate();
  const { documentWidth } = useDocumentWidth();
  return (
    <main>
      <section
        className={`section-main `}
        style={
          documentWidth >= 1024
            ? { width: "calc(100% - 12rem)" }
            : { width: "100%" }
        }
      >
        <article className="w-full h-2/5 mt-0">
          <img
            className="w-1/4 object-cover m-auto"
            src={notFoundedImage}
            alt="404-page-not-found"
          />
        </article>
        <article className="flex flex-col items-center justify-center gap-5 h-1/4">
          <p className="text-center font-bold capitalize text-gray-600 dark:text-zinc-400">
            page not found Or it is under construction
          </p>
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2 bg-indigo-300 font-bold text-indigo-800 rounded hover:bg-indigo-400"
            onClick={() => navigate("/")}
          >
            <p>back to homepage</p>
            <i className="text-xs fi fi-sr-arrow-up-right leading-3"></i>
          </button>
        </article>
      </section>
    </main>
  );
};

export default NotFounded;
