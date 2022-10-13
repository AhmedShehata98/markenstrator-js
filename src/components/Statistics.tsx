import React from "react";

const Statistics = () => {
  return (
    <ul className="overview-statistics">
      <li className="statistics-box">
        <span className="statistic-box-icon dark:bg-cyan-300 dark:text-zinc-800">
          <i className="fi fi-rr-coins text-2xl leading-3"></i>
        </span>
        <span className="flex flex-col mt-3 dark:text-zinc-100">
          <b>50.000 </b>
          <small className="text-gray-500 dark:text-zinc-500">
            Earn of the month
          </small>
        </span>
      </li>
      <li className="statistics-box">
        <span className="statistic-box-icon dark:bg-rose-400 dark:text-zinc-800">
          <i className="fi fi-br-chart-histogram text-2xl leading-3"></i>
        </span>
        <span className="flex flex-col mt-3 dark:text-zinc-100">
          <p>2.050.000 L.E</p>
          <small className="text-gray-500 dark:text-zinc-500 ">
            Earn growth <b>33%</b>
          </small>
        </span>
      </li>
      <li className="statistics-box">
        <span className="statistic-box-icon dark:bg-orange-300 dark:text-zinc-800">
          <i className="fi fi-rr-pulse text-2xl leading-3"></i>
        </span>
        <span className="flex flex-col mt-3 dark:text-zinc-100">
          <p>50.000 L.E</p>
          <small className="text-gray-500 dark:text-zinc-500">
            conversion rate
          </small>
        </span>
      </li>
      <li className="statistics-box">
        <span className="statistic-box-icon dark:bg-emerald-300 dark:text-zinc-800">
          <i className="fi fi-sr-earnings text-2xl leading-3"></i>
        </span>
        <span className="flex flex-col mt-3 dark:text-zinc-100">
          <p>50.000 L.E</p>
          <small className="text-gray-500 dark:text-zinc-500">
            gross profit margin
          </small>
        </span>
      </li>
    </ul>
  );
};

export default Statistics;
