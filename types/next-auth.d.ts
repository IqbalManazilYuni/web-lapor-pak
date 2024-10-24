/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id?: string; // Add the id property
        name?: string | null;
        email?: string | null;
        image?: string | null;
        token?: string; // Add token if needed
        role?: string; // Add role
        expiry?: number; // Add expiry
        pengguna?: {
            _id: string;
            username: string;
            name: string;
            nomor_hp: string;
            addres: string; // Corrected spelling from 'addres' to 'address'
            role: string; // Role inside pengguna
            uri_profle: string;
        };
    }

    interface Session {
        user: User; // Reference to the User interface defined above
    }
}
