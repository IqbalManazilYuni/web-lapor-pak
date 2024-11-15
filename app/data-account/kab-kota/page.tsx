/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ModalEditAdminkabkota from "@/app/_components/adminkabkota/modal-edit-adminkabkota/ModalEditAdminkabkota";
import ModalHapusAdminkabkota from "@/app/_components/adminkabkota/modal-hapus-adminkabkota/ModalHapusAdminkabkota";
import ModalUbahAdminkabkota from "@/app/_components/adminkabkota/modal-perbarui-adminkabkota/ModalPerbaruiAdminkabkota";
import ModalTambahAdminkabkota from "@/app/_components/adminkabkota/modal-tambah-adminkabkota/ModalTambahAdminkabkota";
import SkeletonLoading from "@/app/_components/skeletonloading/SkeletonLoading";
import { AppDispatch, RootState } from "@/app/_store/store";
import { fetchDataKK } from "@/app/_utils/data/dataSliceKK";
import { fetchDataUser } from "@/app/_utils/data/dataUser";
import EachUtils from "@/app/_utils/EachUtils/EachUtils";
import {
  faEdit,
  faList,
  faRepeat,
  faSquarePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const kabKota = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: dataList,
    loading,
    error,
  } = useSelector((state: RootState) => state.data3);
  const { items: dataListKK } = useSelector((state: RootState) => state.data1);

  const [dataListSearch, setDataListSearch] = useState(dataList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUbahModalOpen, setIsUbahModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<string | null>(null);
  const [currentUbahIndex, setCurrentUbahIndex] = useState<string | null>(null);
  const [currentDeleteIndex, setCurrentDeleteIndex] = useState<string | null>(
    null
  );

  const handleSubmitTambah = () => {
    handleCloseModal();
  };

  const handleUbahTambah = () => {
    handleCloseUbahModal();
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenUbahModal = (id: string) => {
    const item = dataList.find((item) => item._id === id);
    if (item) {
      setCurrentUbahIndex(id);
      setIsUbahModalOpen(true);
    }
  };
  const handleCloseUbahModal = () => {
    setIsUbahModalOpen(false);
    setCurrentEditIndex(null);
  };

  const handleOpenEditModal = (id: string) => {
    const item = dataList.find((item) => item._id === id);
    if (item) {
      setCurrentEditIndex(id);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEditIndex(null);
  };

  const handleSubmitEdit = () => {
    handleCloseEditModal();
  };

  const handleSubmitDelete = () => {
    handleCloseDeleteModal();
  };

  useEffect(() => {
    dispatch(fetchDataUser());
    dispatch(fetchDataKK());
  }, [dispatch]);

  useEffect(() => {
    const data = dataList.filter((item) => item.role === "admin");
    setDataListSearch(data);
  }, [dataList]);

  const handleSearch = (text: string) => {
    const searchText = text.toLowerCase();

    if (searchText === "") {
      const filteredData = dataList.filter((item) => item.role === "admin");
      setDataListSearch(filteredData);
    } else {
      const filterData = dataList
        .filter((item) => item.role === "admin")
        .filter((item) => item.username.toLowerCase().includes(searchText));
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

  const router = useRouter();
  useEffect(() => {
    if (error && error.includes("Token tidak valid, otorisasi gagal")) {
      router.push("/");
    }
  }, [error, router]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  
  return (
    <div className="flex p-4 flex-col">
      <div className="font-Poppins font-bold text-3xl">Data Account</div>
      <div className="font-Poppins font-normal text-lg mb-10">Data Admin</div>
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
                List Data Admin
              </span>
            </div>
            <div className="flex justify-end items-center xl:items-start w-1/2">
              <button
                onClick={handleOpenModal}
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
                  <th>Username Admin</th>
                  <th>Nama Admin</th>
                  <th>Kota Admin</th>
                  <th>Contact Admin</th>
                  <th className="flex justify-center">Action</th>
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
                  <EachUtils
                    of={currentDataList}
                    render={(item, index) => (
                      <tr key={item._id}>
                        <th>{indexOfFirstItem + index + 1}</th>
                        <td>{item.username}</td>
                        <td>{item.name}</td>
                        <td>{item.addres}</td>
                        <td>{item.nomor_hp}</td>
                        <td className="xl:space-x-2 flex flex-col xl:flex-row justify-center items-center">
                          <button
                            className="text-green-700 bg-green-200 w-24 h-8 rounded-2xl hover:bg-green-100 flex items-center justify-center my-2 xl:my-0"
                            onClick={() => handleOpenEditModal(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="mx-1 w-3 h-3"
                            />
                            <span>Edit</span>
                          </button>
                          <button
                            className="text-blue-700 bg-blue-200 w-24 h-8 rounded-2xl hover:bg-blue-100 flex items-center justify-center my-2 xl:my-0"
                            onClick={() => handleOpenUbahModal(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faRepeat}
                              className="mx-1 w-3 h-3"
                            />
                            <span>Password</span>
                          </button>
                          <button
                            className="text-red-700 bg-red-200 w-24 h-8 rounded-2xl hover:bg-red-100 flex items-center justify-center my-2 xl:my-0"
                            onClick={() => handleOpenDeleteModal(item._id)}
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
          <ModalTambahAdminkabkota
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitTambah}
            data={dataListKK}
          />
          {currentUbahIndex !== null && (
            <ModalUbahAdminkabkota
              isOpen={isUbahModalOpen}
              onClose={handleCloseUbahModal}
              onSubmit={handleUbahTambah}
              initialData={
                dataList.find((item) => item._id === currentUbahIndex)!
              }
            />
          )}

          {currentDeleteIndex !== null && (
            <ModalHapusAdminkabkota
              isOpen={isDeleteModalOpen}
              onClose={handleCloseDeleteModal}
              onSubmit={handleSubmitDelete}
              initialData={
                dataList.find((item) => item._id === currentDeleteIndex)!
              }
            />
          )}

          {currentEditIndex !== null && (
            <ModalEditAdminkabkota
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              onSubmit={handleSubmitEdit}
              data={dataListKK}
              initialData={
                dataList.find((item) => item._id === currentEditIndex)!
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default kabKota;
