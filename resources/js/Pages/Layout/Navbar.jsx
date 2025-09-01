import { Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Navbar({ toggleSidebar }) {
  const [isDark, setIsDark] = useState(false)
  const { auth } = usePage().props

  useEffect(() => {
    const dark = localStorage.getItem('color-theme') === 'dark'
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('color-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }
  return (
    <div className="navbar-header border-b border-neutral-200 dark:border-neutral-600">
      <div className="flex items-center justify-between">
        <div className="col-auto">
          <div className="flex flex-wrap items-center gap-[16px]">
            <button type="button" className="sidebar-toggle">
              <iconify-icon
                icon="heroicons:bars-3-solid"
                className="icon non-active"
              ></iconify-icon>
              <iconify-icon
                icon="iconoir:arrow-right"
                className="icon active"
              ></iconify-icon>
            </button>
            <button
              type="button"
              className="sidebar-mobile-toggle d-flex !leading-[0]"
              onClick={toggleSidebar}
            >
              <iconify-icon
                icon="heroicons:bars-3-solid"
                className="icon !text-[30px]"
              ></iconify-icon>
            </button>
            <form className="navbar-search">
              <input type="text" name="search" placeholder="Search" />
              <iconify-icon
                icon="ion:search-outline"
                className="icon"
              ></iconify-icon>
            </form>
          </div>
        </div>
        <div className="col-auto">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              id="theme-toggle"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-white"
            >
              <span
                id="theme-toggle-dark-icon"
                className={isDark ? 'hidden' : ''}
              >
                <i className="ri-sun-line"></i>
              </span>
              <span
                id="theme-toggle-light-icon"
                className={isDark ? '' : 'hidden'}
              >
                <i className="ri-moon-line"></i>
              </span>
            </button>

            <button
              data-dropdown-toggle="dropdownProfile"
              className="flex items-center justify-center rounded-full"
              type="button"
            >
              <img
                src="/stock/assets/images/user.png"
                alt="image"
                className="object-fit-cover h-10 w-10 rounded-full"
              />
            </button>

            {/* dropdown profile */}
            <div
              id="dropdownProfile"
              className="dropdown-menu-sm z-10 hidden rounded-lg bg-white p-3 shadow-lg dark:bg-neutral-700"
            >
              <div className="mb-4 flex items-center justify-between gap-2 rounded-lg bg-primary-50 px-4 py-3 dark:bg-primary-600/25">
                <div>
                  <h6 className="mb-0 text-lg font-semibold text-neutral-900">
                    {auth.user.name}
                  </h6>
                  <span className="text-neutral-500">Admin</span>
                </div>
                <button type="button" className="hover:text-danger-600">
                  <iconify-icon
                    icon="radix-icons:cross-1"
                    className="icon text-xl"
                  ></iconify-icon>
                </button>
              </div>

              <div className="scroll-sm max-h-[400px] overflow-y-auto pe-2">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      className="flex items-center gap-4 px-0 py-2 text-black hover:text-danger-600"
                      href={route('logout')}
                    >
                      <iconify-icon
                        icon="lucide:power"
                        className="icon text-xl"
                      ></iconify-icon>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
