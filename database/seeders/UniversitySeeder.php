<?php

namespace Database\Seeders;

use App\Models\University;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $listUniversities = [
            [
                'codept'=> 31033,
                'name' => 'Universitas Esa Unggul',
                'email'=> 'pmb@esaunggul.ac.id',
                'phone'=> '(021) 5674152',
                'fax' => '(021) 5682503',
                'logo' => '/storage/university/logo-ueu.png',
                'url' => 'https://www.esaunggul.ac.id',
                'full_address' => 'Jl. Arjuna Utara No.9, Duri Kepa, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11510',
                "province_id" => "11",
                "city_id" => "158",
                "district_id" => "1969",
                "village_id" => "25505",
            ]
        ];

        foreach ($listUniversities as $data) {
            University::create($data);
        }
    }
}
