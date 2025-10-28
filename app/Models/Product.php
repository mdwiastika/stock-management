<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = ['id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    protected function totalStockIn(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->transactions()
                ->where('status', 'in')
                ->sum('amount'),
        );
    }

    protected function totalStockOut(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->transactions()
                ->where('status', 'out')
                ->sum('amount'),
        );
    }

    protected $appends = ['total_stock_in', 'total_stock_out'];
}
