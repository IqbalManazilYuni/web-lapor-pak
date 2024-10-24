// types/next-auth.d.ts

declare module "next-auth" {
    interface User {
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
            addres: string;
            role: string; // Role inside pengguna
            uri_profle: string;
        };
    }

    interface Session {
        user: User; // Reference to the User interface defined above
    }
}
