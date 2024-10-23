import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Specify which paths to apply the middleware to
export const config = {
    matcher: [
        '/dashboard',
        '/data-master/jenis-pengaduan',
        '/data-master/kabupaten-kota',
        '/data-account/kab-kota',
        '/data-account/masyarakat',
        '/data-account/petugas',
        '/pengaduan',
        '/sertifikat',
    ],
};
