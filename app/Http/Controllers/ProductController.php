<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query();

        $allowSearches = ['category.name', 'name', 'stock'];
        if ($request->has('filters')) {
            foreach ($request->filters as $key => $value) {
                if ($value && in_array($key, $allowSearches)) {
                    if (str_contains($key, 'category.')) {
                        $categoryField = str_replace('category.', '', $key);
                        $products->whereHas('category', function ($query) use ($categoryField, $value) {
                            $query->where($categoryField, 'ilike', '%' . $value . '%');
                        });
                    } else {
                        $products->where($key, 'ilike', '%' . $value . '%');
                    }
                }
            }
        }
        $allowSorts = ['category.name', 'name', 'description'];
        if ($request->has('sortBy') && $request->has('sortDirection') && in_array($request->sortBy, $allowSorts)) {
            $categoryField = str_replace('category.', '', $request->sortBy);
            if ($request->sortBy === 'category.name') {
                $products->orderBy(Category::select('name')->whereColumn('categories.id', 'products.category_id'), $request->sortDirection);
            } else {
                $products->orderBy($categoryField, $request->sortDirection);
            }
        }

        $products = $products->with(['category'])->paginate($request->perPage ?? 10)->withQueryString();

        $categories = Category::select('id as value', 'name as label')->get();

        return inertia('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->filters ?? [],
            'sortBy' => $request->sortBy ?? 'name',
            'sortDirection' => $request->sortDirection ?? null,
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        Product::create($request->validated());
        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
