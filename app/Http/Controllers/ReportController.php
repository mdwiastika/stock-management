<?php

namespace App\Http\Controllers;

use App\Exports\TransactionsExport;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    public function export(Request $request)
    {
        $type = $request->input('type'); // 'week' atau 'month'
        $year = $request->input('year', now()->year); // default tahun sekarang
        $month = $request->input('month'); // 1-12
        $week = $request->input('week'); // minggu ke berapa

        // Filter date range
        if ($type === 'month' && $month) {
            $start = Carbon::create($year, $month, 1)->startOfMonth();
            $end = Carbon::create($year, $month, 1)->endOfMonth();
        } elseif ($type === 'week' && $month && $week) {
            // Minggu ke-n dalam bulan
            $start = Carbon::create($year, $month, 1)->startOfMonth()->addWeeks($week - 1)->startOfWeek();
            $end = (clone $start)->endOfWeek();
            // Pastikan minggu tidak keluar dari bulan
            if ($end->month !== (int)$month) {
                $end = Carbon::create($year, $month, 1)->endOfMonth();
            }
        } else {
            // Default semua data
            $start = null;
            $end = null;
        }

        return Excel::download(new TransactionsExport($start, $end), 'transactions.xlsx');
    }
}
