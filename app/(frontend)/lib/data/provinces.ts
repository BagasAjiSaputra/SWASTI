export const provinces = [
    // Sumatera
    { name: 'Aceh', coords: [4.6951, 96.7494] as [number, number], risk: 'Sedang', value: '2.45%', commodity: 'Beras' },
    { name: 'Sumatera Utara', coords: [2.1121, 99.1332] as [number, number], risk: 'Sedang', value: '2.85%', commodity: 'Bawang Merah' },
    { name: 'Sumatera Barat', coords: [-0.7392, 100.8000] as [number, number], risk: 'Tinggi', value: '3.90%', commodity: 'Cabai Rawit' },
    { name: 'Riau', coords: [0.5071, 101.4478] as [number, number], risk: 'Rendah', value: '1.92%', commodity: 'Minyak Goreng' },
    { name: 'Kepulauan Riau', coords: [3.9456, 108.1428] as [number, number], risk: 'Sedang', value: '2.10%', commodity: 'Daging Ayam' },
    { name: 'Jambi', coords: [-1.6101, 103.6131] as [number, number], risk: 'Tinggi', value: '4.15%', commodity: 'Cabai Merah' },
    { name: 'Bengkulu', coords: [-3.7928, 102.2608] as [number, number], risk: 'Sedang', value: '3.05%', commodity: 'Beras' },
    { name: 'Sumatera Selatan', coords: [-3.3194, 104.9147] as [number, number], risk: 'Sedang', value: '2.65%', commodity: 'Gula Pasir' },
    { name: 'Kepulauan Bangka Belitung', coords: [-2.1317, 106.1169] as [number, number], risk: 'Tinggi', value: '3.75%', commodity: 'Ikan Segar' },
    { name: 'Lampung', coords: [-4.5586, 105.4068] as [number, number], risk: 'Sedang', value: '2.90%', commodity: 'Beras' },

    // Jawa
    { name: 'DKI Jakarta', coords: [-6.2088, 106.8456] as [number, number], risk: 'Sedang', value: '2.95%', commodity: 'Daging Sapi' },
    { name: 'Jawa Barat', coords: [-6.9175, 107.6191] as [number, number], risk: 'Tinggi', value: '4.10%', commodity: 'Beras' },
    { name: 'Banten', coords: [-6.4058, 106.0600] as [number, number], risk: 'Sedang', value: '3.25%', commodity: 'Telur Ayam' },
    { name: 'Jawa Tengah', coords: [-7.0624, 110.4203] as [number, number], risk: 'Sedang', value: '3.15%', commodity: 'Bawang Merah' },
    { name: 'DI Yogyakarta', coords: [-7.7956, 110.3695] as [number, number], risk: 'Rendah', value: '1.85%', commodity: 'Stabil' },
    { name: 'Jawa Timur', coords: [-7.5, 112.7] as [number, number], risk: 'Tinggi', value: '3.42%', commodity: 'Cabai Merah' },

    // Bali & Nusa Tenggara
    { name: 'Bali', coords: [-8.3405, 115.0920] as [number, number], risk: 'Sedang', value: '2.70%', commodity: 'Daging Ayam' },
    { name: 'NTB', coords: [-8.6529, 117.3616] as [number, number], risk: 'Rendah', value: '1.50%', commodity: 'Jagung' },
    { name: 'NTT', coords: [-8.6574, 121.0794] as [number, number], risk: 'Tinggi', value: '4.80%', commodity: 'Beras' },

    // Kalimantan
    { name: 'Kalimantan Barat', coords: [-0.2787, 110.3204] as [number, number], risk: 'Sedang', value: '2.80%', commodity: 'Bawang Putih' },
    { name: 'Kalimantan Tengah', coords: [-1.6815, 113.3824] as [number, number], risk: 'Tinggi', value: '4.30%', commodity: 'Beras' },
    { name: 'Kalimantan Selatan', coords: [-3.0926, 115.2838] as [number, number], risk: 'Sedang', value: '3.10%', commodity: 'Daging Ayam' },
    { name: 'Kalimantan Timur', coords: [0.5387, 116.4194] as [number, number], risk: 'Sedang', value: '2.95%', commodity: 'Minyak Goreng' },
    { name: 'Kalimantan Utara', coords: [3.0731, 116.0414] as [number, number], risk: 'Rendah', value: '1.75%', commodity: 'Cabai Rawit' },

    // Sulawesi
    { name: 'Sulawesi Utara', coords: [0.6247, 123.9750] as [number, number], risk: 'Rendah', value: '1.40%', commodity: 'Tomat' },
    { name: 'Gorontalo', coords: [0.6999, 122.4467] as [number, number], risk: 'Sedang', value: '2.50%', commodity: 'Jagung' },
    { name: 'Sulawesi Tengah', coords: [-1.4300, 121.4456] as [number, number], risk: 'Tinggi', value: '3.85%', commodity: 'Beras' },
    { name: 'Sulawesi Barat', coords: [-2.8440, 119.2321] as [number, number], risk: 'Sedang', value: '2.75%', commodity: 'Minyak Goreng' },
    { name: 'Sulawesi Selatan', coords: [-3.6688, 119.9740] as [number, number], risk: 'Sedang', value: '3.20%', commodity: 'Beras' },
    { name: 'Sulawesi Tenggara', coords: [-4.1449, 122.1746] as [number, number], risk: 'Tinggi', value: '4.20%', commodity: 'Cabai Merah' },

    // Maluku & Papua
    { name: 'Maluku', coords: [-3.2385, 130.1453] as [number, number], risk: 'Tinggi', value: '4.60%', commodity: 'Ikan Segar' },
    { name: 'Maluku Utara', coords: [0.6328, 127.8488] as [number, number], risk: 'Tinggi', value: '4.95%', commodity: 'Beras' },
    { name: 'Papua Barat', coords: [-1.3, 133.0] as [number, number], risk: 'Tinggi', value: '5.10%', commodity: 'Gula Pasir' },
    { name: 'Papua Barat Daya', coords: [-0.8833, 131.25] as [number, number], risk: 'Sedang', value: '3.40%', commodity: 'Beras' },
    { name: 'Papua', coords: [-4.2699, 138.0804] as [number, number], risk: 'Tinggi', value: '5.20%', commodity: 'Beras' },
    { name: 'Papua Tengah', coords: [-3.9, 136.0] as [number, number], risk: 'Tinggi', value: '4.85%', commodity: 'Telur Ayam' },
    { name: 'Papua Pegunungan', coords: [-4.0, 139.0] as [number, number], risk: 'Tinggi', value: '5.50%', commodity: 'Ubi Jalar' },
    { name: 'Papua Selatan', coords: [-7.0, 140.0] as [number, number], risk: 'Sedang', value: '3.15%', commodity: 'Beras' },
];
