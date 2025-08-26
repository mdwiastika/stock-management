<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'amount' => 'required|integer|min:1',
            'status' => 'required|string|in:in,out',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'ID pengguna harus diisi.',
            'user_id.exists' => 'ID pengguna tidak valid.',
            'product_id.required' => 'ID produk harus diisi.',
            'product_id.exists' => 'ID produk tidak valid.',
            'amount.required' => 'Jumlah harus diisi.',
            'amount.integer' => 'Jumlah harus berupa angka bulat.',
            'amount.min' => 'Jumlah tidak boleh kurang dari 1.',
            'status.required' => 'Status harus diisi.',
            'status.string' => 'Status harus berupa string.',
            'status.in' => 'Status harus salah satu dari: in, out.',
        ];
    }

    public function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            redirect()
                ->back()
                ->withErrors($validator)
                ->withInput()
                ->with('error', 'Validation failed. Please check your input.')
        );
    }
}
