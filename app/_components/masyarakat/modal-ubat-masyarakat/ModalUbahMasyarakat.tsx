"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/_store/store";
import { fetchDataUser } from "@/app/_utils/data/dataUser";
import { toast } from "react-toastify";
import axiosInstance from "@/app/_utils/interceptor";

interface ModalUbahMasyarakatProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData: {
    _id: string;
  };
}

const ModalUbahMasyarakat: React.FC<ModalUbahMasyarakatProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;

  const initialValues = {
    _id: initialData._id,
    password: "",
    konfirmasiPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password harus diisi"),
    konfirmasiPassword: Yup.string().required(
      "Konfirmasi Password Harus Diisi"
    ),
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 m-2">
        <h2 className="text-lg font-semibold mb-4">
          Perbarui Password Masyarakat
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (values.password !== values.konfirmasiPassword) {
              toast.error("Password dan Konfirmasi Tidak sama");
              return;
            }

            setIsSubmitting(true);
            try {
              const response = await axiosInstance.put(
                "/pengguna/edit-password",
                values,
                { headers: { "Content-Type": "application/json" } }
              );
              if (response.status !== 200)
                throw new Error("Network response was not ok");
              if (response.data.code === 200)
                toast.success(response.data.message);
              dispatch(fetchDataUser());
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
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password Baru:
                </label>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                  value={values.password || ""}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Konfirmasi Password Baru:
                </label>
                <Field
                  type="password"
                  name="konfirmasiPassword"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                  value={values.konfirmasiPassword || ""}
                />
                <ErrorMessage
                  name="konfirmasiPassword"
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

export default ModalUbahMasyarakat;
