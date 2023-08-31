<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Account;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $accounts = [
            [
                "id"        => 1,
                "code"      => "1.100.00",
                "name"      => "Kas",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 2,
                "code"      => "1.100.10",
                "name"      => "Kas Besar",
                "bu_id"     => 4,
                "parent_id"     => 1
              ],
              [
                "id"        => 3,
                "code"      => "1.100.20",
                "name"      => "Kas Kecil Pusat",
                "bu_id"     => 4,
                "parent_id"     => 1
              ],
              [
                "id"        => 4,
                "code"      => "1.100.30",
                "name"      => "Kas Kecil Cipatat",
                "bu_id"     => 4,
                "parent_id"     => 1
              ],
              [
                "id"        => 5,
                "code"      => "1.100.40",
                "name"      => "Kas Kecil Maranginan",
                "bu_id"     => 4,
                "parent_id"     => 1
              ],
              [
                "id"        => 6,
                "code"      => "1.200.00",
                "name"      => "Bank",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 7,
                "code"      => "1.200.10",
                "name"      => "Maspion",
                "bu_id"     => 4,
                "parent_id"     => 6
              ],
              [
                "id"        => 8,
                "code"      => "1.200.20",
                "name"      => "BCA - PUSAT",
                "bu_id"     => 4,
                "parent_id"     => 6
              ],
              [
                "id"        => 9,
                "code"      => "1.200.30",
                "name"      => "BCA - CIPATAT",
                "bu_id"     => 4,
                "parent_id"     => 6
              ],
              [
                "id"        => 10,
                "code"      => "1.300.00",
                "name"      => "Ayat Silang",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 11,
                "code"      => "1.300.10",
                "name"      => "Ayat Silang",
                "bu_id"     => 4,
                "parent_id"     => 10
              ],
              [
                "id"        => 12,
                "code"      => "1.104.00",
                "name"      => "Persediaan Barang ",
                "bu_id"     => 4,
                "parent_id"     => 10
              ],
              [
                "id"        => 13,
                "code"      => "1.104.10",
                "name"      => "Persediaan Bahan Kebun",
                "bu_id"     => 4,
                "parent_id"     => 10
              ],
              [
                "id"        => 14,
                "code"      => "1.104.20",
                "name"      => "Persediaan Buah Hasil Panen",
                "bu_id"     => 4,
                "parent_id"     => 10
              ],
              [
                "id"        => 15,
                "code"      => "1.104.30",
                "name"      => "Barang Terkirim",
                "bu_id"     => 4,
                "parent_id"     => 10
              ],
              [
                "id"        => 16,
                "code"      => "1.105.00",
                "name"      => "UM Kasbon",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 17,
                "code"      => "1.105.10",
                "name"      => "Kasbon Eko Sutiyono",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 18,
                "code"      => "1.105.20",
                "name"      => "Kasbon Prasetyo",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 19,
                "code"      => "1.105.30",
                "name"      => "Kasbon Rahmat",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 20,
                "code"      => "1.105.40",
                "name"      => "Kasbon Deni",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 21,
                "code"      => "1.105.50",
                "name"      => "Kasbon Harian Cipatat",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 22,
                "code"      => "1.105.60",
                "name"      => "Kasbon Harian Maranginan",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 23,
                "code"      => "1.105.70",
                "name"      => "Kasbon ricky pws",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 24,
                "code"      => "1.105.80",
                "name"      => "Kasbon riki satpam",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 25,
                "code"      => "1.105.90",
                "name"      => "Kasbon aso",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 26,
                "code"      => "1.105.100",
                "name"      => "Kasbon odod",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 27,
                "code"      => "1.105.110",
                "name"      => "Kasbon udin",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 28,
                "code"      => "1.105.120",
                "name"      => "Kasbon andri",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 29,
                "code"      => "1.105.130",
                "name"      => "Kasbon meli",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 30,
                "code"      => "1.105.140",
                "name"      => "Kasbon neni",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 31,
                "code"      => "1.105.150",
                "name"      => "Kasbon agus",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 32,
                "code"      => "1.105.160",
                "name"      => "Kasbon regi",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 33,
                "code"      => "1.105.170",
                "name"      => "Kasbon Tanu",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 34,
                "code"      => "1.105.180",
                "name"      => "Kasbon dikdik",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 35,
                "code"      => "1.105.190",
                "name"      => "Kasbon suryana",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 36,
                "code"      => "1.105.200",
                "name"      => "Kasbon rohendi",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 37,
                "code"      => "1.105.210",
                "name"      => "Kasbon Randi ",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 38,
                "code"      => "1.105.220",
                "name"      => "Kasbon Erni",
                "bu_id"     => 4,
                "parent_id"     => 16
              ],
              [
                "id"        => 39,
                "code"      => "1.106.00",
                "name"      => "Piutang Lain-lain",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 40,
                "code"      => "106.01.00",
                "name"      => "Piutang Direksi",
                "bu_id"     => 4,
                "parent_id"     => 39
              ],
              [
                "id"        => 41,
                "code"      => "106.02.00",
                "name"      => "Piutang Karyawan",
                "bu_id"     => 4,
                "parent_id"     => 39
              ],
              [
                "id"        => 42,
                "code"      => "106.04.00",
                "name"      => "Piutang Bunga Pinjaman",
                "bu_id"     => 4,
                "parent_id"     => 39
              ],
              [
                "id"        => 43,
                "code"      => "106.05.00",
                "name"      => "Piutang Antar Unit",
                "bu_id"     => 4,
                "parent_id"     => 39
              ],
              [
                "id"        => 44,
                "code"      => "107.00.00",
                "name"      => "Biaya Dibayar Dimuka",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 45,
                "code"      => "107.01.00",
                "name"      => "Pajak PPh Pasal 25 Dibayar Dimuka",
                "bu_id"     => 4,
                "parent_id"     => 44
              ],
              [
                "id"        => 46,
                "code"      => "107.02.00",
                "name"      => "Sewa Dibayar Dimuka",
                "bu_id"     => 4,
                "parent_id"     => 44
              ],
              [
                "id"        => 47,
                "code"      => "107.03.00",
                "name"      => "Asuransi Dibayar Dimuka",
                "bu_id"     => 4,
                "parent_id"     => 44
              ],
              [
                "id"        => 48,
                "code"      => "107.04.00",
                "name"      => "Biaya Lain-lain Dibayar Dimuka",
                "bu_id"     => 4,
                "parent_id"     => 44
              ],
              [
                "id"        => 49,
                "code"      => "107.05.00",
                "name"      => "Pajak Dibayar dimuka",
                "bu_id"     => 4,
                "parent_id"     => 44
              ],
              [
                "id"        => 50,
                "code"      => "108.00.00",
                "name"      => "Tanaman Belum Menghasilkan",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 51,
                "code"      => "108.01.00",
                "name"      => "TBM - Upah",
                "bu_id"     => 4,
                "parent_id"     => 50
              ],
              [
                "id"        => 52,
                "code"      => "108.02.00",
                "name"      => "TBM - Alat",
                "bu_id"     => 4,
                "parent_id"     => 50
              ],
              [
                "id"        => 53,
                "code"      => "108.03.00",
                "name"      => "TBM - Bahan",
                "bu_id"     => 4,
                "parent_id"     => 50
              ],
              [
                "id"        => 54,
                "code"      => "108.04.00",
                "name"      => "TBM - Lain-Lain",
                "bu_id"     => 4,
                "parent_id"     => 50
              ],
              [
                "id"        => 55,
                "code"      => "109.00.00",
                "name"      => "Aktiva Tetap",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 56,
                "code"      => "109.01.00",
                "name"      => "Tanah",
                "bu_id"     => 4,
                "parent_id"     => 55
              ],
              [
                "id"        => 57,
                "code"      => "109.02.00",
                "name"      => "Bangunan",
                "bu_id"     => 4,
                "parent_id"     => 55
              ],
              [
                "id"        => 58,
                "code"      => "109.03.00",
                "name"      => "Prasarana Jalan & Jembatan",
                "bu_id"     => 4,
                "parent_id"     => 55
              ],
              [
                "id"        => 59,
                "code"      => "109.04.00",
                "name"      => "Inventaris Kebun",
                "bu_id"     => 4,
                "parent_id"     => 55
              ],
              [
                "id"        => 60,
                "code"      => "109.05.00",
                "name"      => "Inventaris Kantor",
                "bu_id"     => 4,
                "parent_id"     => 55
              ],
              [
                "id"        => 61,
                "code"      => "109.06.00",
                "name"      => "Kendaraan",
                "bu_id"     => 4,
                "parent_id"     => 55
              ],
              [
                "id"        => 62,
                "code"      => "110.00.00",
                "name"      => "Akumulasi Penyusutan",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 63,
                "code"      => "110.01.00",
                "name"      => "Akumulasi Penyusutan Bangunan / Instalasi",
                "bu_id"     => 4,
                "parent_id"     => 62
              ],
              [
                "id"        => 64,
                "code"      => "110.02.00",
                "name"      => "Akumulasi Penyusutan Jalan & Jembatan",
                "bu_id"     => 4,
                "parent_id"     => 62
              ],
              [
                "id"        => 65,
                "code"      => "110.03.00",
                "name"      => "Akumulasi Penyusutan Inventaris Kebun",
                "bu_id"     => 4,
                "parent_id"     => 62
              ],
              [
                "id"        => 66,
                "code"      => "110.04.00",
                "name"      => "Akumulasi Penyusutan Inventaris Kantor",
                "bu_id"     => 4,
                "parent_id"     => 62
              ],
              [
                "id"        => 67,
                "code"      => "110.05.00",
                "name"      => "Akumulasi Penyusutan Kendaraan",
                "bu_id"     => 4,
                "parent_id"     => 62
              ],
              [
                "id"        => 68,
                "code"      => "111.00.00",
                "name"      => "Aktiva Lain-Lain",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 69,
                "code"      => "111.01.00",
                "name"      => "Hak guna Usaha (HGU)",
                "bu_id"     => 4,
                "parent_id"     => 68
              ],
              [
                "id"        => 70,
                "code"      => "111.02.00",
                "name"      => "Pendaftaran Merk / Paten",
                "bu_id"     => 4,
                "parent_id"     => 68
              ],
              [
                "id"        => 71,
                "code"      => "111.03.00",
                "name"      => "Biaya Pendirian",
                "bu_id"     => 4,
                "parent_id"     => 68
              ],
              [
                "id"        => 72,
                "code"      => "111.04.00",
                "name"      => "Company Profile",
                "bu_id"     => 4,
                "parent_id"     => 68
              ],
              [
                "id"        => 73,
                "code"      => "112.00.00",
                "name"      => "Transaksi Aktiva Tetap",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 74,
                "code"      => "113.00.00",
                "name"      => "Bangunan Dalam Proses",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 75,
                "code"      => "113.01.00",
                "name"      => "BDP - Bangunan",
                "bu_id"     => 4,
                "parent_id"     => 74
              ],
              [
                "id"        => 76,
                "code"      => "113.02.00",
                "name"      => "BDP - Prasarana Jalan & Jembatan",
                "bu_id"     => 4,
                "parent_id"     => 74
              ],
              [
                "id"        => 77,
                "code"      => "113.03.00",
                "name"      => "BDP - Prasarana Listrik",
                "bu_id"     => 4,
                "parent_id"     => 74
              ],
              [
                "id"        => 78,
                "code"      => "113.04.00",
                "name"      => "BDP - Prasarana Instalasi Air",
                "bu_id"     => 4,
                "parent_id"     => 74
              ],
              [
                "id"        => 79,
                "code"      => "201.00.00",
                "name"      => "Hutang dagang",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 80,
                "code"      => "202.01.00",
                "name"      => "Account Payable",
                "bu_id"     => 4,
                "parent_id"     => 79
              ],
              [
                "id"        => 81,
                "code"      => "202.00.00",
                "name"      => "Hutang Jangka Pendek",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 82,
                "code"      => "202.04.00",
                "name"      => "Loan Maspion",
                "bu_id"     => 4,
                "parent_id"     => 81
              ],
              [
                "id"        => 83,
                "code"      => "202.05.00",
                "name"      => "BNI KMK",
                "bu_id"     => 4,
                "parent_id"     => 81
              ],
              [
                "id"        => 84,
                "code"      => "202.06.00",
                "name"      => "BNI Jk. Pendek",
                "bu_id"     => 4,
                "parent_id"     => 81
              ],
              [
                "id"        => 85,
                "code"      => "203.00.00",
                "name"      => "Hutang Perseroan",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 86,
                "code"      => "203.01.00",
                "name"      => "Hutang Perseroan I",
                "bu_id"     => 4,
                "parent_id"     => 85
              ],
              [
                "id"        => 87,
                "code"      => "203.02.00",
                "name"      => "Hutang Perseroan II",
                "bu_id"     => 4,
                "parent_id"     => 85
              ],
              [
                "id"        => 88,
                "code"      => "205.00.00",
                "name"      => "Hutang Lain-Lain",
                "bu_id"     => 4,
                "parent_id"     => 85
              ],
              [
                "id"        => 89,
                "code"      => "206.00.00",
                "name"      => "Dana Titipan",
                "bu_id"     => 4,
                "parent_id"     => 85
              ],
              [
                "id"        => 90,
                "code"      => "207.00.00",
                "name"      => "Hutang Pajak",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 91,
                "code"      => "207.01.00",
                "name"      => "Hutang Pajak PPh 21",
                "bu_id"     => 4,
                "parent_id"     => 90
              ],
              [
                "id"        => 92,
                "code"      => "207.02.00",
                "name"      => "Hutang Pajak PPh 23",
                "bu_id"     => 4,
                "parent_id"     => 90
              ],
              [
                "id"        => 93,
                "code"      => "207.03.00",
                "name"      => "Hutang Pajak PPh Pasal 4 Ayat (2)",
                "bu_id"     => 4,
                "parent_id"     => 90
              ],
              [
                "id"        => 94,
                "code"      => "207.04.00",
                "name"      => "Hutang PPh Final 1 Persen",
                "bu_id"     => 4,
                "parent_id"     => 90
              ],
              [
                "id"        => 95,
                "code"      => "207.05.00",
                "name"      => "Hutang PPh Badan",
                "bu_id"     => 4,
                "parent_id"     => 90
              ],
              [
                "id"        => 96,
                "code"      => "208.00.00",
                "name"      => "Dana Titipan Tanah",
                "bu_id"     => 4,
                "parent_id"     => 90
              ],
              [
                "id"        => 97,
                "code"      => "209.00.00",
                "name"      => "Hutang Direksi",
                "bu_id"     => 4,
                "parent_id"     => 90
              ],
              [
                "id"        => 98,
                "code"      => "210.00.00",
                "name"      => "Hutang Gaji",
                "bu_id"     => 4,
                "parent_id"     => 90
              ],
              [
                "id"        => 99,
                "code"      => "211.00.00",
                "name"      => "Hutang Antar Unit",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 100,
                "code"      => "211.01.01",
                "name"      => "Hutang Antar Unit CPT-AGW",
                "bu_id"     => 4,
                "parent_id"     => 99
              ],
              [
                "id"        => 101,
                "code"      => "211.01.02",
                "name"      => "Hutang Antar Unit AGW-CPT",
                "bu_id"     => 4,
                "parent_id"     => 99
              ],
              [
                "id"        => 102,
                "code"      => "212.00.00",
                "name"      => "Hutang Pembelian Belum Ditagih",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 103,
                "code"      => "213.00.00",
                "name"      => "Hutang Jangka Panjang",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 104,
                "code"      => "213.01.00",
                "name"      => "Hutang Bank BCA",
                "bu_id"     => 4,
                "parent_id"     => 103
              ],
              [
                "id"        => 105,
                "code"      => "213.02.00",
                "name"      => "Hutang Bank Panin",
                "bu_id"     => 4,
                "parent_id"     => 103
              ],
              [
                "id"        => 106,
                "code"      => "213.03.00",
                "name"      => "Hutang Bpk. Budi Darmawan",
                "bu_id"     => 4,
                "parent_id"     => 103
              ],
              [
                "id"        => 107,
                "code"      => "213.04.00",
                "name"      => "Hutang Maspion (FLA)",
                "bu_id"     => 4,
                "parent_id"     => 103
              ],
              [
                "id"        => 108,
                "code"      => "301.00.00",
                "name"      => "Modal",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 109,
                "code"      => "302.00.00",
                "name"      => "R/L Ditahan",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 110,
                "code"      => "303.00.00",
                "name"      => "R/L Berjalan",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 111,
                "code"      => 310001,
                "name"      => "OPENING BALANCE EQUITY",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 112,
                "code"      => "401.00.00",
                "name"      => "PENDAPATAN AGROBISNIS",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 113,
                "code"      => "401.01.00",
                "name"      => "Penjualan Buah",
                "bu_id"     => 4,
                "parent_id"     => 112
              ],
              [
                "id"        => 114,
                "code"      => "401.02.00",
                "name"      => "Penjualan Bibit buah",
                "bu_id"     => 4,
                "parent_id"     => 112
              ],
              [
                "id"        => 115,
                "code"      => "402.00.00",
                "name"      => "PENDAPATAN AGROWOSATA",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 116,
                "code"      => "402.01.00",
                "name"      => "Pendapatan  Restoran",
                "bu_id"     => 4,
                "parent_id"     => 115
              ],
              [
                "id"        => 117,
                "code"      => "402.01.01",
                "name"      => "Penjualan Aneka Makanan ",
                "bu_id"     => 4,
                "parent_id"     => 116
              ],
              [
                "id"        => 118,
                "code"      => "402.01.02",
                "name"      => "Penjualan Aneka Minuman",
                "bu_id"     => 4,
                "parent_id"     => 116
              ],
              [
                "id"        => 119,
                "code"      => "402.02.00",
                "name"      => "Penjualan Tiket",
                "bu_id"     => 4,
                "parent_id"     => 115
              ],
              [
                "id"        => 120,
                "code"      => "402.02.02",
                "name"      => "Tiket Wisata Petik",
                "bu_id"     => 4,
                "parent_id"     => 115
              ],
              [
                "id"        => 121,
                "code"      => "402.03.02",
                "name"      => "Pendapatan Tiket Parkir",
                "bu_id"     => 4,
                "parent_id"     => 115
              ],
              [
                "id"        => 122,
                "code"      => "403.00.00",
                "name"      => "Retur Penjualan",
                "bu_id"     => 4,
                "parent_id"     => 121
              ],
              [
                "id"        => 123,
                "code"      => "404.00.00",
                "name"      => "Discount Penjualan",
                "bu_id"     => 4,
                "parent_id"     => 121
              ],
              [
                "id"        => 124,
                "code"      => "500.00.00",
                "name"      => "COGS",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 125,
                "code"      => "501.00.00",
                "name"      => "COGS AGROBISNIS",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 126,
                "code"      => "501.01.00",
                "name"      => "Biaya Pemeliharaan ",
                "bu_id"     => 4,
                "parent_id"     => 125
              ],
              [
                "id"        => 127,
                "code"      => "501.01.01",
                "name"      => "TM-Upah",
                "bu_id"     => 4,
                "parent_id"     => 126
              ],
              [
                "id"        => 128,
                "code"      => "501.01.02",
                "name"      => "TM-Alat",
                "bu_id"     => 4,
                "parent_id"     => 126
              ],
              [
                "id"        => 129,
                "code"      => "501.01.03",
                "name"      => "TM-Bahan",
                "bu_id"     => 4,
                "parent_id"     => 126
              ],
              [
                "id"        => 130,
                "code"      => "501.01.04",
                "name"      => "TM-Lain-Lain",
                "bu_id"     => 4,
                "parent_id"     => 126
              ],
              [
                "id"        => 131,
                "code"      => "501.03.00",
                "name"      => "Biaya Persiapan Panen",
                "bu_id"     => 4,
                "parent_id"     => 125
              ],
              [
                "id"        => 132,
                "code"      => "501.03.01",
                "name"      => "BPP-Upah",
                "bu_id"     => 4,
                "parent_id"     => 131
              ],
              [
                "id"        => 133,
                "code"      => "501.03.02",
                "name"      => "BPP-Alat",
                "bu_id"     => 4,
                "parent_id"     => 131
              ],
              [
                "id"        => 134,
                "code"      => "501.03.03",
                "name"      => "BPP-Bahan",
                "bu_id"     => 4,
                "parent_id"     => 131
              ],
              [
                "id"        => 135,
                "code"      => "501.03.04",
                "name"      => "BPP-Lain-Lain",
                "bu_id"     => 4,
                "parent_id"     => 131
              ],
              [
                "id"        => 136,
                "code"      => "502.00.00",
                "name"      => "COGS AGROWISATA",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 137,
                "code"      => "502.01.01",
                "name"      => "WST-Upah",
                "bu_id"     => 4,
                "parent_id"     => 136
              ],
              [
                "id"        => 138,
                "code"      => "502.02.00",
                "name"      => "WST-Alat",
                "bu_id"     => 4,
                "parent_id"     => 136
              ],
              [
                "id"        => 139,
                "code"      => "502.03.00",
                "name"      => "WST-Bahan",
                "bu_id"     => 4,
                "parent_id"     => 136
              ],
              [
                "id"        => 140,
                "code"      => "502.01.00",
                "name"      => "WST-Lain-Lain",
                "bu_id"     => 4,
                "parent_id"     => 136
              ],
              [
                "id"        => 141,
                "code"      => "607.00.00",
                "name"      => "Biaya Gaji & Tunjangan",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 142,
                "code"      => "607.01.00",
                "name"      => "Biaya Gaji",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 143,
                "code"      => "607.02.00",
                "name"      => "Biaya Lembur",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 144,
                "code"      => "607.01.01",
                "name"      => "Biaya Transport Karyawan",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 145,
                "code"      => "607.02.01",
                "name"      => "Biaya Tunjangan Makan ",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 146,
                "code"      => "607.01.02",
                "name"      => "Biaya THR",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 147,
                "code"      => "607.02.02",
                "name"      => "Biaya JKK",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 148,
                "code"      => "607.01.03",
                "name"      => "Biaya JHT",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 149,
                "code"      => "607.02.03",
                "name"      => "Biaya JKM",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 150,
                "code"      => "607.01.04",
                "name"      => "Biaya JP",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 151,
                "code"      => "607.02.04",
                "name"      => "Biaya Tunjangan Liannya",
                "bu_id"     => 4,
                "parent_id"     => 141
              ],
              [
                "id"        => 152,
                "code"      => "608.00.00",
                "name"      => "Biaya Kendaraan & Perjalanan",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 153,
                "code"      => "608.01.00",
                "name"      => "Biaya Bensin. Tol dan Parkir",
                "bu_id"     => 4,
                "parent_id"     => 152
              ],
              [
                "id"        => 154,
                "code"      => "608.02.00",
                "name"      => "Biaya Konsumsi Dinas Luar",
                "bu_id"     => 4,
                "parent_id"     => 152
              ],
              [
                "id"        => 155,
                "code"      => "609.00.00",
                "name"      => "Biaya Pemeliharaan",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 156,
                "code"      => "609.01.00",
                "name"      => "Biaya Pemeliharaan Gedung",
                "bu_id"     => 4,
                "parent_id"     => 155
              ],
              [
                "id"        => 157,
                "code"      => "609.02.00",
                "name"      => "Biaya Pemeliharaan Peralatan",
                "bu_id"     => 4,
                "parent_id"     => 155
              ],
              [
                "id"        => 158,
                "code"      => "609.01.01",
                "name"      => "Biaya Pemeliharaan Kendaraan",
                "bu_id"     => 4,
                "parent_id"     => 155
              ],
              [
                "id"        => 159,
                "code"      => "610.00.00",
                "name"      => "Biaya Kantor",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 160,
                "code"      => "510.04.00",
                "name"      => "Telepon & Fax",
                "bu_id"     => 4,
                "parent_id"     => 160
              ],
              [
                "id"        => 161,
                "code"      => "510.05.00",
                "name"      => "Listrik",
                "bu_id"     => 4,
                "parent_id"     => 160
              ],
              [
                "id"        => 162,
                "code"      => "510.05.01",
                "name"      => "Air",
                "bu_id"     => 4,
                "parent_id"     => 160
              ],
              [
                "id"        => 163,
                "code"      => "510.06.01",
                "name"      => "Rumah Tangga Kantor",
                "bu_id"     => 4,
                "parent_id"     => 160
              ],
              [
                "id"        => 164,
                "code"      => "510.07.02",
                "name"      => "Upah Administrasi",
                "bu_id"     => 4,
                "parent_id"     => 160
              ],
              [
                "id"        => 165,
                "code"      => "510.08.02",
                "name"      => "Biaya Sewa Gedung",
                "bu_id"     => 4,
                "parent_id"     => 160
              ],
              [
                "id"        => 166,
                "code"      => "611.00.00",
                "name"      => "Biaya HUMAS",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 167,
                "code"      => "611.04.00",
                "name"      => "Biaya Sumbangan",
                "bu_id"     => 4,
                "parent_id"     => 166
              ],
              [
                "id"        => 168,
                "code"      => "612.00.00",
                "name"      => "Biaya Pajak",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 169,
                "code"      => "612.04.00",
                "name"      => "Biaya PPH Final",
                "bu_id"     => 4,
                "parent_id"     => 168
              ],
              [
                "id"        => 170,
                "code"      => "613.00.00",
                "name"      => "Biaya Legal",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 171,
                "code"      => "613.04.00",
                "name"      => "Biaya Perizinan",
                "bu_id"     => 4,
                "parent_id"     => 170
              ],
              [
                "id"        => 172,
                "code"      => "614.00.00",
                "name"      => "Biaya Pemasaran",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 173,
                "code"      => "614.04.00",
                "name"      => "Biaya Iklan",
                "bu_id"     => 4,
                "parent_id"     => 172
              ],
              [
                "id"        => 174,
                "code"      => "614.05.00",
                "name"      => "Biaya Komisi",
                "bu_id"     => 4,
                "parent_id"     => 172
              ],
              [
                "id"        => 175,
                "code"      => "614.06.00",
                "name"      => "Biaya Entertainment",
                "bu_id"     => 4,
                "parent_id"     => 172
              ],
              [
                "id"        => 176,
                "code"      => "614.07.00",
                "name"      => "Biaya Pemasaran Lainnya",
                "bu_id"     => 4,
                "parent_id"     => 172
              ],
              [
                "id"        => 177,
                "code"      => "615.00.00",
                "name"      => "Biaya Penyusutan & Amortisasi",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 178,
                "code"      => "615.01.00",
                "name"      => "Biaya Penyusutan Gedung",
                "bu_id"     => 4,
                "parent_id"     => 177
              ],
              [
                "id"        => 179,
                "code"      => "615.02.00",
                "name"      => "Biaya Penyusutan Kendaraan",
                "bu_id"     => 4,
                "parent_id"     => 177
              ],
              [
                "id"        => 180,
                "code"      => "615.03.00",
                "name"      => "Biaya Penyusutan Peralatan",
                "bu_id"     => 4,
                "parent_id"     => 177
              ],
              [
                "id"        => 181,
                "code"      => "615.04.00",
                "name"      => "Biaya Penyusutan Inventaris kantor",
                "bu_id"     => 4,
                "parent_id"     => 177
              ],
              [
                "id"        => 182,
                "code"      => "7.100.00",
                "name"      => "PENDAPATAN DILUAR USAHA",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 183,
                "code"      => "7.100.01",
                "name"      => "Pendapatan Jasa Giro",
                "bu_id"     => 4,
                "parent_id"     => 182
              ],
              [
                "id"        => 184,
                "code"      => "7.100.02",
                "name"      => "Pendapatan Bunga Deposito",
                "bu_id"     => 4,
                "parent_id"     => 182
              ],
              [
                "id"        => 185,
                "code"      => "7.100.03",
                "name"      => "Penjualan Inventory / Perlengkapan",
                "bu_id"     => 4,
                "parent_id"     => 182
              ],
              [
                "id"        => 186,
                "code"      => "7.100.99",
                "name"      => "Pendapatan Lain-Lain",
                "bu_id"     => 4,
                "parent_id"     => 182
              ],
              [
                "id"        => 187,
                "code"      => "7.200.00",
                "name"      => "BIAYA DILUAR USAHA",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 188,
                "code"      => "7.200.01",
                "name"      => "Biaya Bunga Pinjaman Lainnya",
                "bu_id"     => 4,
                "parent_id"     => 187
              ],
              [
                "id"        => 189,
                "code"      => "7.200.02",
                "name"      => "Biaya Adm Bank & Buku Cek/Giro",
                "bu_id"     => 4,
                "parent_id"     => 187
              ],
              [
                "id"        => 190,
                "code"      => "7.200.03",
                "name"      => "Pajak Jasa Giro",
                "bu_id"     => 4,
                "parent_id"     => 187
              ],
              [
                "id"        => 191,
                "code"      => "7.200.99",
                "name"      => "Beban Lain-Lain",
                "bu_id"     => 4,
                "parent_id"     => 187
              ],
              [
                "id"        => 192,
                "code"      => 8100,
                "name"      => "Gain/Loss Dispossal F.A",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 193,
                "code"      => 8200,
                "name"      => "Gain/Loss Revaluation FA",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 194,
                "code"      => 910002,
                "name"      => "Realize Gain or Loss IDR",
                "bu_id"     => 4,
                "parent_id"     => null
              ],
              [
                "id"        => 195,
                "code"      => 910003,
                "name"      => "Unrealize Gain or Loss IDR",
                "bu_id"     => 4,
                "parent_id"     => null
              ]
            ];

            Account::insert($accounts);
    }
        
}
