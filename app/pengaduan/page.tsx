/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import {
  faEdit,
  faList,
  faSquarePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import EachUtils from "../_utils/EachUtils/EachUtils";
import SkeletonLoading from "../_components/skeletonloading/SkeletonLoading";
import { AppDispatch, RootState } from "../_store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataPengaduan } from "../_utils/data/dataPengaduan";

const pengaduan = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Redux state
  const {
    items: dataList,
    loading,
    error,
  } = useSelector((state: RootState) => state.data2);

  const [dataListSearch, setDataListSearch] = useState(dataList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  // const [currentEditIndex, setCurrentEditIndex] = useState<string | null>(null);
  // const [currentDeleteIndex, setCurrentDeleteIndex] = useState<string | null>(
  //   null
  // );

  useEffect(() => {
    dispatch(fetchDataPengaduan());
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

  return (
    <div className="flex p-4 flex-col">
      <div className="font-Poppins font-bold text-3xl">Data Master</div>
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
            <div className="flex justify-end items-center xl:items-start w-1/2">
              <button
                // onClick={handleOpenModal}
                className="bg-blue-200 text-blue-700 rounded-2xl w-36 h-10 hover:bg-blue-100 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faSquarePlus} className="mx-1 w-4 h-4" />
                <span>Tambah Data</span>
              </button>
            </div>
          </div>
          <div className="border" />
          <div className="flex justify-end items-center my-5">
            <label className="input input-bordered flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                className="grow"
                placeholder="Search"
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
          <div className="overflow-hidden rounded-t-lg">
            <table className="table rounded-t-lg">
              <thead className="bg-[#504A32] rounded-t-lg">
                <tr className="text-white rounded-t-lg">
                  <th>No</th>
                  <th>Tanggal Pelaporan</th>
                  <th>Judul Pelaporan</th>
                  <th>Kota Pelaporan</th>
                  <th>Jenis Pengaduan</th>
                  <th>Petugas Pengaduan</th>
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
                        <td>{item.kabupatenkota}</td>
                        <td>{item.jenis_pengaduan}</td>
                        <td>{item.petugas}</td>
                        <td>{item.status}</td>
                        <td className="xl:space-x-2 flex flex-col xl:flex-row justify-center items-center">
                          <button
                            className="text-green-700 bg-green-200 w-24 h-8 rounded-2xl hover:bg-green-100 flex items-center justify-center"
                            // onClick={() => handleOpenEditModal(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="mx-1 w-3 h-3"
                            />
                            <span>Edit</span>
                          </button>

                          <button
                            className="text-red-700 bg-red-200 w-24 h-8 rounded-2xl hover:bg-red-100 flex items-center justify-center"
                            // onClick={() => handleOpenDeleteModal(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="mx-1 w-3 h-3"
                            />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    )}
                  />
                )}
              </tbody>
            </table>
          </div>
          <div className="flex my-5 flex-row">
            <div className="w-1/2 justify-start items-center">
              <span>
                Data page {currentPage} dari {totalPages}
              </span>
            </div>
            <div className="flex w-1/2 justify-end items-center">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button className="join-item btn">
                  {`Page ${currentPage}`}
                </button>
                <button
                  className="join-item btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default pengaduan;
