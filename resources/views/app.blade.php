@php
    use Illuminate\Support\Str;
@endphp
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wowdash - Tailwind CSS Admin Dashboard HTML Template</title>
    @viteReactRefresh
    @inertiaHead
    @routes
    <link rel="icon" type="image/png" href="{{ asset('assets/images/favicon.png') }}" sizes="16x16" />
    <!-- google fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&amp;display=swap"
        rel="stylesheet" />
    <!-- remix icon font css  -->
    <link rel="stylesheet" href="{{ asset('assets/css/remixicon.css') }}" />
    <!-- Apex Chart css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/apexcharts.css') }}" />
    <!-- Data Table css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/dataTables.min.css') }}" />
    <!-- Text Editor css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/editor-katex.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/lib/editor.atom-one-dark.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/lib/editor.quill.snow.css') }}" />
    <!-- Date picker css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/flatpickr.min.css') }}" />
    <!-- Calendar css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/full-calendar.css') }}" />
    <!-- Vector Map css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/jquery-jvectormap-2.0.5.css') }}" />
    <!-- Popup css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/magnific-popup.css') }}" />
    <!-- Slick Slider css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/slick.css') }}" />
    <!-- prism css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/prism.css') }}" />
    <!-- file upload css -->
    <link rel="stylesheet" href="{{ asset('assets/css/lib/file-upload.css') }}" />

    <link rel="stylesheet" href="{{ asset('assets/css/lib/audioplayer.css') }}" />
    <!-- main css -->
    @vite(['resources/js/app.jsx'])

    @vite(['resources/css/app.css'])
</head>

<body class="bg-gray-100 dark:bg-gray-900">
    @inertia
</body>

</html>


<!-- jQuery library js -->
{{-- <script src="{{ asset('assets/js/lib/jquery-3.7.1.min.js') }}"></script> --}}
<!-- Apex Chart js -->
<script src="{{ asset('assets/js/lib/apexcharts.min.js') }}"></script>
<!-- Data Table js -->
{{-- <script src="{{ asset('assets/js/lib/simple-datatables.min.js') }}"></script> --}}
<!-- Iconify Font js -->
<script src="{{ asset('assets/js/lib/iconify-icon.min.js') }}"></script>
<!-- jQuery UI js -->
{{-- <script src="{{ asset('assets/js/lib/jquery-ui.min.js') }}"></script> --}}
<!-- Vector Map js -->
{{-- <script src="{{ asset('assets/js/lib/jquery-jvectormap-2.0.5.min.js') }}"></script> --}}
{{-- <script src="{{ asset('assets/js/lib/jquery-jvectormap-world-mill-en.js') }}"></script> --}}
<!-- Popup js -->
{{-- <script src="{{ asset('assets/js/lib/magnific-popup.min.js') }}"></script> --}}
<!-- Slick Slider js -->
{{-- <script src="{{ asset('assets/js/lib/slick.min.js') }}"></script> --}}
<!-- prism js -->
<script src="{{ asset('assets/js/lib/prism.js') }}"></script>
<!-- file upload js -->
{{-- <script src="{{ asset('assets/js/lib/file-upload.js') }}"></script> --}}
<!-- audio player -->
{{-- <script src="{{ asset('assets/js/lib/audioplayer.js') }}"></script> --}}

<script src="{{ asset('assets/js/flowbite.min.js') }}"></script>
</body>

</html>
