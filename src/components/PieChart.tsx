import React from "react";
import { ResponsivePie } from "@nivo/pie";

interface IPieData {
  id: string;
  label: string;
  value: number;
  color: string;
}
const PieChart = () => {
  const data: IPieData[] = [
    {
      id: "failed",
      label: "failed",
      value: 25,
      color: "#dd1933",
    },
    {
      id: "Success",
      label: "Success",
      value: 25,
      color: "#017252",
    },
    {
      id: "Pending",
      label: "Pending",
      value: 50,
      color: "#b3a41e",
    },
  ];

  return (
    <div className="w-full lg:w-1/3 h-52 p-3 bg-white rounded-md shadow dark:bg-zinc-800 dark:text-zinc-100">
      <span className="flex items-start justify-between mb-3">
        <span>
          <p className="text-sm font-semibold capitalize">order status</p>
          <small className="text-xs text-gray-500 dark:text-zinc-400 capitalize">
            total earnings of this month
          </small>
        </span>
        <i className="fi fi-rs-chart-pie text-indigo-500 text-xl"></i>
      </span>
      <div className="h-32 w-full flex items-center justify-start">
        <span className="h-full w-[70%] relative">
          <ResponsivePie
            data={data}
            innerRadius={0.6}
            fit={true}
            cornerRadius={0}
            enableArcLinkLabels={false}
            margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
          />
          <span className="flex flex-col items-center capitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <small className="text-gray-600 dark:text-zinc-100">ratio</small>
            <b className="font-mono text-gray-700 dark:text-zinc-100">100%</b>
          </span>
        </span>
        <span className="w-1/4">
          {data.map((data: IPieData, index: number) => (
            <small
              key={index}
              style={{ color: data.color }}
              className="flex gap-2 items-start justify-between font-semibold capitalize"
            >
              {data.label}{" "}
              <p className="text-gray-600 dark:text-zinc-100">
                {data.value + "%"}
              </p>
            </small>
          ))}
        </span>
      </div>
    </div>
  );
};

export default PieChart;
