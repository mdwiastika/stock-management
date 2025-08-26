<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $countCategories = Category::count();
        $countProducts = Product::count();
        $countMonthsTransactions = Transaction::whereMonth('created_at', now()->month)->count();
        return Inertia::render('Home', [
            'countCategories' => $countCategories,
            'countProducts' => $countProducts,
            'countMonthsTransactions' => $countMonthsTransactions,
        ]);
    }
}
