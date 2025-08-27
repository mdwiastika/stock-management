import { router, usePage } from '@inertiajs/react'
import MainLayout from '../Layout/MainLayout'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  }, [flash]) // Depend on flash object

  const handlePrintReport = () => {}

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
              <button
                className="btn bg-primary-600 hover:bg-primary-800 text-white rounded-full px-4 py-2 flex items-center gap-2"
                onClick={handlePrintReport}
              >
                <iconify-icon
                  icon="mdi:plus"
                  className="text-lg"
                ></iconify-icon>
                Tambah Produk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ReportIndex.layout = (page) => <MainLayout children={page} />
