import React, { useEffect, useLayoutEffect, useRef } from "react";

// components
import CustomerReviews from "../components/CustomerReviews";
import PieChart from "../components/PieChart";
import Statistics from "../components/Statistics";
import StreamChart from "../components/StreamChart";
import TopSeller from "../components/TopSeller";

const Home = () => {
  let timeout: ReturnType<typeof setTimeout>;
  const homeRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    timeout = setTimeout(() => {
      homeRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    }, 5);
    return () => {
      clearTimeout(timeout);
      homeRef.current?.classList.replace(
        "section-fade-closed",
        "section-fade-open"
      );
    };
  }, []);
  return (
    <main ref={homeRef} className="main-home section-fade-closed">
      <section className="home-content-container lg:ml-48">
        <article className="home-content-children">
          <div className="flex flex-col w-full lg:w-3/4 h-full flex-wrap">
            <div className="flex items-center w-full mb-4">
              <Statistics />
            </div>
            <div className="flex items-center flex-col lg:flex-row gap-3">
              <PieChart />
              <StreamChart className="w-full lg:w-2/3 h-52 p-3  bg-white rounded-md shadow dark:bg-zinc-800 dark:text-zinc-100" />
            </div>
          </div>
          <article className="w-full lg:w-1/4 h-full">
            <CustomerReviews />
          </article>
        </article>
        <article className="home-content-children mt-4">
          <article className="w-full lg:w-1/3 h-60">
            <TopSeller />
          </article>
          <article className="w-full lg:w-1/3 h-60">
            <StreamChart className="w-full  h-56 p-3  bg-white rounded-md shadow dark:bg-zinc-800 dark:text-zinc-100" />
          </article>
          <article className="w-full lg:w-1/3 h-60"></article>
        </article>
      </section>
    </main>
  );
};

export default Home;
