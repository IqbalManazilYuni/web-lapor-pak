"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/_store/store";
import { KabupatenKota } from "@/app/_store/jenisPengaduanModel";
import EachUtils from "@/app/_utils/EachUtils/EachUtils";
import { fetchDataUser } from "@/app/_utils/data/dataUser";
import axiosInstance from "@/app/_utils/interceptor";

interface ModalTambahAdminkabkotaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  data: KabupatenKota[];
}

const ModalTambahAdminkabkota: React.FC<ModalTambahAdminkabkotaProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;

  const initialValues = {
    addres: "",
    nomor_hp: "",
    name: "",
    username: "",
    password: "",
    role:"admin",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password harus diisi"),
    addres: Yup.string().required("Kabupaten atau Kota harus diisi"),
    nomor_hp: Yup.number().required("Kontak Admin harus diisi"),
    name: Yup.string().required("Nama Admin harus diisi"),
    username: Yup.string().required("USername Admin harus diisi"),
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[35rem] m-2">
        <h2 className="text-lg font-semibold mb-4">Tambah Data</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            try {
              const response = await axiosInstance.post(
                "/pengguna/register",
                values,
                { headers: { "Content-Type": "application/json" } }
              );
              if (response.status !== 201)
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
          {({ values, handleChange }) => (
            <Form>
              <div className="xl:grid xl:grid-cols-2 xl:gap-2 flex flex-col">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username Admin:
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                    value={values.username || ""}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password Admin:
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
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Admin:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                    value={values.name || ""}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Kabupaten Atau Kota Admin:
                  </label>
                  <Field
                    as="select"
                    name="addres"
                    value={values.addres}
                    onChange={handleChange}
                    className="select select-bordered block w-full rounded-md mt-1 border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Pilih Kabupaten / Kota
                    </option>
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

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Kontak Admin:
                  </label>
                  <Field
                    type="text"
                    name="nomor_hp"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                    value={values.nomor_hp || ""}
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

export default ModalTambahAdminkabkota;
