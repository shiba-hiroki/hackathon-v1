import { AiOutlineUser } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { TbFileReport } from "react-icons/tb";

import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { appURL } from "../config/url";

export function DefaultLayout() {
  const urls = [
    { path: appURL.user, name: "USER", icon: AiOutlineUser },
    { path: appURL.shift, name: "SHIFT", icon: BiCalendar },
    { path: appURL.attendance, name: "ATTENDANCE", icon: TbFileReport },
  ];
  return (
    <>
      <ScrollRestoration />
      <main className="h-screen flex">
        <nav className="h-screen w-1/5 bg-gray-100 pt-8 flex-col">
          <h1 className="mx-auto w-fit px-3 font-black">
            Attendance Management
          </h1>
          <ul className="justify-center flex-col pt-8">
            {urls.map((url, i) => (
              <li key={i.toString()}>
                <NavLink
                  to={url.path}
                  className={({ isActive }) =>
                    isActive ? "text-cyan-400" : ""
                  }
                >
                  <div className="p-3 py-5 flex items-center gap-x-2 hover:bg-gray-300">
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
