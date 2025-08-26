import { useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 dark:text-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="dashboard-main">
        <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        {children}
        <Footer />
      </main>
    </div>
  )
}
