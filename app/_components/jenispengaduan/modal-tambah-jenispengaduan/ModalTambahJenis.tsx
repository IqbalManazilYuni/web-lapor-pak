"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchData } from "@/app/_utils/data/dataSlice";
import { AppDispatch } from "@/app/_store/store";
import axiosInstance from "@/app/_utils/interceptor";

interface ModalTambahJenisProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalTambahJenis: React.FC<ModalTambahJenisProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;

  const initialValues = { jenisPengaduan: "" };

  const validationSchema = Yup.object({
    jenisPengaduan: Yup.string().required("Jenis Pengaduan harus diisi"),
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Tambah Data</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            try {
              const response = await axiosInstance.post(
                "/jenispengaduan",
                values,
                { headers: { "Content-Type": "application/json" } }
              );
              if (response.status !== 201)
                throw new Error("Network response was not ok");

              dispatch(fetchData());
              onClose();
            } catch (error) {
              console.error("Error:", error);
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {({ values }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Jenis Pengaduan:
                </label>
                <Field
                  type="text"
                  name="jenisPengaduan"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={values.jenisPengaduan || ""}
                />
                <ErrorMessage
                  name="jenisPengaduan"
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
                      : "bg-green-500 hover:bg-green-600"
                  } text-white font-semibold py-2 px-4 rounded`}
                >
                  {isSubmitting ? "Processing..." : "Tambah"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalTambahJenis;
