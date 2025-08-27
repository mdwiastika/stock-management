import { router, useForm, usePage } from '@inertiajs/react'
import MainLayout from '../Layout/MainLayout'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from 'react-select'

export default function ReportIndex() {
  const { flash, errors } = usePage().props

  // Corrected useEffect for flash messages
  useEffect(() => {
    console.log('flash:', flash)
    if (flash) {
      if (flash.success) {
        toast.success(flash.success)
      }
      if (flash.error) {
        toast.error(flash.error)
      }
    }
  }, [flash])

  const { data, setData, post, put, processing, reset, clearErrors } = useForm({
    type: '',
    month: '',
    year: '',
    week: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({
      type: data.type,
      month: data.month,
      year: data.year,
      ...(data.type === 'week' && { week: data.week }),
    }).toString()

    window.open(route('reports.export') + '?' + params, '_blank')
  }

  const handleTypeSelect = (selectedOption) => {
    setData('type', selectedOption.value)
  }

  const handleMonthSelect = (selectedOption) => {
    setData('month', selectedOption.value)
  }

  const handleYearSelect = (selectedOption) => {
    setData('year', selectedOption.value)
  }

  const handleWeekSelect = (selectedOption) => {
    setData('week', selectedOption.value)
  }

  const typeOptions = [
    { value: 'month', label: 'Bulan' },
    { value: 'week', label: 'Mingguan' },
  ]
  const monthOptions = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ]
  const yearOptions = [
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
  ]
  const weekOptions = [
    { value: '1', label: 'Minggu 1' },
    { value: '2', label: 'Minggu 2' },
    { value: '3', label: 'Minggu 3' },
    { value: '4', label: 'Minggu 4' },
    { value: '5', label: 'Minggu 5' },
  ]

  return (
    <div className="dashboard-main-body">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h6 className="font-semibold mb-0">Laporan</h6>
        <ul className="flex items-center gap-[6px]">
          <li className="font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 dark:text-white dark:hover:text-primary-600"
            >
              <iconify-icon
                icon="mdi:school-outline"
                className="icon text-lg"
              ></iconify-icon>
              Master Data
            </a>
          </li>
          <li className="text-neutral-600 dark:text-white">-</li>
          <li className="text-neutral-600 font-medium dark:text-white">
            Data Laporan
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="card border-0 overflow-hidden">
            <div className="card-header flex justify-between items-center">
              <h6 className="card-title mb-0 text-lg">Daftar Laporan</h6>
            </div>
            <div className="card-body min-h-screen">
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-neutral-800 dark:text-white">
                  <label className="block mb-1">Tipe</label>
                  <Select
                    options={typeOptions}
                    onChange={handleTypeSelect}
                    value={typeOptions.find(
                      (option) => option.value === data.type,
                    )}
                    isClearable
                    placeholder="Pilih status..."
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    styles={{
                      menu: (base) => ({ ...base, zIndex: 999 }), // Tambahkan ini
                    }}
                    required
                  />
                  {/* Display validation errors from useForm's errors object */}
                  {errors.status && (
                    <p className="!text-danger-600 mt-1">
                      {Array.isArray(errors.status)
                        ? errors.status.join(', ')
                        : errors.status}
                    </p>
                  )}
                </div>

                <div className="mb-4 text-neutral-800 dark:text-white">
                  <label className="block mb-1">Bulan</label>
                  <Select
                    options={monthOptions}
                    onChange={handleMonthSelect}
                    value={monthOptions.find(
                      (option) => option.value === data.month,
                    )}
                    isClearable
                    placeholder="Pilih bulan..."
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    styles={{
                      menu: (base) => ({ ...base, zIndex: 999 }), // Tambahkan ini
                    }}
                    required
                  />
                  {/* Display validation errors from useForm's errors object */}
                  {errors.month && (
                    <p className="!text-danger-600 mt-1">
                      {Array.isArray(errors.month)
                        ? errors.month.join(', ')
                        : errors.month}
                    </p>
                  )}
                </div>

                <div className="mb-4 text-neutral-800 dark:text-white">
                  <label className="block mb-1">Tahun</label>
                  <input
                    type="text"
                    value={data.year}
                    onChange={(e) => setData('year', e.target.value)}
                    placeholder="Masukkan tahun..."
                    className="form-control text-neutral-800 dark:text-white"
                    required
                  />
                  {/* Display validation errors from useForm's errors object */}
                  {errors.year && (
                    <p className="!text-danger-600 mt-1">
                      {Array.isArray(errors.year)
                        ? errors.year.join(', ')
                        : errors.year}
                    </p>
                  )}
                </div>
                {data.type === 'week' && (
                  <div className="mb-4 text-neutral-800 dark:text-white">
                    <label className="block mb-1">Minggu</label>
                    <Select
                      options={weekOptions}
                      onChange={handleWeekSelect}
                      value={weekOptions.find(
                        (option) => option.value === data.week,
                      )}
                      isClearable
                      placeholder="Pilih minggu..."
                      className="my-react-select-container"
                      classNamePrefix="my-react-select"
                      styles={{
                        menu: (base) => ({ ...base, zIndex: 999 }), // Tambahkan ini
                      }}
                      required
                    />
                    {/* Display validation errors from useForm's errors object */}
                    {errors.week && (
                      <p className="!text-danger-600 mt-1">
                        {Array.isArray(errors.week)
                          ? errors.week.join(', ')
                          : errors.week}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="btn bg-primary-600 hover:bg-primary-800 text-white rounded-full px-5 py-2 flex items-center gap-2"
                    disabled={processing}
                  >
                    {processing ? 'Loading...' : 'Export'}{' '}
                    {/* Show loading text */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ReportIndex.layout = (page) => <MainLayout children={page} />
