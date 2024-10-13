"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ModalTambahJenisProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { jenisPengaduan: string }) => void;
  initialValues?: { jenisPengaduan: string };
}

const ModalTambahJenis: React.FC<ModalTambahJenisProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
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
          onSubmit={(values) => {
            onSubmit(values);
            console.log(values);
            onClose();
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
                  value={values.jenisPengaduan || ''} // Ensure it's controlled
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
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Tambah
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
