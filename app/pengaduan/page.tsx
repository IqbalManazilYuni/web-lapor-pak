/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import {
  faImage,
  faList,
  faMapMarkerAlt,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import EachUtils from "../_utils/EachUtils/EachUtils";
import SkeletonLoading from "../_components/skeletonloading/SkeletonLoading";
import { AppDispatch, RootState } from "../_store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataPengaduan } from "../_utils/data/dataPengaduan";
import { fetchDataUser } from "../_utils/data/dataUser";
import ModalTambahPetugasPengaduan from "../_components/pengaduan/ModalTambahPetugasPengaduan/ModalTambahPetugasPengaduan";
import ModalHapusPengaduan from "../_components/pengaduan/modal-hapus-pengaduan/ModalHapusPengaduan";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const pengaduan = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: dataList,
    loading,
    error,
  } = useSelector((state: RootState) => state.data2);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (error && error.includes("Token tidak valid, otorisasi gagal")) {
      router.push("/");
    }
  }, [error, router]);

  const { items: dataListUser } = useSelector(
    (state: RootState) => state.data3
  );
  const [dataListSearch, setDataListSearch] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isModalTambah, setIsModalTambah] = useState(false);
  const [currentIndexTambah, setCurrentIndexTambah] = useState<string | null>(
    null
  );
  const [currentKotaTambah, setCurrentKotaTambah] = useState<string | null>(
    null
  );
  const [currentDeleteIndex, setCurrentDeleteIndex] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenTambahPetugas = (id: string) => {
    const item = dataList.find((item) => item._id === id);
    if (item) {
      setIsModalTambah(true);
      setCurrentIndexTambah(id);
      setCurrentKotaTambah(item.kabupatenkota);
    }
  };

  const handleSubmitDelete = () => {
    handleCloseDeleteModal();
  };

  const handleOpenDeleteModal = (id: string) => {
    const item = dataList.find((item) => item._id === id);
    if (item) {
      setCurrentDeleteIndex(id);
      setIsDeleteModalOpen(true);
    }
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCloseTambahPetugas = () => {
    setIsModalTambah(false);
  };

  const handleSubmitTambahPetugas = () => {
    handleCloseTambahPetugas();
    setCurrentIndexTambah(null);
    setCurrentKotaTambah(null);
  };

  const filteredUserData = dataListUser.filter((user) =>
    user.addres?.toLowerCase().includes(currentKotaTambah?.toLowerCase() || "")
  );

  useEffect(() => {
    dispatch(fetchDataPengaduan());
    dispatch(fetchDataUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      let filteredData = [...dataList];
      if (session.user?.role === "admin") {
        filteredData = filteredData.filter(
          (item) => item.kabupatenkota === session?.user?.pengguna?.addres
        );
      } else if (session.user?.role === "petugas") {
        filteredData = filteredData.filter(
          (item) =>
            item.kabupatenkota === session?.user?.pengguna?.addres &&
            item.petugas === session?.user?.pengguna?.username
        );
      } else if (session.user?.role === "super admin") {
        setDataListSearch(dataList);
      }
      setDataListSearch(filteredData);
    }
  }, [session, status, dataList]);

  const handleSearch = (text: string) => {
    const searchText = text.toLowerCase();

    if (searchText === "") {
      setDataListSearch(dataList);
    } else {
      const filterData = dataList.filter((item) =>
        item.judul.toLowerCase().includes(searchText)
      );
      setDataListSearch(filterData);
      setCurrentPage(1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDataList = dataListSearch.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(dataListSearch.length / itemsPerPage);

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

  const handleOpenMaps = (id: string) => {
    const data = currentDataList.filter((item) => item._id === id);
    const { latitude, longitude } = JSON.parse(data[0].lokasi);
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url);
  };

  const handleOpenImage = (id: string) => {
    const data = currentDataList.filter((item) => item._id === id);
    const uri = data[0].uri_foto;
    window.open(uri);
  };

  return (
    <div className="flex p-4 flex-col">
      <div className="font-Poppins font-bold text-3xl">Data Pengaduan</div>
      <div className="font-Poppins font-normal text-lg mb-10">
        Data Pengaduan
      </div>
      {loading ? (
        <SkeletonLoading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="bg-white p-4 h-full w-full my-2 rounded-xl flex flex-col shadow-xl">
          <div className="flex flex-row pt-3 pb-5">
            <div className="bg-base-100 w-1/2 flex flex-col xl:flex-row xl:items-center justify-start">
              <FontAwesomeIcon icon={faList} className="w-6 h-6" />
              <span className="xl:ml-2 font-Poppins font-semibold text-3xl">
                List Data Pengaduan
              </span>
            </div>
          </div>
          <div className="border" />
          <div className="flex justify-end items-center my-5">
            <label className="input input-bordered flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                className="grow"
                placeholder="Search Judul Pengaduan"
                onChange={(e) => handleSearch(e.target.value)}
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
          <div className="overflow-x-auto rounded-t-lg">
            <table className="table rounded-t-lg">
              <thead className="bg-[#504A32] rounded-t-lg">
                <tr className="text-white rounded-t-lg">
                  <th>No</th>
                  <th>Tanggal Pelaporan</th>
                  <th>Judul Pelaporan</th>
                  <th>Nama Pelapor</th>
                  <th>Kota Pelaporan</th>
                  <th>Jenis Pengaduan</th>
                  <th>Petugas</th>
                  <th>Status Pengaduan</th>
                  <th className="flex justify-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentDataList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      No Data Rows
                    </td>
                  </tr>
                ) : (
                  <EachUtils
                    of={currentDataList}
                    render={(item, index) => (
                      <tr key={item._id}>
                        <th>{indexOfFirstItem + index + 1}</th>
                        <td>{item.tanggal}</td>
                        <td>{item.judul}</td>
                        <td>{item.nama_pelapor}</td>
                        <td>{item.kabupatenkota}</td>
                        <td>{item.jenis_pengaduan}</td>
                        <td>{item.petugas}</td>
                        <td>
                          <div
                            className={`text-white rounded-xl items-center flex justify-center ${
                              item.status === "menunggu"
                                ? "bg-red-600"
                                : item.status === "ditindaklanjuti"
                                ? "bg-amber-950"
                                : "bg-green-500"
                            }`}
                          >
                            {item.status === "menunggu"
                              ? "Menunggu"
                              : item.status === "ditindaklanjuti"
                              ? "Ditindaklanjuti"
                              : "Selesai"}
                          </div>
                        </td>
                        <td className="xl:grid xl:grid-cols-2 xl:gap-1 justify-center items-center">
                          <button
                            className="bg-blue-100 w-16 h-8 rounded-2xl hover:bg-blue-200 flex items-center justify-center my-2 xl:my-0"
                            onClick={() => handleOpenImage(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faImage}
                              className="w-4 h-4 text-blue-600"
                            />
                          </button>

                          <button
                            className="bg-blue-100 w-16 h-8 rounded-2xl hover:bg-blue-200 flex items-center justify-center my-2 xl:my-0"
                            onClick={() => handleOpenMaps(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className="w-4 h-4 text-blue-600"
                            />
                          </button>

                          <button
                            className="bg-green-100 w-16 h-8 rounded-2xl hover:bg-green-200 flex items-center justify-center my-2 xl:my-0"
                            onClick={() => handleOpenTambahPetugas(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faUser} // User icon
                              className="w-4 h-4 text-green-600"
                            />
                          </button>
                          {session.user?.role !== "petugas" && (
                            <button
                              className="bg-red-100 w-16 h-8 rounded-2xl hover:bg-red-200 flex items-center justify-center my-2 xl:my-0"
                              onClick={() => handleOpenDeleteModal(item._id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="w-4 h-4 text-red-600"
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    )}
                  />
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
          {currentIndexTambah !== null && currentKotaTambah !== null && (
            <ModalTambahPetugasPengaduan
              isOpen={isModalTambah}
              onClose={handleCloseTambahPetugas}
              onSubmit={handleSubmitTambahPetugas}
              data={filteredUserData}
              initialData={
                dataList.find((item) => item._id === currentIndexTambah)!
              }
            />
          )}
          {currentDeleteIndex !== null && (
            <ModalHapusPengaduan
              isOpen={isDeleteModalOpen}
              onClose={handleCloseDeleteModal}
              onSubmit={handleSubmitDelete}
              initialData={
                dataList.find((item) => item._id === currentDeleteIndex)!
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default pengaduan;
