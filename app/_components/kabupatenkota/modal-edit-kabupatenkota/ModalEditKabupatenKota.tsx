// components/ModalEditKabupatenKota.tsx
"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/_store/store";
import axios from "axios";
import { fetchDataKK } from "@/app/_utils/data/dataSliceKK";

interface ModalEditKabupatenKotaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData: { _id: string; kabupatenkota: string };
}

const ModalEditKabupatenKota: React.FC<ModalEditKabupatenKotaProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    kabupatenkota: Yup.string().required("Kabupaten / Kota harus diisi"),
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Data</h2>
        <Formik
          initialValues={initialData}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            try {
              const response = await axios.put(
                "http://localhost:5000/api/kabupatenkota",
                values,
                { headers: { "Content-Type": "application/json" } }
              );

              if (response.status !== 200)
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
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Kabupaten / Kota:
                </label>
                <Field
                  type="text"
                  name="kabupatenkota"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default ModalEditKabupatenKota;