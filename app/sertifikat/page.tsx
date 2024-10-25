/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  faImage,
  faList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import EachUtils from "../_utils/EachUtils/EachUtils";
import SkeletonLoading from "../_components/skeletonloading/SkeletonLoading";
import { AppDispatch, RootState } from "../_store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataSertifikat } from "../_utils/data/dataSertifikat";
import { useRouter } from "next/navigation";
const sertifikat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: dataList,
    loading,
    error,
  } = useSelector((state: RootState) => state.data5);

  const [dataListSearch, setDataListSearch] = useState(dataList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // const [currentDeleteIndex, setCurrentDeleteIndex] = useState<string | null>(
  //   null
  // );
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const handleSubmitDelete = () => {
  //   handleCloseDeleteModal();
  // };

  // const handleOpenDeleteModal = (id: string) => {
  //   const item = dataList.find((item) => item._id === id);
  //   if (item) {
  //     setCurrentDeleteIndex(id);
  //     setIsDeleteModalOpen(true);
  //   }
  // };
  // const handleCloseDeleteModal = () => {
  //   setIsDeleteModalOpen(false);
  // };

  useEffect(() => {
    dispatch(fetchDataSertifikat());
  }, [dispatch]);

  useEffect(() => {
    setDataListSearch(dataList);
  }, [dataList]);

  const handleSearch = (text: string) => {
    const searchText = text.toLowerCase();

    if (searchText === "") {
      setDataListSearch(dataList);
    } else {
      const filterData = dataList.filter((item) =>
        item.nama_pelapor.toLowerCase().includes(searchText)
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

  const handleOpenImage = (id: string) => {
    const data = currentDataList.find((item) => item._id === id);
    
    if (data) {
      const uri = data.uri_pdf.startsWith("http")
        ? data.uri_pdf
        : `https://${data.uri_pdf}`; // Pastikan URL absolut
      window.open(uri, "_blank");
    } else {
      console.error("Data not found");
    }
  };
  

  const router = useRouter();
  useEffect(() => {
    if (error && error.includes("Token tidak valid, otorisasi gagal")) {
      router.push("/");
    }
  }, [error, router]);

  return (
    <div className="flex p-4 flex-col">
      <div className="font-Poppins font-bold text-3xl">Data Sertifikat</div>
      <div className="font-Poppins font-normal text-lg mb-10">
        Data Sertifikat
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
                List Data Sertifikat
              </span>
            </div>
          </div>
          <div className="border" />
          <div className="flex justify-end items-center my-5">
            <label className="input input-bordered flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                className="grow"
                placeholder="Search Username"
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
                  <th>Username Pelapor</th>
                  <th>Tahun Sertifikat</th>
                  <th>Bulan Sertifikat</th>
                  <th>Jumlah Laporan</th>
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
                        <td>{item.nama_pelapor}</td>
                        <td>{item.tahun}</td>
                        <td>{item.bulan}</td>
                        <td>{item.jumlahLaporan}</td>
                        <td className="xl:space-x-2 flex flex-col xl:flex-row justify-center items-center">
                          <button
                            className="bg-blue-100  w-24 h-8 rounded-2xl hover:bg-blue-200 flex items-center justify-center my-2 xl:my-0"
                            onClick={() => handleOpenImage(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faImage}
                              className="mx-1 w-3 h-3 text-blue-600"
                            />
                          </button>
                          <button
                            className="bg-red-100  w-24 h-8 rounded-2xl hover:bg-red-200 flex items-center justify-center my-2 xl:my-0"
                            // onClick={() => handleOpenDeleteModal(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash} // Trash icon
                              className="mx-1 w-3 h-3 text-red-600"
                            />
                          </button>
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
          {/* {currentIndexTambah !== null && currentKotaTambah !== null && (
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
          )} */}
        </div>
      )}
    </div>
  );
};

export default sertifikat;
