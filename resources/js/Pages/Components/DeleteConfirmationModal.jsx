import FormModal from './FormModal'; // Assuming this is your general modal component

export default function DeleteConfirmationModal({ open, onClose, onConfirm, title, message }) {
    return (
        <FormModal open={open} onClose={onClose}>
            <h2 className="text-lg font-bold mb-3">{title || 'Confirm Deletion'}</h2>
            <p>{message || 'Are you sure you want to delete this item?'}</p>
            <div className="flex justify-end gap-2 mt-4">
                <button
                    className="px-3 py-1 rounded border text-neutral-800 dark:text-white dark:border-neutral-600"
                    onClick={onClose}
                >
                    Batal
                </button>
                <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={onConfirm}
                >
                    Hapus
                </button>
            </div>
        </FormModal>
    );
}