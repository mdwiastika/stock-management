<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::query();

        $allowSearches = ['name', 'description'];
        if (request()->has('filters')) {
            foreach (request()->filters as $key => $value) {
                if ($value && in_array($key, $allowSearches)) {
                    $categories->where($key, 'ilike', '%' . $value . '%');
                }
            }
        }
        $allowSorts = ['name', 'description'];
        if (request()->has('sortBy') && request()->has('sortDirection') && in_array(request()->sortBy, $allowSorts)) {
            $categories->orderBy(request()->sortBy, request()->sortDirection);
        }

        $categories = $categories->paginate(request()->perPage ?? 10)->withQueryString();


        return inertia('Categories/Index', [
            'categories' => $categories,
            'filters' => request()->filters ?? [],
            'sortBy' => request()->sortBy ?? 'name',
            'sortDirection' => request()->sortDirection ?? null,
        ]);
    }

    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->validated());
        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}
