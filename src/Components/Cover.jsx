import React from 'react'

const Cover = ({user}) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 flex items-center justify-center">
    {/* Initial letter */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold text-white drop-shadow-lg tracking-wide">
      {user?.name?.split('')[0].toUpperCase()}
    </div>
  
    {/* Author name */}
    <div className="absolute bottom-10 text-white text-lg font-light tracking-widest italic">
      author: <span className="font-medium not-italic">@{user?.username}</span>
    </div>
  </div>
  
  )
}

export default Cover