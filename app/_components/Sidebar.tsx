"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMenu, loadSelectedMenu } from "../_utils/menu/menuSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFolder, faUser, faGear, faCommentDots, faFile } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

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

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

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
      setSelectedMenuLocal(pathToMenu[pathname]);
      dispatch(setSelectedMenu(pathToMenu[pathname])); 
    }
  }, [pathname, dispatch]);

  return (
    <div className="hidden xl:flex flex-col p-5 bg-white shadow-md w-64 fixed h-full">
      <ul className="menu space-y-2">
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
          <ExpandableMenu label="Data Master" icon={faGear}>
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
            icon={faCommentDots}
            menuKey="pengaduan"
            selectedMenu={selectedMenu}
            handleMenuClick={handleMenuClick}
          />
        </li>
        <li>
          <MemoizedMenuItem
            href="/sertifikat"
            label="Data Sertifikat"
            icon={faFile}
            menuKey="sertifikat"
            selectedMenu={selectedMenu}
            handleMenuClick={handleMenuClick}
          />
        </li>
      </ul>
    </div>
  );
};

export default SidebarComponent;
