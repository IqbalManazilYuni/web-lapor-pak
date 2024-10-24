"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/_store/store";
import axios from "axios";
import { fetchDataUser } from "@/app/_utils/data/dataUser";
import axiosInstance from "@/app/_utils/interceptor";

interface ModalTambahMasyarakatProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalTambahMasyarakat: React.FC<ModalTambahMasyarakatProps> = ({
  isOpen,
  onClose,
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
    role: "masyarakat",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password harus diisi"),
    addres: Yup.string().required("Alamat Masyarakat harus diisi"),
    nomor_hp: Yup.string().required("Kontak Masyarakat harus diisi"),
    name: Yup.string().required("Nama Masyarakat harus diisi"),
    username: Yup.string().required("USername Masyarakat harus diisi"),
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
          {({ values }) => (
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
                    Password Masyarakat:
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
                    Nama Masyarakat:
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
                    Alamat Masyarakat:
                  </label>
                  <Field
                    type="addres"
                    name="addres"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                    value={values.addres || ""}
                  />
                  <ErrorMessage
                    name="addres"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Kontak Masyarakat:
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

export default ModalTambahMasyarakat;
