export default function Loading({ text = "loading... "}) {
    return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </div>
    )
}