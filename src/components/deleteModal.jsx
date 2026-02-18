export default function ConfirmModal({ isOpen, onConfirm, onCancel, item }) {
  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
      <div className="modal bg-white p-6 rounded-lg w-80 relative">
        <div>
        <p 
        className="border border-black flex justify-center  text-2xl font-bold mb-2">
            confirm to delete "{item.name}"?</p>
        </div>
        <div className="flex justify-center gap-2 border border-black">
            <button className="left-2 bg-green-300 w-16 rounded-sm" onClick={onConfirm}>Yes</button>
            <button onClick={onCancel} className="bg-primary w-16 rounded-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}
