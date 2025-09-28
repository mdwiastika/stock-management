<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AudioController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'audio' => 'required|file|mimes:mp3,wav,ogg|max:102400',
        ]);

        $path = $request->file('audio')->store('audios', 'public');

        return response()->json(['message' => 'Audio uploaded successfully', 'path' => $path], 201);
    }
}
