<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Makanan',
                'description' => 'Makanan enak',
            ],
            [
                'name' => 'Minuman',
                'description' => 'Minuman segar',
            ],
            [
                'name' => 'Elektronik',
                'description' => 'Gadget dan perangkat elektronik',
            ],
        ];

        Category::insert($categories);
    }
}
