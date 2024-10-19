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