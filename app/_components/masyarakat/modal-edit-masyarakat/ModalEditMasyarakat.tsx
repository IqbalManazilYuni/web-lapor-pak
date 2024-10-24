// components/ModalEditMasyarakat.tsx
"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/_store/store";
import { fetchDataUser } from "@/app/_utils/data/dataUser";
import axiosInstance from "@/app/_utils/interceptor";
import { KabupatenKota } from "@/app/_store/jenisPengaduanModel";
import EachUtils from "@/app/_utils/EachUtils/EachUtils";

interface ModalEditMasyarakatProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData: {
    _id: string;
    addres: string;
    nomor_hp: string;
    username: string;
    name: string;
    role: string;
  };
  role?: string;
  data: KabupatenKota[];
}

const ModalEditMasyarakat: React.FC<ModalEditMasyarakatProps> = ({
  isOpen,
  onClose,
  initialData,
  role,
  data,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    addres: Yup.string().required("Kabupaten atau Kota harus diisi"),
    nomor_hp: Yup.string().required("Kontak Masyarakat harus diisi"),
    name: Yup.string().required("Nama Masyarakat harus diisi"),
    username: Yup.string().required("USername Masyarakat harus diisi"),
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[35rem]">
        <h2 className="text-lg font-semibold mb-4">Edit Data</h2>
        <Formik
          initialValues={initialData}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            try {
              const response = await axiosInstance.put(
                "/pengguna/edit-pengguna",
                values,
                { headers: { "Content-Type": "application/json" } }
              );

              if (response.status !== 200)
                throw new Error("Network response was not ok");
              dispatch(fetchDataUser());
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
              <div className="xl:grid xl:grid-cols-2 xl:gap-2 flex flex-col">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username Masyarakat:
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Masyarakat:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {role === "super admin" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Kabupaten Atau Kota Masyarakat:
                    </label>
                    <Field
                      as="select"
                      name="addres"
                      className="select select-bordered block w-full rounded-md mt-1 border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <EachUtils
                        of={data}
                        render={(item, index) => (
                          <option key={index} value={item.kabupatenkota}>
                            {item.kabupatenkota}
                          </option>
                        )}
                      />
                    </Field>
                    <ErrorMessage
                      name="addres"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Kontak Masyarakat:
                  </label>
                  <Field
                    type="text"
                    name="nomor_hp"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                  />
                  <ErrorMessage
                    name="nomor_hp"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
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

export default ModalEditMasyarakat;
