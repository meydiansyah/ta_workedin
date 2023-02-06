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
			[
				'name'=> 'Perseorangan',
				'code' => 'Perseorangan',
			],
			[
				'name' => 'CV (Persekutuan Komanditer)',
				'code' => 'CV'
			],
			[
				'name' => 'PT (Perseroan Terbatas)',
				'code' => 'PT'
			],
			[
				'name' => 'Firma',
				'code' => 'Firma'
			],
			[
				'name' => 'Persero',
				'code' => 'Persero'
			],
			[
				'name' => 'Perum (Perusahaan Umum)',
				'code' => 'Perum'
			],
			[
				'name' => 'Yayasan',
				'code' => 'Yayasan'
			]
		];

		foreach($listType as $data) {
			TypeCompany::create($data);
		}
    }
}
