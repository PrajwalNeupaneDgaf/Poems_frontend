import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [showAdmin, setshowAdmin] = useState(false)

    // useEffect(()=>{
    //     window.addEventListener('scroll',handleScroll)

    //     return ()=>{
    //         window.removeEventListener('scroll',handleScroll)
    //     }
    // },[])
    // const handleScroll = ()=>{
    //     if(window.scrollY>300){
    //         setshowAdmin(true)
    //     }else{
    //        setshowAdmin(false)
    //     }
    // }
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        if(location.pathname!=='/' && !location.pathname.startsWith('/auth')){
            setshowAdmin(true)
        }
    },[])
  return (
    <div className='fixed top-0 left-0 right-0 px-4 md:px-8 py-4 flex justify-between bg-gray-50 items-center z-30 shadow-sm'>
        <strong onClick={()=>{
            navigate('/')
        }} className='flex items-center md:text-2xl text-lg cursor-pointer select-none font-[Navbar]'>
            <img src="/MYPOET.gif" alt="My Poet"  className='h-12 w-12'/>POETHUB
        </strong>
   
       {showAdmin&&(
            <Button onClick={()=>{
                navigate('/admin')
            }} _hover={{
                bg:"white",
                textColor:'black'
            }} bg={'black'} textColor={'white'} px={'2rem'} borderRadius={'md'} transition={'all .7s'} border={'1px solid black'}>
                Visit Profile
            </Button>
        )
        }
       
    </div>
  )
}

export default Navbar