import { FaUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbFileReport } from "react-icons/tb";
import { TbCloudSnow } from "react-icons/tb";

import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { appURL } from "../config/url";

export function DefaultLayout() {
  const urls = [
    { path: appURL.user, name: "USER", icon: FaUser },
    { path: appURL.shift, name: "SHIFT", icon: FaRegCalendarAlt },
    { path: appURL.attendance, name: "ATTENDANCE", icon: TbFileReport },
  ];
  return (
    <>
      <ScrollRestoration />
      <main className="h-screen flex">
        <nav className="h-screen w-fit bg-gray-100 pt-8 flex-col">
          <h1 className="mx-auto w-fit px-3 font-black">
            Attendance Management
          </h1>
          <ul className="justify-center flex-col pt-8">
            {urls.map((url, i) => (
              <li key={i.toString()}>
                <NavLink
                  to={url.path}
                  className={({ isActive }) =>
                    isActive ? "" : "text-gray-400"
                  }
                >
                  <div className="p-3 py-5 flex items-center gap-x-2 hover:bg-gray-200">
                    <url.icon />
                    <p className="italic">{url.name}</p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Outlet />
      </main>
    </>
  );
}
