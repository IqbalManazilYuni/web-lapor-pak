"use client";

import localFont from "next/font/local";
import "./globals.css";
import SidebarComponent from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "./_store/store";
import { metadata } from "./_utils/metaData";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-Poppins",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-kecil.png" type="image/png" />
        <title>{String(metadata.title) || "Default Title"}</title>
        <meta
          name="description"
          content={metadata.description || "Default description"}
        />
      </head>
      <body className={`${Poppins.variable || ""} antialiased bg-slate-100`}>
        <ReduxProvider store={store}>
          <SessionProvider>
            <ToastContainer />
            {pathname !== "/" ? (
              <>
                <Topbar />
                <div className="flex h-screen pt-16">
                  <SidebarComponent />
                  <div className="flex-1 overflow-y-auto p-4 xl:ml-64">
                    {children}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-screen w-screen justify-center flex items-center">
                {children}
              </div>
            )}
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
