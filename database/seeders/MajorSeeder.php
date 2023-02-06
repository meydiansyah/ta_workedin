<?php

namespace Database\Seeders;

use App\Models\Major;
use App\Models\University;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $listMajors = [
            [
                'code'=> 73201,
                'name' => 'Psikologi',
                'level'=> 'S1',
                'accredity'=> 'B',
                'sk' => '57/E/O/2014',
                'website' => 'https://psikologi.esaunggul.ac.id/psikologi/',
                'date_standing' => '06 Juli 2001',
                "pt_code" => "31033",
            ],
            [
                'code'=> 74201,
                'name' => 'Ilmu Hukum',
                'level'=> 'S1',
                'accredity'=> 'A',
                'sk' => '57/E/O/2014',
                'website' => 'https://fh.esaunggul.ac.id/hukum/',
                'date_standing' => '09 Juni 1999',
                "pt_code" => "31033",
            ],
            [
                'code'=> 14201,
                'name' => 'Ilmu Keperawatan',
                'level'=> 'S1',
                'accredity'=> 'B',
                'sk' => '57/E/O/2014',
                'website' => 'https://fikes.esaunggul.ac.id/keperawatan/',
                'date_standing' => '23 Agustus 2006',
                "pt_code" => "31033",
            ],
        ];

        $university = University::findOrFail(31033);

        foreach ($listMajors as $data) {
            Major::create($data);
            
            $university->majors()->attach($data['code']);
        }
    }
}
