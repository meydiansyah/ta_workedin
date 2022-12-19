<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $listSkills = [
            'Designer',
            'Content Creator',
            'Type Writer',
            'IT Support',
            'UI/UX Designer',
            'Web Developer',
            'Mobile Developer',
            'Full Stack Engineer',
        ];

        foreach ($listSkills as $data) {
            Skill::create(['name' => $data]);
        }
    }
}
