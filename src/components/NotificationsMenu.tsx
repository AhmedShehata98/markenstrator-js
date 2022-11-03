import { nanoid } from "@reduxjs/toolkit";
import React, { forwardRef, LegacyRef } from "react";
import { Link } from "react-router-dom";
import { INotificationsMenu } from "../Types/pages-types";

type NotificationsMenuProps = {
  notificationMenuData: INotificationsMenu[];
};

const NotificationsMenu = forwardRef(
  (
    { notificationMenuData }: NotificationsMenuProps,
    ref: LegacyRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className="notification-menu-wrapper hide-menu">
        <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-zinc-800 border-b">
          <span className="flex items-center justify-center">
            <p className="text-sm font-semibold capitalize">notifications</p>
          </span>
          <span className="flex items-center justify-center">
            <button
              type="button"
              className="flex gap-1 font-bold uppercase text-red-500"
            >
              <small>clear</small>
              <i className="fi fi-rr-broom leading-3"></i>
            </button>
          </span>
        </div>
        <ul className="flex flex-col p-1 gap-2 max-w-full divide-y max-h-[65vh] overflow-y-auto">
          {Array.isArray(notificationMenuData) &&
            notificationMenuData &&
            notificationMenuData.map((notificationData) => {
              return (
                <li
                  key={nanoid(4)}
                  className="flex items-center justify-center w-full px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  <Link
                    className="flex items-center justify-center gap-3 max-w-full"
                    to={"#"}
                  >
                    <span
                      className={`flex items-center justify-center w-2/12 rounded-full first:text-3xl ${((
                        notificationData
                      ) => {
                        switch (notificationData.type) {
                          case "alert":
                            return "first:text-red-600";
                          case "warning":
                            return "first:text-yellow-400";
                          case "danger":
                            return "first:text-yellow-400";
                          case "success":
                            return "first:text-emerald-500";
                          default:
                            "first:text-emerald-600";
                            break;
                        }
                      })(notificationData)}`}
                    >
                      <i className={`${notificationData.icon} leading-3`}></i>
                    </span>
                    <div className="flex items-start justify-center flex-col w-[83%]">
                      <h5 className="font-semibold capitalize mb-1">
                        {notificationData.title}
                      </h5>
                      <p className="truncate max-w-full text-xs">
                        {notificationData.summury}
                      </p>
                      <small className="text-zinc-400 text-xs">
                        {notificationData.date + " " + "ago"}
                      </small>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
);
// const NotificationsMenu = ({
//   notificationMenuData,
// }: NotificationsMenuProps) => {
//   return (
//     <div className="notification-menu-wrapper notification-menu-hide">
//       <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-zinc-800 border-b">
//         <span className="flex items-center justify-center">
//           <p className="text-sm font-semibold capitalize">notifications</p>
//         </span>
//         <span className="flex items-center justify-center">
//           <button
//             type="button"
//             className="flex gap-1 font-bold uppercase text-red-500"
//           >
//             <small>clear</small>
//             <i className="fi fi-rr-broom leading-3"></i>
//           </button>
//         </span>
//       </div>
//       <ul className="flex flex-col p-1 gap-2 max-w-full divide-y max-h-[65vh] overflow-y-auto">
//         {Array.isArray(notificationMenuData) &&
//           notificationMenuData &&
//           notificationMenuData.map((notificationData) => {
//             return (
//               <li className="flex items-center justify-center w-full px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
//                 <Link
//                   className="flex items-center justify-center gap-3 max-w-full"
//                   to={"#"}
//                 >
//                   <span
//                     className={`flex items-center justify-center w-2/12 rounded-full first:text-3xl ${((
//                       notificationData
//                     ) => {
//                       switch (notificationData.type) {
//                         case "alert":
//                           return "first:text-red-600";
//                         case "warning":
//                           return "first:text-yellow-400";
//                         case "danger":
//                           return "first:text-yellow-400";
//                         case "success":
//                           return "first:text-emerald-500";
//                         default:
//                           "first:text-emerald-600";
//                           break;
//                       }
//                     })(notificationData)}`}
//                   >
//                     <i className={`${notificationData.icon} leading-3`}></i>
//                   </span>
//                   <div className="flex items-start justify-center flex-col w-[83%]">
//                     <h5 className="font-semibold capitalize mb-1">
//                       {notificationData.title}
//                     </h5>
//                     <p className="truncate max-w-full text-xs">
//                       {notificationData.summury}
//                     </p>
//                     <small className="text-zinc-400 text-xs">
//                       {notificationData.date + " " + "ago"}
//                     </small>
//                   </div>
//                 </Link>
//               </li>
//             );
//           })}
//       </ul>
//     </div>
//   );
// };

export default NotificationsMenu;
