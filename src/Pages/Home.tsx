import React, { useEffect, useLayoutEffect, useRef } from "react";

// components
import CustomerReviews from "../components/CustomerReviews";
import PieChart from "../components/PieChart";
import Statistics from "../components/Statistics";
import StreamChart from "../components/StreamChart";
import TopSeller from "../components/TopSeller";
import { useLocation, useNavigate } from "react-router-dom";
import { routesList } from "../Router/RoutesList";
import { useSelector } from "react-redux";

const Home = () => {
  let timeout: ReturnType<typeof setTimeout>;
  const homeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.document.title = "overview";
  }, []);
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
    <section ref={homeRef} className="content-container section-fade-closed">
      <article className="w-full min-w-full h-full flex flex-col flex-wrap">
        <Statistics />
        <div className="w-full min-w-full flex items-center flex-col lg:flex-row gap-3">
          <PieChart />
          <StreamChart className="w-full lg:w-2/3 h-52 p-3  bg-white rounded-md shadow dark:bg-zinc-800 dark:text-zinc-100" />
        </div>
      </article>
      <article className="w-full min-w-full h-full flex gap-3 max-lg::flex-wrap">
        <div className="w-full lg:w-1/3 h-full">
          <CustomerReviews />
        </div>
        <div className="w-full lg:w-1/3 h-60">
          <TopSeller />
        </div>
        <div className="w-full lg:w-1/3 h-60">
          <StreamChart className="w-full h-56 p-3 bg-white rounded-md shadow dark:bg-zinc-800 dark:text-zinc-100" />
        </div>
      </article>
    </section>
  );
};

export default Home;
