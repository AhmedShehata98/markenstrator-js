import React from "react";
import { ResponsiveStream } from "@nivo/stream";

const StreamChart = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => {
  const data = [
    {
      Jan: 40,
      Feb: 10,
      Mar: 90,
      Jun: 91,
      Jul: 94,
      Aug: 71,
      Sep: 85,
      Oct: 49,
      Nav: 56,
      Dec: 78,
    },
    {
      Jan: 40,
      Feb: 45,
      Mar: 30,
      Jun: 91,
      Jul: 14,
      Aug: 95,
      Sep: 27,
      Oct: 83,
      Nav: 30,
      Dec: 78,
    },
    {
      Jan: 40,
      Feb: 11,
      Mar: 22,
      Jun: 91,
      Jul: 94,
      Aug: 33,
      Sep: 85,
      Oct: 27,
      Nav: 30,
      Dec: 18,
    },
    {
      Jan: 40,
      Feb: 11,
      Mar: 45,
      Jun: 91,
      Jul: 94,
      Aug: 99,
      Sep: 100,
      Oct: 52,
      Nav: 30,
      Dec: 18,
    },
    {
      Jan: 40,
      Feb: 11,
      Mar: 45,
      Jun: 11,
      Jul: 22,
      Aug: 33,
      Sep: 52,
      Oct: 25,
      Nav: 50,
      Dec: 100,
    },
    {
      Jan: 40,
      Feb: 11,
      Mar: 54,
      Jun: 20,
      Jul: 10,
      Aug: 99,
      Sep: 30,
      Oct: 52,
      Nav: 27,
      Dec: 18,
    },
    {
      Jan: 40,
      Feb: 11,
      Mar: 54,
      Jun: 22,
      Jul: 10,
      Aug: 99,
      Sep: 30,
      Oct: 48,
      Nav: 52,
      Dec: 18,
    },
    {
      Jan: 40,
      Feb: 51,
      Mar: 54,
      Jun: 13,
      Jul: 28,
      Aug: 46,
      Sep: 30,
      Oct: 11,
      Nav: 12,
      Dec: 13,
    },
    {
      Jan: 40,
      Feb: 58,
      Mar: 15,
      Jun: 22,
      Jul: 25,
      Aug: 99,
      Sep: 30,
      Oct: 25,
      Nav: 52,
      Dec: 18,
    },
    {
      Jan: 10,
      Feb: 20,
      Mar: 30,
      Jun: 10,
      Jul: 50,
      Aug: 80,
      Sep: 70,
      Oct: 25,
      Nav: 52,
      Dec: 18,
    },
  ];
  return (
    <div {...props}>
      <span className="flex items-start justify-between mb-3">
        <span>
          <p className="text-sm font-semibold capitalize">Goal completion</p>
        </span>
        <i className="fi fi-rr-stats text-sky-500 text-xl"></i>
      </span>
      <div className="w-full aspect-video h-36 dark:text-zinc-100">
        <ResponsiveStream
          data={data}
          keys={[
            "Jan",
            "Feb",
            "Mar",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nav",
            "Dec",
          ]}
          enableGridX={true}
          enableGridY={true}
          colors={{ scheme: "blues" }}
          borderColor={{ theme: "background" }}
          curve="linear"
          offsetType="diverging"
          fillOpacity={0.85}
          margin={{ top: 0, right: 90, bottom: 25, left: 30 }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 100,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999999",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default StreamChart;
