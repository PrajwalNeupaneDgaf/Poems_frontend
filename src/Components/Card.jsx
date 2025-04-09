import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({Name,UserName,id}) => {
    const navigate = useNavigate()
  return (
    <div onClick={()=>{
        navigate(`/book/${UserName}`)
    }} className='flex flex-row w-full rounded-xl items-center bg-gray-100 hover:bg-slate-100 py-2 cursor-pointer px-3'>
        <div className='aspect-square text-white h-20  bg-gray-900 rounded-full flex justify-center items-center text-3xl'>
           K
        </div>
        <div className='w-full h-20 p-3 '>
            <strong>
                {Name}
            </strong>
            <p className='text-sm px-2 w-full '>
               @{UserName}
            </p>
        </div>
    </div>
  )
}

export default Card