/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { faList, faPlus, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../_store/store";
import { fetchDataSummary } from "../_utils/data/dataSummary";
import SkeletonLoading from "../_components/skeletonloading/SkeletonLoading";
import ModalTambahSertifikat from "../_components/dashboard/modal-tambah-sertifikat/ModalTambahSertifikat";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { exportToCSV } from "../_utils/export_csv";

const dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: dataList,
    loading,
    error,
  } = useSelector((state: RootState) => state.data4);

  const [selectedYear, setSelectedYear] = useState<string | "">("");
  const [selectedMonth, setSelectedMonth] = useState<string | "">("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState({
    namaPelapor: "",
    tahun: "",
    bulan: "",
    jumlahLaporan: "",
  });
  const [role, setRole] = useState<string | undefined>(undefined);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setRole(session.user?.role);
    }
  }, [session, status]);

  const handleSubmitTambah = () => {
    handleCloseModal();
  };

  const handleOpenModal = (
    namaPelapor: string,
    tahun: string,
    bulan: string,
    jumlahLaporan: string
  ) => {
    setInitialData({ namaPelapor, tahun, bulan, jumlahLaporan });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchDataSummary());
  }, [dispatch]);

  const filteredDataList = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();

    let filteredData = dataList;

    if (selectedYear) {
      filteredData = filteredData.filter((item) => item.tahun === selectedYear);
    }

    if (selectedMonth) {
      filteredData = filteredData
        .map((item) => ({
          ...item,
          bulan: item.bulan.filter(
            (bulanItem) => bulanItem.bulan === selectedMonth
          ),
        }))
        .filter((item) => item.bulan.length > 0);
    }

    return filteredData.flatMap((item) =>
      item.bulan.flatMap((bulanItem) =>
        bulanItem.pelapor
          .filter((pelaporItem) =>
            pelaporItem.namaPelapor.toLowerCase().includes(searchTermLowerCase)
          )
          .map((pelaporItem) => ({
            tahun: item.tahun,
            bulan: bulanItem.bulan,
            namaPelapor: pelaporItem.namaPelapor,
            jumlahLaporan: pelaporItem.jumlahLaporan,
          }))
      )
    );
  };
  const router = useRouter();
  useEffect(() => {
    if (error && error.includes("Token tidak valid, otorisasi gagal")) {
      router.push("/");
    }
  }, [error, router]);

  const filteredData = filteredDataList();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDataList = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePrint = () => {
    exportToCSV(currentDataList, "Data Jumlah Pengaduan.csv");
  };

  return (
    <div className="flex p-4 flex-col">
      <div className="font-Poppins font-bold text-3xl">{`Hallo, ${session?.user.pengguna?.username || "Pengguna"}`}</div>
      <div className="font-Poppins font-normal text-lg">
        Selamat Datang Di Dashabord Admin
      </div>
      {loading ? (
        <SkeletonLoading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="bg-white p-4 h-full w-full my-2 rounded-xl flex flex-col shadow-xl">
          <div className="flex flex-row pt-3 pb-5">
            <div className="bg-base-100 flex flex-col xl:flex-row xl:items-center justify-start  w-1/2">
              <FontAwesomeIcon icon={faList} className="w-6 h-6" />
              <span className="xl:ml-2 font-Poppins font-semibold text-3xl">
                Jumlah Pengaduan Masyarakat
              </span>
            </div>
            <div className="flex justify-end items-center xl:items-start w-1/2">
              <button
                onClick={handlePrint}
                className="bg-green-200 text-green-700 rounded-2xl w-36 h-10 hover:bg-green-100 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPrint} className="mx-1 w-4 h-4" />
                <span>Cetak CSV</span>
              </button>
            </div>
          </div>
          <div className="border" />
          <div className="flex w-full my-5 flex-col xl:flex-row">
            <div className="xl:w-1/2 flex justify-start items-center my-5">
              <label className="input input-bordered flex items-center gap-2 w-full md:w-auto xl:mx-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search Pelapor"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <div className="xl:w-1/2 flex flex-col xl:flex-row justify-end items-end xl:items-center">
              <select
                className="select select-bordered w-full max-w-xs xl:mx-2 my-4"
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                }}
              >
                <option disabled value="">
                  Pilih Tahun
                </option>
                {dataList.map((item) => (
                  <option key={item.tahun} value={item.tahun}>
                    {item.tahun}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered w-full max-w-xs xl:mx-2 my-4"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option disabled value="">
                  Pilih Bulan
                </option>
                {dataList
                  .filter((item) => item.tahun === selectedYear)
                  .flatMap((item) =>
                    item.bulan.map((bulanItem) => (
                      <option key={bulanItem.bulan} value={bulanItem.bulan}>
                        {bulanItem.bulan}
                      </option>
                    ))
                  )}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto rounded-t-lg">
            <table className="table rounded-t-lg">
              <thead className="bg-[#504A32] rounded-t-lg">
                <tr className="text-white rounded-t-lg">
                  <th>No</th>
                  <th>Tahun</th>
                  <th>Bulan</th>
                  <th>Pelapor</th>
                  <th>Jumlah Laporan</th>
                  {role === "super admin" && (
                    <th className="flex justify-center">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentDataList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No Data Rows
                    </td>
                  </tr>
                ) : (
                  currentDataList.map((item, index) => (
                    <tr key={index}>
                      <th>{indexOfFirstItem + index + 1}</th>
                      <td>{item.tahun}</td>
                      <td>{item.bulan}</td>
                      <td>{item.namaPelapor}</td>
                      <td>{item.jumlahLaporan}</td>
                      {role === "super admin" && (
                        <td className="flex justify-center">
                          <button
                            className="text-yellow-700 bg-yellow-200 w-48 h-8 rounded-2xl hover:bg-yellow-100 flex items-center justify-center"
                            onClick={() =>
                              handleOpenModal(
                                item.namaPelapor,
                                item.tahun,
                                item.bulan,
                                item.jumlahLaporan
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="mr-2 h-4 w-4"
                            />
                            <span>Tambah Sertifikat</span>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex my-5 xl:flex-row flex-col items-center">
            <div className="xl:w-1/2 justify-start items-center my-4">
              <span>
                Data page {currentPage} dari {totalPages}
              </span>
            </div>
            <div className="flex xl:w-1/2 justify-end items-center">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button className="join-item btn">{`Page ${currentPage}`}</button>
                <button
                  className="join-item btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <ModalTambahSertifikat
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitTambah}
            initialData={initialData}
          />
        </div>
      )}
    </div>
  );
};

export default dashboard;
