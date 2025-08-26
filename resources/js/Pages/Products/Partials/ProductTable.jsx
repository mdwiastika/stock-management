import React, { useMemo, useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { router } from '@inertiajs/react'
import { Icon } from '@iconify/react'

// Helper function for pagination numbers
function getPaginationNumbers(current, last) {
  const delta = 2
  const range = []
  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(last - 1, current + delta);
    i++
  ) {
    range.push(i)
  }
  if (current - delta > 2) range.unshift('...')
  if (current + delta < last - 1) range.push('...')
  if (last > 1 && !range.includes(1)) range.unshift(1)
  if (last > 1 && !range.includes(last)) range.push(last)
  return [...new Set(range)].sort((a, b) => {
    if (a === '...') return 1
    if (b === '...') return -1
    return a - b
  })
}

export default function ProductTable({
  products,
  filters,
  sortBy,
  sortDirection,
  onEdit,
  onDelete,
}) {
  const [columnFilters, setColumnFilters] = useState(filters)
  const [sorting, setSorting] = useState([
    {
      id: sortBy,
      desc: sortDirection === 'desc',
    },
  ])

  // Sync filters and sorting with props when they change
  useEffect(() => {
    setColumnFilters(filters)
  }, [filters])

  useEffect(() => {
    setSorting([{ id: sortBy, desc: sortDirection === 'desc' }])
  }, [sortBy, sortDirection])

  const columns = useMemo(
    () => [
      {
        header: 'No',
        accessorKey: 'id',
        id: 'index_number',
        cell: (info) =>
          info.row.index + 1 + (products.current_page - 1) * products.per_page,
        enableSearch: false,
        enableSorting: false,
      },
      {
        header: 'Nama',
        accessorKey: 'name',
        id: 'name',
        enableSearch: true,
        enableSorting: true,
      },
      {
        header: 'Stok',
        accessorKey: 'stock',
        id: 'stock',
        enableSearch: true,
        enableSorting: true,
      },
      {
        header: 'Kategori',
        accessorKey: 'category.name',
        id: 'category',
        enableSearch: true,
        enableSorting: true,
      },
      {
        header: 'Aksi',
        id: 'actions',
        cell: (info) => (
          <div className="flex gap-2">
            <button
              className="px-4 py-1 btn bg-warning-600 dark:bg-warning-600 dark:hover:bg-warning-600 hover:bg-warning-600 text-white hover:text-white rounded-full flex items-center gap-2"
              onClick={() => onEdit(info.row.original)}
            >
              <Icon icon={'mdi:pencil-outline'} width="20" height="20" />
              Edit
            </button>
            <button
              className="px-4 py-1 btn bg-danger-600 dark:bg-danger-600 dark:hover:bg-danger-600 hover:bg-danger-600 text-white hover:text-white rounded-full flex items-center gap-2"
              onClick={() => onDelete(info.row.original.id)}
            >
              <Icon icon={'mdi:trash-can-outline'} width="20" height="20" />
              Hapus
            </button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
        enableHiding: false,
        enableResizing: false,
        enableSearch: false,
      },
    ],
    [products.current_page, products.per_page, onEdit, onDelete],
  )

  const table = useReactTable({
    data: products.data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: products.last_page,
  })

  // Handle search input changes
  const handleSearch = (columnId, value) => {
    const newFilters = { ...columnFilters, [columnId]: value }
    setColumnFilters(newFilters)
    router.get(
      route('products.index'),
      {
        filters: newFilters,
        sortBy: sorting[0]?.id,
        sortDirection: sorting[0]?.desc ? 'desc' : 'asc',
        page: 1,
      },
      {
        preserveState: true,
        replace: true,
      },
    )
  }

  // Handle sort column clicks
  const handleSort = (columnId) => {
    const newDesc = sorting[0]?.id === columnId && !sorting[0]?.desc
    const newSorting = [{ id: columnId, desc: newDesc }]
    setSorting(newSorting)

    router.get(
      route('products.index'),
      {
        filters: columnFilters,
        sortBy: columnId,
        sortDirection: newDesc ? 'desc' : 'asc',
        page: products.current_page,
      },
      {
        preserveState: true,
        replace: true,
      },
    )
  }

  // Handle pagination button clicks
  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > products.last_page ||
      page === products.current_page
    ) {
      return
    }
    router.get(
      route('products.index'),
      {
        filters: columnFilters,
        sortBy: sorting[0]?.id,
        sortDirection: sorting[0]?.desc ? 'desc' : 'asc',
        page: page,
      },
      {
        preserveState: true,
        replace: true,
      },
    )
  }

  const paginationNumbers = getPaginationNumbers(
    products.current_page,
    products.last_page,
  )

  return (
    <div className="table-responsive">
      <table className="table bordered-table rounded-lg border-separate">
        <thead className="rounded-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-white rounded-lg"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={
                    'p-2 rounded-lg ' +
                    (header.column.getCanSort() ? 'cursor-pointer' : '') +
                    (header.column.id === 'index_number'
                      ? 'whitespace-nowrap w-28 '
                      : '') +
                    (header.column.id === 'actions'
                      ? 'w-[238px] text-center'
                      : '')
                  }
                  onClick={() =>
                    header.column.getCanSort() && handleSort(header.column.id)
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getCanSort() &&
                    sorting[0]?.id === header.column.id &&
                    (sorting[0]?.desc ? (
                      <Icon
                        icon="mdi:arrow-down"
                        className="text-lg ml-2 inline-block"
                      />
                    ) : (
                      <Icon
                        icon="mdi:arrow-up"
                        className="text-lg ml-2 inline-block"
                      />
                    ))}
                </th>
              ))}
            </tr>
          ))}
          <tr>
            {columns.map((col) =>
              col.enableSearch ? (
                <th key={col.id || col.accessorKey} className="">
                  <input
                    type="text"
                    className="form-control text-neutral-800 dark:text-white"
                    defaultValue={filters[col.accessorKey] || ''}
                    placeholder={`Cari ${col.header}`}
                    onInput={(e) =>
                      handleSearch(col.accessorKey, e.target.value)
                    }
                  />
                </th>
              ) : (
                <th key={col.id || col.accessorKey}></th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.original.id}
              className="border-t text-neutral-800 dark:text-white"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-2 text-center text-neutral-500"
              >
                <div className="text-center">
                  Tidak ada data yang ditemukan.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <ul className="pagination flex flex-wrap items-center gap-2 justify-center mt-6">
        <li className="page-item">
          <a
            className="page-link !border-neutral-700 dark:bg-neutral-700 text-neutral-700 dark:text-white border dark:border-0 dark:!border-neutral-700 bg-white font-medium rounded-lg px-5 py-2.5 flex items-center justify-center h-[48px]"
            href="javascript:void(0)"
          >
            Page {products.current_page} of {products.last_page}
          </a>
        </li>
        {/* Prev */}
        <li className="page-item">
          <button
            className="page-link !border-neutral-700 dark:bg-neutral-700 text-neutral-700 dark:text-white border dark:border-0 dark:!border-neutral-700 bg-white text-secondary-light font-medium rounded-lg px-5 py-2.5 flex items-center justify-center h-[48px] w-[48px] disabled:opacity-60"
            disabled={products.current_page === 1}
            onClick={() => handlePageChange(products.current_page - 1)}
          >
            <Icon icon="ep:d-arrow-left" className="text-xl" />
          </button>
        </li>
        {/* Numbered pages & ellipsis */}
        {paginationNumbers.map((n, idx) =>
          n === '...' ? (
            <li className="page-item" key={`ellipsis-${idx}`}>
              <a
                className="page-link !border-neutral-700 dark:bg-neutral-700 text-neutral-700 dark:text-white border dark:border-0 dark:!border-neutral-700 bg-white text-secondary-light font-medium rounded-lg px-5 py-2.5 flex items-center justify-center h-[48px] w-[48px] cursor-default"
                href="javascript:void(0)"
              >
                ...
              </a>
            </li>
          ) : (
            <li className="page-item" key={`page-${n}`}>
              <button
                className={`page-link dark:bg-neutral-700 text-neutral-700 dark:text-white border dark:border-0 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center h-[48px] w-[48px] ${
                  products.current_page === n
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-neutral-700 text-secondary-light'
                }`}
                onClick={() => handlePageChange(n)}
                disabled={products.current_page === n}
              >
                {n}
              </button>
            </li>
          ),
        )}
        {/* Next */}
        <li className="page-item">
          <button
            className="page-link !border-neutral-700 dark:bg-neutral-700 text-neutral-700 dark:text-white border dark:border-0 dark:!border-neutral-700 bg-white text-secondary-light font-medium rounded-lg px-5 py-2.5 flex items-center justify-center h-[48px] w-[48px] disabled:opacity-60"
            disabled={products.current_page === products.last_page}
            onClick={() => handlePageChange(products.current_page + 1)}
          >
            <Icon icon="ep:d-arrow-right" className="text-xl" />
          </button>
        </li>
        {/* Last */}
        <li className="page-item">
          <button
            className="page-link !border-neutral-700 dark:bg-neutral-700 text-neutral-700 dark:text-white border dark:border-0 dark:!border-neutral-700 bg-white text-secondary-light font-medium rounded-lg px-5 py-2.5 flex items-center justify-center h-[48px]"
            disabled={products.current_page === products.last_page}
            onClick={() => handlePageChange(products.last_page)}
          >
            Last
          </button>
        </li>
      </ul>
    </div>
  )
}
