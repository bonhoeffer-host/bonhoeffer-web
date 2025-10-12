
function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#989b2e]"></div>
        <p className="text-white text-xl mt-4">Loading...</p>
    </div>
  )
}

export default Loading