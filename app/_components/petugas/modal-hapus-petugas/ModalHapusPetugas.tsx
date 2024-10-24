"use client";

import { AppDispatch } from "@/app/_store/store";
import { fetchDataUser } from "@/app/_utils/data/dataUser";
import axiosInstance from "@/app/_utils/interceptor";
import axios from "axios";
import { useDispatch } from "react-redux";

interface ModalHapusPetugasProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData: { _id: string; username: string };
}

const ModalHapusPetugas: React.FC<ModalHapusPetugasProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const hapusData = async () => {
    try {
      const response = await axiosInstance.delete(
        `/pengguna/delete-pengguna/${initialData._id}`,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      if (response.status !== 200)
        throw new Error("Network response was not ok");
      dispatch(fetchDataUser());
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Hapus Data</h2>
        <h4 className="text-dm font-normal mb-8">
          Apakah Anda Ingin Menghapus Data Petugas:{" "}
          {initialData.username} ?
        </h4>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 bg-red-300 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded"
          >
            Tidak
          </button>
          <button
            type="button"
            onClick={hapusData}
            className="mr-2 bg-green-300 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHapusPetugas;
