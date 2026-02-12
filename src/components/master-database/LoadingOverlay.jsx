export function LoadingOverlay({ isVisible, message = "Processing..." }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        {/* Message */}
        <p className="text-lg font-semibold text-gray-800">{message}</p>
      </div>
    </div>
  );
}
