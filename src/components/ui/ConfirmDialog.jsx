import React from 'react';

function ConfirmDialog({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border-2 border-white/20 shadow-[3px_3px_#000000] z-50 max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-white">Confirm Delete</h2>
        <p className="mb-6 text-white/70">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg border-2 bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog; 