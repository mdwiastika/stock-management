import React, { useEffect } from 'react'
import FormModal from '../../Components/FormModal'
import { useForm } from '@inertiajs/react'

export default function CategoryFormModal({
  open,
  onClose,
  isEdit,
  formData,
  errors,
}) {
  const { data, setData, post, put, processing, reset, clearErrors } = useForm({
    name: formData.name || '',
    description: formData.description || '',
  })

  useEffect(() => {
    if (open) {
      setData('name', formData.name || '')
      setData('description', formData.description || '')
      clearErrors()
    } else {
      reset()
    }
  }, [open, formData.name, formData.description])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      put(route('categories.update', { category: formData.id }), {
        onSuccess: () => {
          onClose()
        },
        onError: (validationErrors) => {
          console.error('Update validation errors:', validationErrors)
        },
        preserveScroll: true,
      })
    } else {
      post(route('categories.store'), {
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

  return (
    <FormModal open={open} onClose={onClose}>
      <h2 className="text-lg font-bold mb-3">
        {isEdit ? 'Edit Kategori' : 'Tambah Kategori'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-neutral-800 dark:text-white">
          <label htmlFor="name" className="block mb-1">
            Nama Kategori
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Masukkan nama kategori"
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
          <label htmlFor="description" className="block mb-1">
            Deskripsi Kategori
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            placeholder="Masukkan deskripsi kategori"
            required
            className="form-control text-neutral-800 dark:text-white"
            disabled={processing}
          />
          {/* Display validation errors from useForm's errors object */}
          {errors.description && (
            <p className="!text-danger-600 mt-1 text-sm">
              {errors.description}
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
