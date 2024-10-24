/* eslint-disable react-hooks/rules-of-hooks */
// components/ModalTambahPetugasPengaduan.tsx
"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/_store/store";
import { DataUser } from "@/app/_store/jenisPengaduanModel";
import EachUtils from "@/app/_utils/EachUtils/EachUtils";
import { fetchDataPengaduan } from "@/app/_utils/data/dataPengaduan";
import axiosInstance from "@/app/_utils/interceptor";

interface ModalTambahPetugasPengaduanProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData: {
    _id: string;
    status: string;
    petugas: string;
  };
  data: DataUser[];
  role: string;
}

const ModalTambahPetugasPengaduan: React.FC<
  ModalTambahPetugasPengaduanProps
> = ({ isOpen, onClose, initialData, data, role }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    status: Yup.string().required("Status harus diisi"),
    petugas: Yup.string().required("Petugas harus diisi"),
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Tambah Petugas</h2>
        <Formik
          initialValues={initialData}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            try {
              const response = await axiosInstance.put(
                "/pengaduan/petugas",
                values,
                { headers: { "Content-Type": "application/json" } }
              );

              if (response.status !== 200)
                throw new Error("Network response was not ok");
              dispatch(fetchDataPengaduan());
              onClose();
            } catch (error) {
              console.error("Error:", error);
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {() => (
            <Form>
              {role !== "petugas" && (
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Petugas:
                  </label>
                  <Field
                    as="select"
                    name="petugas"
                    className="select select-bordered block w-full rounded-md mt-1 border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Pilih Petugas
                    </option>
                    <EachUtils
                      of={data}
                      render={(item, index) => (
                        <option key={index} value={item.username}>
                          {item.username}
                        </option>
                      )}
                    />
                  </Field>
                  <ErrorMessage
                    name="petugas"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status Pengaduan
                </label>
                <Field
                  as="select"
                  name="status"
                  className="select select-bordered block w-full rounded-md mt-1 border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={"menunggu"}>Menunggu</option>
                  <option value={"ditindaklanjuti"}>Ditindaklanjuti</option>
                  <option value={"selesai"}>Selesai</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm"
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } text-white font-semibold py-2 px-4 rounded`}
                >
                  {isSubmitting ? "Processing..." : "Perbarui"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalTambahPetugasPengaduan;
