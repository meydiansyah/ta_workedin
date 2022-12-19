<?php

namespace Database\Seeders;

use App\Models\TypeCompany;
use Illuminate\Database\Seeder;

class TypeCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$listType = [
			'Perseorangan',
			'CV (Persekutuan Komanditer)',
			'PT (Perseroan Terbatas)',
			'Firma',
			'Persero',
			'Perum (Perusahaan Umum)',
			'Yayasan'
		];

		foreach($listType as $data) {
			TypeCompany::create(['name' => $data]);
		}
    }
}
