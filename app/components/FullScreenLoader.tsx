"use client";
export default function FullScreenLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white mb-4"></div>
      <h2 className="text-xl font-semibold">Redirecting...</h2>
      <p className="text-sm text-gray-400 mt-2">Please wait while we get things ready for you...</p>
    </div>
  );
}
