/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signIn } from "next-auth/react";
import { setUser } from "./_utils/data/dataAuth";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const encryptPassword = (password: string) => {
    const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
    return encrypted;
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username Diperlukan"),
    password: Yup.string().required("Password Diperlukan"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      setIsSubmitting(true);
      const encryptedPassword = encryptPassword(values.password);
      const result = await signIn("credentials", {
        username: values.username,
        password: encryptedPassword,
        redirect: false,
      });

      if (result?.ok) {
        const { data } = await axios.get("/api/auth/session");
        dispatch(setUser(data.user));
        router.push("/dashboard");
        toast.success("Login Berhasil");
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        toast.error(result?.error);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error during login:", error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <div className="items-center justify-center flex h-full w-full">
      <div className="h-[30rem] w-10/12 lg:w-1/2 p-5 lg:pt-10 bg-white shadow-xl rounded-md flex flex-col items-center">
        <h1 className="font-Poppins font-semibold text-2xl text-black text-center">
          Login
        </h1>
        <div className="w-11/12 lg:flex lg:flex-row lg:my-16">
          <div className="items-center justify-center flex lg:w-1/2">
            <img src="/logo.png" alt="Login" className="mb-4" />
          </div>
          <div className="lg:w-1/2">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="w-full flex flex-col items-center space-y-4">
                  <div className="w-full flex flex-col">
                    <label htmlFor="username" className="text-lg font-Poppins">
                      Username
                    </label>
                    <Field
                      name="username"
                      type="text"
                      className="p-2 border border-gray-300 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="w-full flex flex-col">
                    <label htmlFor="password" className="text-lg font-Poppins">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="p-2 border border-gray-300 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting
                        ? "bg-gray-400"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white font-semibold  rounded-md w-full py-2 px-4`}
                  >
                    {isSubmitting ? "Processing..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
