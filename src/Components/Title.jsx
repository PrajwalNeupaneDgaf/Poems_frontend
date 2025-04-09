import React from 'react'

const Title = ({pageNo,items,goToPage}) => {
  console.log(items)
  return (
    <div className={pageNo%2==0?'bg-gray-300 h-full':'bg-[#00000033] h-full'}>
        <div className='text-center py-4'>
            <strong>
                Contents ({pageNo+1})
            </strong>
        </div>
        <div className='flex flex-col gap-2'>
          {
            items.map((itm,idx)=>{
                return (
                    <div onClick={()=>{
                      goToPage(itm.page)
                    }} key={idx} className='px-4 cursor-pointer flex gap-4 font-sans'>
                    <strong className='w-8 text-center font-thin'>
                       { idx+1 +(pageNo*14)})
                    </strong>
                    <strong className='text-md'>
                        {itm.title}
                    </strong>
                </div>
                )
            })
          }
        </div>
    </div>
  )
}

export default Title