// types/next-auth.d.ts

declare module "next-auth" {
    interface User {
        token: string; // Token type
        role: string; // User role
        expiry: number; // Expiry timestamp
        pengguna: {
            _id: string;
            username: string;
            name: string;
            nomor_hp: string;
            addres: string;
            role: string; // This role might be redundant since you already have it at the top level
            uri_profle: string; // Profile URI
        };
    }

    interface Session {
        user: User; // Include the User type defined above
    }
}
