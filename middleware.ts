// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    const role = token.role;
    console.log("ayam",role);
    
    const expiry = token.expiry;
    const currentTime = new Date().getTime();
    console.log(expiry);
    
    const currentDate = new Date(currentTime);
    const expiryDate = new Date(expiry * 1000);
    if (currentDate > expiryDate) {
        const response = NextResponse.redirect(new URL('/', req.url));
        response.cookies.set('next-auth.session-token', '', { path: '/' });
        response.cookies.set('next-auth.csrf-token', '', { path: '/' });
        response.cookies.set('next-auth.callback-url', '', { path: '/' });
        return response;
    }

    const path = req.nextUrl.pathname;
    const superAdminRoutes = [
        '/data-master/jenis-pengaduan',
        '/dashboard',
        '/data-master/kabupaten-kota',
        '/data-account/kab-kota',
        '/data-account/masyarakat',
        '/data-account/petugas',
        '/pengaduan',
        '/sertifikat',
    ];
    const adminRoutes = [
        '/dashboard',
        '/data-account/masyarakat',
        '/data-account/petugas',
        '/pengaduan',
        '/sertifikat',
    ];
    const petugasRoutes = ['/dashboard', '/pengaduan'];
    const isAuthorized = (role: string, path: string) => {
        if (role === 'super admin') return superAdminRoutes.some(route => path.startsWith(route));
        if (role === 'admin') return adminRoutes.some(route => path.startsWith(route));
        if (role === 'petugas') return petugasRoutes.some(route => path.startsWith(route));
        return false;
    };
    if (!isAuthorized(role, path)) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/data-account/:path*', '/data-master/:path*', '/pengaduan', '/sertifikat'],
};

