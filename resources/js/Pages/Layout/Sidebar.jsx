import { Icon } from '@iconify/react'
import { Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Sidebar({ isOpen, onClose }) {
  const { url } = usePage()
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    if (url.startsWith('/manual-attendance')) {
      setOpenDropdown(1)
    } else if (url.startsWith('/scan-attendance')) {
      setOpenDropdown(2)
    } else if (url.startsWith('/reports')) {
      setOpenDropdown(3)
    } else {
      setOpenDropdown(null)
    }
  }, [url])

  const isActive = (routePrefix, exact = false) => {
    return exact ? url === routePrefix : url.startsWith(routePrefix)
  }

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  return (
    <aside className={'sidebar' + (isOpen ? ' sidebar-open' : '')}>
      <button
        type="button"
        className="sidebar-close-btn !mt-4"
        onClick={onClose}
      >
        <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
      </button>

      <div>
        <a href={`${route('home')}`} className="sidebar-logo">
          <img
            src="/assets/images/logo.png"
            alt="site logo"
            className="light-logo"
          />
          <img
            src="/assets/images/logo-light.png"
            alt="site logo"
            className="dark-logo"
          />
          <img
            src="/assets/images/logo-icon.png"
            alt="site logo"
            className="logo-icon"
          />
        </a>
      </div>

      <div className="sidebar-menu-area">
        <ul className="sidebar-menu" id="sidebar-menu">
          {/* Dashboard - Generally accessible to all authenticated users */}
          <li className={isActive('/', true) ? 'active-page' : ''}>
            <Link
              href={route('home')}
              className={
                'menu-link' + (isActive('/', true) ? ' active-page' : '')
              }
            >
              <iconify-icon
                icon="solar:home-smile-angle-outline"
                className="menu-icon"
              />
              <span>Dashboard</span>
            </Link>
          </li>
          {/* Master Data */}
          <li className="sidebar-menu-group-title">Master Data</li>

          <li className={isActive('/categories') ? 'active-page' : ''}>
            <Link
              href={route('home')}
              className={
                'menu-link' + (isActive('/categories') ? ' active-page' : '')
              }
            >
              <iconify-icon icon="mdi:folder-outline" className="menu-icon" />
              <span>Kategori</span>
            </Link>
          </li>

          <li className={isActive('/products') ? 'active-page' : ''}>
            <Link
              href={route('home')}
              className={
                'menu-link' + (isActive('/products') ? ' active-page' : '')
              }
            >
              <iconify-icon
                icon="fluent-mdl2:product-variant"
                className="menu-icon"
              />
              <span>Produk</span>
            </Link>
          </li>

          <li className={isActive('/transactions') ? 'active-page' : ''}>
            <Link
              href={route('home')}
              className={
                'menu-link' + (isActive('/transactions') ? ' active-page' : '')
              }
            >
              {/* iconify yang cocok untuk transaksi */}
              <iconify-icon
                icon="tdesign:undertake-transaction"
                className="menu-icon"
              />
              <span>Transaksi</span>
            </Link>
          </li>

          {/* Reports */}
          <li className={isActive('/reports') ? 'active-page' : ''}>
            <Link
              href={route('home')}
              className={
                'menu-link' + (isActive('/reports') ? ' active-page' : '')
              }
            >
              <iconify-icon
                icon="hugeicons:transaction-history"
                className="menu-icon"
              />
              <span>Laporan</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
