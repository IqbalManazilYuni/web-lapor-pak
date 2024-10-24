/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import React, { ChangeEvent, useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/app/_utils/interceptor";

interface ModalTambahSertifikatProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData: {
    namaPelapor: string;
    bulan: string;
    tahun: string;
    jumlahLaporan: string;
  };
}

const ModalTambahSertifikat: React.FC<ModalTambahSertifikatProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  if (!isOpen) return null;
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("namaPelapor", values.namaPelapor);
      formData.append("tahun", values.tahun);
      formData.append("bulan", values.bulan);
      formData.append("jumlahLaporan", values.jumlahLaporan);
      if (selectedFile) formData.append("file", selectedFile);

      const response = await axiosInstance.post(
        "/sertifikat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      toast.error("Terjadi Kesalahan Saat Inputan");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Tambah Sertifikat</h2>
        <Formik initialValues={initialData} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sertifikat Pelapor (maks file 3mb*):
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 bg-red-300 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded"
                >
                  Tutup
                </button>
                {selectedFile !== null && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting
                        ? "bg-gray-400"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white font-semibold py-2 px-4 rounded`}
                  >
                    {isSubmitting ? "Processing..." : "Tambah"}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalTambahSertifikat;
