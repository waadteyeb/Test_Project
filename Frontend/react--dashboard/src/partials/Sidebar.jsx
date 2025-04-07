import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import dashboardIcon from "../images/slide menu icons/home.png";
import calendarIcon from "../images/slide menu icons/calendar-1.png";
import group1Icon from "../images/slide menu icons/Group-1.png";
import group3Icon from "../images/slide menu icons/Group-3.png";
import group2Icon from "../images/slide menu icons/Group-2.png";
import mapIcon from "../images/slide menu icons/map.png";
import group195Icon from "../images/slide menu icons/group 195.png";
import archiveIcon from "../images/slide menu icons/archive.png";
import logoIcon from "../images/logo-smi-insights 1.png";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(false); 

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 2xl:w-20 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="mt-4">
          {/* Logo */}
          <NavLink end to="/">
            <img src={logoIcon} alt="logo Icon" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-10">
              {/* Dashboard */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/" ||
                  pathname.includes("dashboard") ||
                  pathname.startsWith("/id/")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/" ||
                            pathname.includes("dashboard") ||
                            pathname.startsWith("/id/")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSidebarExpanded(false); // Keep the sidebar collapsed
                        }}
                      >
                        <div className="items-center">
                          <img
                            src={dashboardIcon}
                            alt="Dashboard Icon"
                            className="w-[23px] h-[17px] object-contain"
                          />
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Calendar */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/calendar" || pathname.includes("calendar")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/group1" ||
                            pathname.includes("calendar")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSidebarExpanded(false); // Keep the sidebar collapsed
                        }}
                      >
                        <div className="items-center">
                          <img
                            src={calendarIcon}
                            alt="Dashboard Icon"
                            className="w-[23px] h-[17px] object-contain"
                          />
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Group 1 */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/group1" || pathname.includes("group1")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/group1" ||
                            pathname.includes("group1")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSidebarExpanded(false); // Keep the sidebar collapsed
                        }}
                      >
                        <div className=" items-center">
                          <img
                            src={group1Icon}
                            alt="Dashboard Icon"
                            className="w-[23px] h-[15px] object-contain"
                          />
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Group 3 */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/group3" || pathname.includes("group3")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/group3" ||
                            pathname.includes("group3")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSidebarExpanded(false); // Keep the sidebar collapsed
                        }}
                      >
                        <div className="items-center">
                          <img
                            src={group3Icon}
                            alt="Group 3 Icon"
                            className="w-[23px] h-[17px] object-contain"
                          />
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* map */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/map" || pathname.includes("map")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/map" || pathname.includes("map")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSidebarExpanded(false); // Keep the sidebar collapsed
                        }}
                      >
                        <div className="items-center">
                          <img
                            src={mapIcon}
                            alt="map Icon"
                            className="w-[23px] h-[17px] object-contain"
                          />
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* group195 */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/group195" || pathname.includes("group195")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/group195" ||
                            pathname.includes("group195")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSidebarExpanded(false); // Keep the sidebar collapsed
                        }}
                      >
                        <div className="items-center">
                          <img
                            src={group195Icon}
                            alt="group195 Icon"
                            className="w-[23px] h-[17px] object-contain"
                          />
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* group2 */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/group195" || pathname.includes("group195")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/group2" ||
                            pathname.includes("group2")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSidebarExpanded(false); // Keep the sidebar collapsed
                        }}
                      >
                        <div className="items-center">
                          <img
                            src={group2Icon}
                            alt="group2 Icon"
                            className="w-[23px] h-[17px] object-contain"
                          />
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* archive */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/archive" || pathname.includes("archive")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === "/archive" ||
                            pathname.includes("archive")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSidebarExpanded(false); // Keep the sidebar collapsed
                        }}
                      >
                        <div className="items-center">
                          <img
                            src={archiveIcon}
                            alt="archive Icon"
                            className="w-[23px] h-[17px] object-contain"
                          />
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
