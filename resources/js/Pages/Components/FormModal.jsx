import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

export default function FormModal({ open, onClose, children }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      {/* Overlay */}
      <DialogBackdrop className="fixed inset-0 bg-black/30 !backdrop-blur-sm" />
      {/* Modal Panel */}
      <div className="fixed inset-0 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative z-10 w-full max-w-md mx-auto inset-0 overflow-y-auto">
            <DialogPanel
              className="
            bg-white dark:bg-neutral-800
            p-6 sm:p-8
            rounded-2xl
            shadow-2xl
            ring-1 ring-black/10 dark:ring-white/10
            focus:outline-none
            transition-all
            w-full
            "
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
