"use client";

import { AppDispatch } from "@/app/_store/store";
import axiosInstance from "@/app/_utils/interceptor";
import { useDispatch } from "react-redux";
import { fetchDataSertifikat } from "../_utils/data/dataSertifikat";
import { useState } from "react";

interface ModalHapusSertifikatProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData: { _id: string; nama_pelapor: string };
}

const ModalHapusSertifikat: React.FC<ModalHapusSertifikatProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hapusData = async () => {
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.delete(
        `/sertifikat/delete-sertifikat/${initialData._id}`,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status !== 200)
        throw new Error("Network response was not ok");
      dispatch(fetchDataSertifikat());
      onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Hapus Data</h2>
        <h4 className="text-dm font-normal mb-8">
          Apakah Anda Ingin Menghapus Data Petugas: {initialData.nama_pelapor} ?
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
            disabled={isSubmitting}
            onClick={hapusData}
            className={`${
              isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white font-semibold py-2 px-4 rounded`}
          >
            {isSubmitting ? "Processing..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHapusSertifikat;
