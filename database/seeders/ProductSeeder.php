<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // category_id, name, stock
        $products = [
            [
                'category_id' => 1,
                'name' => 'Nasi Goreng',
                'stock' => 100,
            ],
            [
                'category_id' => 1,
                'name' => 'Mie Ayam',
                'stock' => 150,
            ],
            [
                'category_id' => 2,
                'name' => 'Es Teh Manis',
                'stock' => 200,
            ],
            [
                'category_id' => 2,
                'name' => 'Jus Alpukat',
                'stock' => 120,
            ],
            [
                'category_id' => 3,
                'name' => 'Smartphone',
                'stock' => 50,
            ],
            [
                'category_id' => 3,
                'name' => 'Laptop',
                'stock' => 30,
            ]
        ];

        Product::insert($products);
    }
}
