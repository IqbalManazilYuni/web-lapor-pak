/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        token?: string;
        role?: string;
        expiry?: number;
        pengguna?: {
            _id: string;
            username: string;
            name: string;
            nomor_hp: string;
            addres: string;
            role: string;
            uri_profle: string;
        };
    }

    interface Session {
        user: User;
    }
}
