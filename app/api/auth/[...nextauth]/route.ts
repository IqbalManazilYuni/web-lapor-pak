// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import type { NextAuthOptions } from 'next-auth'; // Importing NextAuthOptions for type safety

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post('http://localhost:5000/api/pengguna/login/web', {
                        username: credentials?.username,
                        password: credentials?.password,
                    });
                    if (res.data.status === 'success') {
                        return res.data;
                    }
                    return null;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.response) {
                            console.log("Error status:", error.response.status);
                            console.log("Error data:", error.response.data);
                            throw new Error(error.response.data.message);
                        } else if (error.request) {
                            console.log("Error request:", error.request);
                        } else {
                            console.log("Error message:", error.message);
                        }
                    } else {
                        console.log("General error:", error);
                    }
                    throw new Error('Kesalahan Saat Login');
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.token = user.token;
                token.role = user.pengguna.role;
                token.expiry = user.expiry;
                token.pengguna = user.pengguna;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...token,
            };
            return session;
        },
    },
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
