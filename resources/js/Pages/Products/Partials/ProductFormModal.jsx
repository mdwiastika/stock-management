import React, { useEffect } from 'react'
import FormModal from '../../Components/FormModal'
import { useForm } from '@inertiajs/react'
import Select from 'react-select'

export default function ProductFormModal({
  open,
  categories,
  onClose,
  isEdit,
  formData,
  errors,
}) {
  const { data, setData, post, put, processing, reset, clearErrors } = useForm({
    name: formData.name || '',
    stock: formData.stock || '',
    category_id: formData.category_id || '',
  })

  useEffect(() => {
    if (open) {
      console.log(formData)
      setData('name', formData.name || '')
      setData('stock', formData.stock || '')
      setData('category_id', formData.category_id || '')
      clearErrors()
    } else {
      reset()
    }
  }, [open, formData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      put(route('products.update', { product: formData.id }), {
        onSuccess: () => {
          onClose()
        },
        onError: (validationErrors) => {
          console.error('Update validation errors:', validationErrors)
        },
        preserveScroll: true,
      })
    } else {
      post(route('products.store'), {
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

  const handleCategorySelect = (option) => {
    setData('category_id', option ? option.value : '')
  }

  return (
    <FormModal open={open} onClose={onClose}>
      <h2 className="text-lg font-bold mb-3">
        {isEdit ? 'Edit Produk' : 'Tambah Produk'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-neutral-800 dark:text-white">
          <label htmlFor="name" className="block mb-1">
            Nama Produk
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Masukkan nama produk"
            required
            className="form-control text-neutral-800 dark:text-white"
            disabled={processing}
          />
          {/* Display validation errors from useForm's errors object */}
          {errors.name && (
            <p className="!text-danger-600 mt-1 text-sm">{errors.name}</p>
          )}
        </div>

        <div className="mb-4 text-neutral-800 dark:text-white">
          <label htmlFor="stock" className="block mb-1">
            Stok Produk
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={data.stock}
            onChange={(e) => setData('stock', e.target.value)}
            placeholder="Masukkan stok produk"
            required
            className="form-control text-neutral-800 dark:text-white"
            disabled={processing}
          />
          {/* Display validation errors from useForm's errors object */}
          {errors.stock && (
            <p className="!text-danger-600 mt-1 text-sm">{errors.stock}</p>
          )}
        </div>

        <div className="mb-4 text-neutral-800 dark:text-white">
          <label className="block mb-1">Kategori</label>
          <Select
            options={categories}
            onChange={handleCategorySelect}
            value={
              categories.find((opt) => opt.value === data.category_id) || null
            }
            isClearable
            placeholder="Pilih kategori..."
            className="my-react-select-container"
            classNamePrefix="my-react-select"
            styles={{
              menu: (base) => ({ ...base, zIndex: 999 }), // Tambahkan ini
            }}
            required
          />
          {errors.category_id && (
            <p className="!text-danger-600 mt-1">
              {Array.isArray(errors.category_id)
                ? errors.category_id.join(', ')
                : errors.category_id}
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
