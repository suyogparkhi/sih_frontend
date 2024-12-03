import React from 'react'

export default function LoadingPopup({message}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4785FF] mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">{message}</p>
        <p className="text-sm text-gray-500 mt-2">
          {message === 'Testing in progress...' && 'This may take few time'}
        </p>
      </div>
    </div>
  )
}

