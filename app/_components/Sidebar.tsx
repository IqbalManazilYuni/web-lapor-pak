"use client";

import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Sidebar, Button } from "flowbite-react";
// import {
//   HiChartPie,
//   HiViewBoards,
//   HiInbox,
//   HiUsers,
//   HiShoppingBag,
//   HiArrowSmRight,
//   HiUserAdd,
//   HiMenu,
//   HiX,
// } from "react-icons/hi";
import React from "react";

const SidebarComponent = () => {
  return (
    <>
      <div className="xl:block hidden flex-col p-5 bg-base-200 w-64">
        <h1 className="mb-8 ">Lapor Pak Sumbar</h1>
        <ul className="menu">
          <li>
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <details open>
              <summary>Parent</summary>
              <ul>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarComponent;
