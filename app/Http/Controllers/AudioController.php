<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AudioController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'audio' => 'required|file|mimes:mp3,wav,ogg|max:102400',
            ]);

            $path = $request->file('audio')->store('audios', 'public');
            $path = asset('storage/' . $path);

            return response()->json(['message' => 'Audio uploaded successfully', 'path' => $path], 201);
        } catch (\Throwable $th) {
            // beri error yang lebih informatif
            return response()->json(['message' => 'Audio upload failed', 'error' => $th->getMessage()], 500);
        }
    }
}
