import { usePage } from '@inertiajs/react'
import MainLayout from './Layout/MainLayout'

export default function Home() {
  const {
    countCategories,
    countProducts,
    countMonthsTransactions,
  } = usePage().props
  return (
    <div className="dashboard-main-body">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h6 className="font-semibold mb-0 dark:text-white">Dashboard</h6>
        <ul className="flex items-center gap-[6px]">
          <li className="font-medium">
            <a
              href="index.html"
              className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 dark:text-white dark:hover:text-primary-600"
            >
              <iconify-icon
                icon="solar:home-smile-angle-outline"
                className="icon text-lg"
              ></iconify-icon>
              Dashboard
            </a>
          </li>
          <li className="text-neutral-600 dark:text-white">-</li>
          <li className="text-neutral-600 font-medium dark:text-white">
            Inventory System
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          <div className="card border-0 p-4 rounded-lg shadow-none bg-gradient-to-l from-[#ffeaf480] dark:from-[#ffeaf41c] to-[#ffe2f0] dark:to-[#ffe2f018] mb-3">
            <div className="card-body p-0">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="mb-0 w-11 h-11 bg-white dark:bg-neutral-900 text-[#de3ace] dark:text-[#de3ace] text-2xl flex-shrink-0 flex justify-center items-center rounded-full
                                             h6"
                  >
                    <i className="ri-folder-fill"></i>
                  </span>
                  <div>
                    <span className="mb-0 font-medium text-neutral-600 text-lg">
                      Total Kategori
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-8">
                <h5 className="font-semibold mb-0">{countCategories ?? 0}</h5>
                {/* <p className="text-sm mb-0 flex items-center gap-2 text-neutral-500">
                  <span className="text-white px-1 rounded font-medium bg-success-main text-sm">
                    +2.5k
                  </span>{' '}
                  This Month
                </p> */}
              </div>
            </div>
          </div>
          <div className="card border-0 p-4 rounded-lg shadow-none bg-gradient-to-l from-[#ecddff4d] dark:from-[#ecddff17] to-[#ecddff] dark:to-[#ecddff26] mb-3">
            <div className="card-body p-0">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="mb-0 w-11 h-11 bg-white dark:bg-neutral-900 text-lilac-600 dark:text-lilac-600 text-2xl flex-shrink-0 flex justify-center items-center rounded-full
                                             h6"
                  >
                    <i className="ri-product-hunt-fill"></i>
                  </span>
                  <div>
                    <span className="mb-0 font-medium text-neutral-600 text-lg">
                      Total Produk
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-8">
                <h5 className="font-semibold mb-0">{countProducts ?? 0}</h5>
                {/* <p className="text-sm mb-0 flex items-center gap-2 text-neutral-500">
                  <span className="text-white px-1 rounded font-medium bg-success-main text-sm">
                    +30
                  </span>{' '}
                  This Month
                </p> */}
              </div>
            </div>
          </div>
          <div className="card border-0 p-4 rounded-lg shadow-none bg-gradient-to-l from-[#ebfaff] dark:from-[#ebfaff2c] to-[#c0f0ff] dark:to-[#c0f0ff23] mb-0">
            <div className="card-body p-0">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="mb-0 w-11 h-11 bg-white dark:bg-neutral-900 text-cyan-600 dark:text-cyan-600 text-2xl flex-shrink-0 flex justify-center items-center rounded-full
                                                 h6"
                  >
                    <i className="ri-money-dollar-circle-fill"></i>
                  </span>
                  <div>
                    <span className="mb-0 font-medium text-neutral-600 text-lg">
                      Total Transaksi Bulan Ini
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-8">
                <h5 className="font-semibold mb-0">
                  {countMonthsTransactions ?? 0}
                </h5>
                {/* <p className="text-sm mb-0 flex items-center gap-2 text-neutral-500">
                  <span className="text-white px-1 rounded font-medium bg-success-main text-sm">
                    +1.5k
                  </span>{' '}
                  This Month
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.layout = (page) => <MainLayout children={page} />
