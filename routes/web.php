<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;


Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/', [DashboardController::class, 'index'])->name('home');

    Route::resource('categories', CategoryController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names([
            'index' => 'categories.index',
            'store' => 'categories.store',
            'update' => 'categories.update',
            'destroy' => 'categories.destroy',
        ]);

    Route::resource('products', ProductController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names([
            'index' => 'products.index',
            'store' => 'products.store',
            'update' => 'products.update',
            'destroy' => 'products.destroy',
        ]);

    Route::resource('transactions', TransactionController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names([
            'index' => 'transactions.index',
            'store' => 'transactions.store',
            'update' => 'transactions.update',
            'destroy' => 'transactions.destroy',
        ]);

    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/export-reports', [ReportController::class, 'export'])->name('reports.export');
});
