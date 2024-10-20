"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Define types for form values
interface LoginFormValues {
  email: string;
  password: string;
}

const HomePage: React.FC = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Format Email Tidak Benar")
      .required("Email Diperlukan"),
    password: Yup.string()
      .required("Password Diperlukan"),
  });

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
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
                    <label htmlFor="email" className="text-lg font-Poppins">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="p-2 border border-gray-300 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="email"
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
                    onClick={()=>router.push("/dashboard")}
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
