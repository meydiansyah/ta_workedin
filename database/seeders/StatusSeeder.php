<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$listStatus = [
			'active',
			'deactive',
			'onreview',
			'ongoing',
			'accepted',
			'canceled',
			'finished',
			'rejected',
			'suspend',
		];

		foreach($listStatus as $data) {
			Status::create(['name' => $data]);
		}

    }
}
