export interface JenisPengaduan {
    _id: string;
    jenisPengaduan: string;
}

export interface KabupatenKota {
    _id: string,
    kabupatenkota: string,
}

export interface DataPengaduan {
    _id: string,
    judul: string,
    deskripsi: string,
    nama_pelapor: string,
    tanggal: string,
    jenis_pengaduan: string,
    kabupatenkota: string,
    lokasi: string,
    status: string,
    petugas: string,
    uri_foto: string,
}

export interface DataUser {
    _id: string,
    username: string,
    name: string,
    kota: string,
    nomor_hp: string,
    role: string,
    addres: string,
}

export interface Summary {
    tahun: string,
    bulan: dataBulan[]
}

interface dataBulan {
    bulan: string
    pelapor: dataPelapor[]
}

interface dataPelapor {
    namaPelapor: string
    jumlahLaporan: string
}

export interface Sertifikat {
    _id: string,
    nama_pelapor: string,
    tahun: string,
    bulan: string,
    jumlahLaporan: string,
    uri_pdf: string,
}