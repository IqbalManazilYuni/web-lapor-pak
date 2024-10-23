/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./_store/store";
import { setCookie } from "nookies";
import { setToken } from "./_utils/data/dataAuth";

// Define types for form values
interface LoginFormValues {
  username: string;
  password: string;
}

const HomePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = Yup.object({
    username: Yup.string().required("Username Diperlukan"),
    password: Yup.string().required("Password Diperlukan"),
  });

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post("/api/auth/login", values);
      const token = response.data.token;

      // Store token in Redux
      dispatch(setToken(token));

      // Save token in cookies
      setCookie(null, "token", token, { path: "/" });

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
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
          <div className="lg:w-1/2  ">
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
                      type="username"
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
                    className="p-2 bg-green-500 text-white rounded-md w-full"
                    onClick={() => router.push("/dashboard")}
                  >
                    Login
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
