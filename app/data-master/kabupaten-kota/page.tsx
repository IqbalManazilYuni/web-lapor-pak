import EachUtils from "@/app/_utils/EachUtils/EachUtils";
import React from "react";
import DataKabKota from "../../seed/DataKabKota.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faEdit,
  faList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const kabupatenKota = () => {
  return (
    <div className="flex p-4 flex-col">
      <div className="font-Poppins font-bold text-3xl">Data Master</div>
      <div className="font-Poppins font-normal text-lg mb-10">
        Data Kabupaten / Kota
      </div>
      <div className="bg-white p-4 h-full w-full my-2 rounded-xl flex flex-col shadow-xl">
        <div className="flex flex-row pt-3 pb-5">
          <div className="bg-base-100 w-1/2 flex flex-col xl:flex-row xl:items-center justify-start">
            <FontAwesomeIcon icon={faList} className="w-6 h-6" />
            <span className="xl:ml-2 font-Poppins font-semibold text-3xl">
              List Data Kabupaten / Kota
            </span>
          </div>
          <div className="flex justify-end items-center xl:items-start w-1/2">
            <button className="bg-blue-200 text-blue-700 rounded-2xl w-36 h-10 hover:bg-blue-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faSquarePlus} className="mx-1 w-4 h-4" />
              <span>Tambah Data</span>
            </button>
          </div>
        </div>
        <div className="border" />
        <div className="flex justify-end items-center my-5">
          <label className="input input-bordered flex items-center gap-2 w-full md:w-auto">
            <input type="text" className="grow" placeholder="Search" />
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
        <div className="overflow-x-auto">
          <table className="table rounded-t-lg">
            {/* head */}
            <thead className="bg-[#504A32] rounded-t-lg">
              <tr className="text-white">
                <th className="rounded-tl-lg">No</th>
                <th>Nama Kabupaten atau Kota</th>
                <th className="rounded-tr-lg flex justify-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <EachUtils
                of={DataKabKota}
                render={(item, index) => (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item["nama-kab-kota"]}</td>
                    <td className="xl:space-x-2 flex flex-col xl:flex-row justify-center items-center">
                      <button className="text-green-700 bg-green-200 w-24 h-8 rounded-2xl hover:bg-green-100 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="mx-1 w-3 h-3"
                        />
                        <span>Edit</span>
                      </button>
                      <button className="text-red-700 bg-red-200 w-24 h-8 rounded-2xl hover:bg-red-100 flex items-center justify-center">
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
            </tbody>
          </table>
        </div>
        <div className="flex my-5 flex-row">
          <div className="w-1/2 justify-start items-center">
            <span>Data 1 dari 20</span>
          </div>
          <div className="flex w-1/2 justify-end items-center">
            <div className="join">
              <button className="join-item btn">«</button>
              <button className="join-item btn">Page 22</button>
              <button className="join-item btn">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default kabupatenKota;
