"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/_store/store";
import axios from "axios";
import { fetchDataKK } from "@/app/_utils/data/dataSliceKK";
import axiosInstance from "@/app/_utils/interceptor";

interface ModalTambahKabupatenKotaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalTambahKabupatenKota: React.FC<ModalTambahKabupatenKotaProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;

  const initialValues = { kabupatenkota: "" };

  const validationSchema = Yup.object({
    kabupatenkota: Yup.string().required("Kabupaten / Kota harus diisi"),
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
                "/kabupatenkota",
                values,
                { headers: { "Content-Type": "application/json" } }
              );
              if (response.status !== 201)
                throw new Error("Network response was not ok");

              dispatch(fetchDataKK());
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
                  Kabupaten / Kota:
                </label>
                <Field
                  type="text"
                  name="kabupatenkota"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={values.kabupatenkota || ""}
                />
                <ErrorMessage
                  name="kabupatenkota"
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

export default ModalTambahKabupatenKota;
