<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $students = [
            [
                'codept'=> 31033,
                'major_code'=> 73201,
                'nim' => '20190801262',
            ],
            [
                'codept'=> 31033,
                'major_code'=> 73201,
                'nim' => '20190801306',  // Irsyad
            ],
            [
                'codept'=> 31038,  // Binus
                'major_code'=> 61201,  // Manajemen
                'nim' => '2201807236',  // RAIHAN INGGIL PANGESTU
            ],
            [
                'codept'=> 31038,  // Binus
                'major_code'=> 55201,  // Teknik Informatika
                'nim' => '2301871233',  // Hendra
            ], 
            [
                'codept'=> 31019,  // Mercu
                'major_code'=> 57201,  // Sistem Informasi
                'nim' => '41818010057',  // DAFFA AGRIFIANTO
            ],
            [
                'codept'=> 31019,  // Mercu
                'major_code'=> 90231,  // Desain Produk
                'nim' => '41911010130',  // ANGGA
            ],
            [
                'codept'=> 31015,   // Untar
                'major_code'=> 55201,  // Teknik Informatika
                'nim' => '535200053',  // Mario
            ],
            [
                'codept'=> 31015,  // Untar
                'major_code'=> 56201,  // Sistem Komputer
                'nim' => '835030043',  // Abdul Aziz
            ],
            [
                'codept'=> 31016,  // Trisakti
                'major_code'=> 61201,  // Manajemen
                'nim' => '022141076',  // NABILA RAHMADINA
            ],
            [
                'codept'=> 31016,  // Trisakti
                'major_code'=> 61201,  // Manajemen
                'nim' => '022070281',  // RENALDI RIZKI
            ],
        ];

        foreach($students as $data) {
            Student::create($data);
        }

    }
}
