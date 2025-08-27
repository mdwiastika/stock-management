<?php

namespace App\Exports;

use App\Models\Transaction;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TransactionsExport implements FromCollection, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected $start;
    protected $end;

    public function __construct($start = null, $end = null)
    {
        $this->start = $start;
        $this->end = $end;
    }

    public function collection()
    {
        $query = Transaction::query();

        if ($this->start && $this->end) {
            $query->whereBetween('created_at', [$this->start, $this->end]);
        }

        return $query->get(['id', 'amount', 'product_id', 'status', 'created_at']);
    }

    public function map($transaction): array
    {
        Log::info('Mapping transaction: ' . $transaction);
        return [
            $transaction->id,
            $transaction->product->name,
            $transaction->amount,
            $transaction->status == 'in' ? 'Masuk' : 'Keluar',
            $transaction->created_at->format('Y-m-d H:i:s'),
        ];
    }

    // Header kolom
    public function headings(): array
    {
        return [
            'No',
            'Nama Produk',
            'Jumlah',
            'Status',
            'Tanggal',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Heading di baris pertama
            1 => [
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'D9D9D9'], // abu2 muda
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
            ],
        ];
    }
}
