/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMenu, loadSelectedMenu } from "../_utils/menu/menuSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFolder, faUser } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";

const MenuItem = ({
  href,
  label,
  icon,
  menuKey,
  selectedMenu,
  handleMenuClick,
}: {
  href: string;
  label: string;
  icon: any;
  menuKey: string;
  selectedMenu: string;
  handleMenuClick: (menu: string) => void;
}) => (
  <Link
    href={href}
    onClick={() => handleMenuClick(menuKey)}
    className={`font-Poppins font-semibold rounded-lg p-3 flex items-center transition-colors duration-75 ${
      selectedMenu === menuKey ? "bg-[#3F3B26] text-white" : ""
    }`}
  >
    <FontAwesomeIcon icon={icon} className="mr-2 w-4 h-4" />
    {label}
  </Link>
);

// Memoized version untuk mencegah render ulang tidak perlu
const MemoizedMenuItem = memo(MenuItem);

const ExpandableMenu = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon: any;
  children: React.ReactNode;
}) => (
  <details open>
    <summary className="font-Poppins font-bold flex items-center cursor-pointer p-3">
      <FontAwesomeIcon icon={icon} className="mr-2 w-4 h-4" />
      {label}
    </summary>
    <ul className="ml-4">{children}</ul>
  </details>
);

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter(); // Untuk navigasi halaman

  const selectedMenuFromRedux = useSelector(
    (state: any) => state.menu.selectedMenu
  );
  const [selectedMenu, setSelectedMenuLocal] = useState<string>("");

  useEffect(() => {
    setSelectedMenuLocal(selectedMenuFromRedux);
  }, [selectedMenuFromRedux]);

  const handleMenuClick = useCallback(
    (menu: string) => {
      setSelectedMenuLocal(menu);
      dispatch(setSelectedMenu(menu));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(loadSelectedMenu());
  }, [dispatch]);

  // Mapping pathname untuk sinkronisasi dengan menu
  useEffect(() => {
    const pathToMenu: { [key: string]: string } = {
      "/data-master/jenis-pengaduan": "jenis-pengaduan",
      "/dashboard": "dashboard",
      "/data-master/kabupaten-kota": "kabupaten-kota",
      "/data-account/kab-kota": "admin-kab-kota",
      "/data-account/masyarakat": "masyarakat",
      "/data-account/petugas": "petugas",
      "/pengaduan": "pengaduan",
      "/sertifikat": "sertifikat",
    };

    if (pathToMenu[pathname]) {
      setSelectedMenuLocal(pathToMenu[pathname]); // Update state lokal cepat
      dispatch(setSelectedMenu(pathToMenu[pathname])); // Update Redux
    }
  }, [pathname, dispatch]);

  const handleLogout = async () => {
    router.push("/");
  };

  return (
    <>
      <div className="fixed w-full bg-white z-10 flex justify-between h-16 items-center shadow-lg">
        <div className="flex-none xl:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mx-2 flex-1 flex justify-end flex-row">
          <div className="w-1/2 justify-start pl-2 font-Poppins font-bold flex items-center">
            <img src="/icon.svg" alt="Icon" className="h-14 w-48" />
          </div>
          <div className="w-1/2 justify-end flex items-center mr-5">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar ">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                <li>
                  <a className="font-Poppins font-bold text-md">Profile</a>
                </li>
                <li onClick={() => handleLogout()}>
                  <a className="font-Poppins font-bold text-md">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      <div
        className={`xl:hidden fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar mobile */}
      <div
        className={`xl:hidden fixed top-0 left-0 z-30 h-full w-64 bg-white transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="mb-2 p-5 pb-3 font-Poppins font-bold text-lg">
          Lapor Pak Sumbar
        </h1>
        <ul className="menu p-5">
          <li>
            <MemoizedMenuItem
              href="/dashboard"
              label="Dashboard"
              icon={faHome}
              menuKey="dashboard"
              selectedMenu={selectedMenu}
              handleMenuClick={handleMenuClick}
            />
          </li>
          <li>
            <ExpandableMenu label="Data Master" icon={faFolder}>
              <MemoizedMenuItem
                href="/data-master/jenis-pengaduan"
                label="Jenis Pengaduan"
                icon={faFolder}
                menuKey="jenis-pengaduan"
                selectedMenu={selectedMenu}
                handleMenuClick={handleMenuClick}
              />
              <MemoizedMenuItem
                href="/data-master/kabupaten-kota"
                label="Kabupaten / Kota"
                icon={faFolder}
                menuKey="kabupaten-kota"
                selectedMenu={selectedMenu}
                handleMenuClick={handleMenuClick}
              />
            </ExpandableMenu>
          </li>
          <li>
            <ExpandableMenu label="Data Account" icon={faUser}>
              <MemoizedMenuItem
                href="/data-account/kab-kota"
                label="Admin Kab/Kota"
                icon={faUser}
                menuKey="admin-kab-kota"
                selectedMenu={selectedMenu}
                handleMenuClick={handleMenuClick}
              />
              <MemoizedMenuItem
                href="/data-account/petugas"
                label="Petugas"
                icon={faUser}
                menuKey="petugas"
                selectedMenu={selectedMenu}
                handleMenuClick={handleMenuClick}
              />
              <MemoizedMenuItem
                href="/data-account/masyarakat"
                label="Masyarakat"
                icon={faUser}
                menuKey="masyarakat"
                selectedMenu={selectedMenu}
                handleMenuClick={handleMenuClick}
              />
            </ExpandableMenu>
          </li>
          <li>
            <MemoizedMenuItem
              href="/pengaduan"
              label="Data Pengaduan"
              icon={faFolder}
              menuKey="pengaduan"
              selectedMenu={selectedMenu}
              handleMenuClick={handleMenuClick}
            />
          </li>
          <li>
            <MemoizedMenuItem
              href="/sertifikat"
              label="Data Sertifikat"
              icon={faFolder}
              menuKey="sertifikat"
              selectedMenu={selectedMenu}
              handleMenuClick={handleMenuClick}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Topbar;
