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