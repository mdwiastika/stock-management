<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::query();

        $allowSearches = ['product.name', 'name', 'amount'];
        if ($request->has('filters')) {
            foreach ($request->filters as $key => $value) {
                if ($value && in_array($key, $allowSearches)) {
                    if (str_contains($key, 'product.')) {
                        $productField = str_replace('product.', '', $key);
                        $transactions->whereHas('product', function ($query) use ($productField, $value) {
                            $query->where($productField, 'ilike', '%' . $value . '%');
                        });
                    } else {
                        $transactions->where($key, 'ilike', '%' . $value . '%');
                    }
                }
            }
        }
        $allowSorts = ['product.name', 'name', 'amount'];
        if ($request->has('sortBy') && $request->has('sortDirection') && in_array($request->sortBy, $allowSorts)) {
            $productField = str_replace('product.', '', $request->sortBy);
            if ($request->sortBy === 'product.name') {
                $transactions->orderBy(Product::select('name')->whereColumn('products.id', 'transactions.product_id'), $request->sortDirection);
            } else {
                $transactions->orderBy($productField, $request->sortDirection);
            }
        }

        $transactions = $transactions->with(['product'])->paginate($request->perPage ?? 10)->withQueryString();

        $products = Product::select('id as value', 'name as label')->get();

        return inertia('Transactions/Index', [
            'transactions' => $transactions,
            'products' => $products,
            'filters' => $request->filters ?? [],
            'sortBy' => $request->sortBy ?? 'name',
            'sortDirection' => $request->sortDirection ?? null,
        ]);
    }

    public function store(StoreTransactionRequest $request)
    {
        try {
            DB::beginTransaction();
            $validatedData = $request->validated();
            $validatedData['user_id'] = Auth::id();
            Transaction::create($validatedData);

            // product stock adjustment
            $product = Product::find($validatedData['product_id']);
            if ($validatedData['status'] === 'out') {
                $product->decrement('stock', $validatedData['amount']);
            } else {
                $product->increment('stock', $validatedData['amount']);
            }
            DB::commit();
            return redirect()->route('transactions.index')->with('success', 'Transaction created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Failed to create transaction: ' . $th->getMessage());
        }
    }

    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::id();

        $product = Product::find($validatedData['product_id']);
        if ($transaction->status === 'out') {
            $product->increment('stock', $validatedData['amount']);
        } else {
            $product->decrement('stock', $validatedData['amount']);
        }

        $transaction->update($validatedData);

        if ($transaction->status === 'out') {
            $product->decrement('stock', $validatedData['amount']);
        } else {
            $product->increment('stock', $validatedData['amount']);
        }

        return redirect()->route('transactions.index')->with('success', 'Transaction updated successfully.');
    }

    public function destroy(Transaction $transaction)
    {
        try {
            DB::beginTransaction();

            // product stock adjustment
            $product = $transaction->product;
            if ($transaction->status === 'out') {
                $product->increment('stock', $transaction->amount);
            } else {
                $product->decrement('stock', $transaction->amount);
            }

            $transaction->delete();
            DB::commit();
            return redirect()->route('transactions.index')->with('success', 'Transaction deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Failed to delete transaction: ' . $th->getMessage());
        }
    }
}
