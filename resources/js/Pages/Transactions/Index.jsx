import { router, usePage } from '@inertiajs/react'
import MainLayout from '../Layout/MainLayout'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteConfirmationModal from '../Components/DeleteConfirmationModal'
import TransactionFormModal from './Partials/TransactionFormModal'
import TransactionTable from './Partials/TransactionTable'

export default function ProductIndex() {
  const {
    transactions,
    products,
    filters,
    sortBy,
    sortDirection,
    flash,
    errors,
  } = usePage().props

  useEffect(() => {
    if (flash) {
      if (flash.success) {
        toast.success(flash.success)
      }
      if (flash.error) {
        toast.error(flash.error)
      }
    }
  }, [flash]) // Depend on flash object

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState({ id: '', name: '' }) // Initial state for form data

  const [deleteCourseId, setDeleteCourseId] = useState(null)

  const handleAddCourse = () => {
    setIsEditMode(false)
    setFormData({ id: '', product_id: '', status: '', amount: '' }) // Reset data for a new course
    setIsFormModalOpen(true)
  }

  const handleEditCourse = (course) => {
    setIsEditMode(true)
    setFormData({
      id: course.id,
      product_id: course.product_id,
      status: course.status,
      amount: course.amount,
    })
    setIsFormModalOpen(true)
  }

  const handleDeleteCourse = (id) => {
    setDeleteCourseId(id)
  }

  const handleConfirmDelete = () => {
    if (deleteCourseId) {
      router.delete(
        route('transactions.destroy', { transaction: deleteCourseId }),
        {
          onSuccess: () => {
            setDeleteCourseId(null)
          },
          onError: (backendErrors) => {
            toast.error(backendErrors?.error || 'Gagal menghapus transaksi.')
            setDeleteCourseId(null)
            console.error('Delete error:', backendErrors)
          },
        },
      )
    }
  }

  return (
    <div className="dashboard-main-body">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h6 className="font-semibold mb-0">Transaksi</h6>
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
            Data Transaksi
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="card border-0 overflow-hidden">
            <div className="card-header flex justify-between items-center">
              <h6 className="card-title mb-0 text-lg">Daftar Transaksi</h6>
              <button
                className="btn bg-primary-600 hover:bg-primary-800 text-white rounded-full px-4 py-2 flex items-center gap-2"
                onClick={handleAddCourse}
              >
                <iconify-icon
                  icon="mdi:plus"
                  className="text-lg"
                ></iconify-icon>
                Tambah Transaksi
              </button>
            </div>
            <div className="card-body">
              <TransactionTable
                transactions={transactions}
                products={products}
                filters={filters}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
              />
            </div>
          </div>
        </div>
      </div>

      <TransactionFormModal
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        products={products}
        isEdit={isEditMode}
        formData={formData} // Pass initial data to useForm
        errors={errors} // Inertia passes global errors here for validation
      />

      <DeleteConfirmationModal
        open={!!deleteCourseId}
        onClose={() => setDeleteCourseId(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Transaksi"
        message="Anda yakin ingin menghapus transaksi ini? Semua data terkait (seperti transaksi dan laporan) juga akan ikut terhapus."
      />
    </div>
  )
}

ProductIndex.layout = (page) => <MainLayout children={page} />
