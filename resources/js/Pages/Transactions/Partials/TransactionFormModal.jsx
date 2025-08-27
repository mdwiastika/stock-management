import React, { useEffect } from 'react'
import FormModal from '../../Components/FormModal'
import { useForm } from '@inertiajs/react'
import Select from 'react-select'

export default function TransactionFormModal({
  open,
  products,
  onClose,
  isEdit,
  formData,
  errors,
}) {
  const { data, setData, post, put, processing, reset, clearErrors } = useForm({
    name: formData.name || '',
    status: formData.status || '',
    amount: formData.amount || '',
    product_id: formData.product_id || '',
  })

  const statusOptions = [
    { value: 'in', label: 'Masuk' },
    { value: 'out', label: 'Keluar' },
  ]

  useEffect(() => {
    if (open) {
      console.log(formData)
      setData('name', formData.name || '')
      setData('amount', formData.amount || '')
      setData('product_id', formData.product_id || '')
      setData('status', formData.status || '')
      clearErrors()
    } else {
      reset()
    }
  }, [open, formData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      put(route('transactions.update', { transaction: formData.id }), {
        onSuccess: () => {
          onClose()
        },
        onError: (validationErrors) => {
          console.error('Update validation errors:', validationErrors)
        },
        preserveScroll: true,
      })
    } else {
      post(route('transactions.store'), {
        onSuccess: () => {
          onClose()
        },
        onError: (validationErrors) => {
          onClose()
          // console.error('Store validation errors:', validationErrors)
        },
        preserveScroll: true,
      })
    }
  }

  const handleProductSelect = (option) => {
    setData('product_id', option ? option.value : '')
  }

  const handleStatusSelect = (option) => {
    setData('status', option ? option.value : '')
  }

  return (
    <FormModal open={open} onClose={onClose}>
      <h2 className="text-lg font-bold mb-3">
        {isEdit ? 'Edit Produk' : 'Tambah Produk'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-neutral-800 dark:text-white">
          <label htmlFor="product_id" className="block mb-1">
            Nama Produk
          </label>
          <Select
            options={products}
            onChange={handleProductSelect}
            value={
              products.find((opt) => opt.value === data.product_id) || null
            }
            isClearable
            placeholder="Pilih produk..."
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            styles={{
              menu: (base) => ({ ...base, zIndex: 999 }), // Tambahkan ini
            }}
            required
          />
          {/* Display validation errors from useForm's errors object */}
          {errors.product_id && (
            <p className="!text-danger-600 mt-1 text-sm">{errors.product_id}</p>
          )}
        </div>

        <div className="mb-4 text-neutral-800 dark:text-white">
          <label htmlFor="amount" className="block mb-1">
            Jumlah Produk
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={data.amount}
            onChange={(e) => setData('amount', e.target.value)}
            placeholder="Masukkan jumlah produk"
            required
            className="form-control text-neutral-800 dark:text-white"
            disabled={processing}
          />
          {/* Display validation errors from useForm's errors object */}
          {errors.amount && (
            <p className="!text-danger-600 mt-1 text-sm">{errors.amount}</p>
          )}
        </div>

        <div className="mb-4 text-neutral-800 dark:text-white">
          <label className="block mb-1">Status</label>
          <Select
            options={statusOptions}
            onChange={handleStatusSelect}
            value={
              statusOptions.find((opt) => opt.value === data.status) || null
            }
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

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="btn bg-primary-100 dark:bg-primary-600/25 dark:hover:bg-primary-600 hover:bg-primary-600 text-primary-600 hover:text-white rounded-full px-5 py-2"
            onClick={onClose}
            disabled={processing}
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn bg-primary-600 hover:bg-primary-800 text-white rounded-full px-5 py-2 flex items-center gap-2"
            disabled={processing}
          >
            {processing ? 'Loading...' : isEdit ? 'Update' : 'Tambah'}{' '}
            {/* Show loading text */}
          </button>
        </div>
      </form>
    </FormModal>
  )
}
