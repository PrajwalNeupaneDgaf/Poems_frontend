import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../Components/Card";
import LoadingHome from "../Components/LoadingHome";
import api from "../api";

const SearchResult = () => {
  const { text: Text } = useParams();
  const navigate = useNavigate()

  const [Loading, setLoading] = useState(true)
  const [User, setUser] = useState([]);

  useEffect(()=>{
    api.get(`/user/search/${Text}`)
    .then((res)=>{
      setUser(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  if(Loading) return <LoadingHome/>
  return (
    <div className="">
      <Navbar />
      <div className="pt-24 px-4 py-6 flex items-center text-sm md:px-8 mb-2 bg-gray-50">
            <span onClick={()=>{
                navigate('/')
            }} className="text-black font-semibold cursor-pointer text-[1rem]  select-none mx-1">
                Home
            </span>
             ›search/{Text}
      </div>
      <div className="px-4 flex flex-col gap-3 md:px-8">
       {
        User?.map((itm,idx)=><Card Name={itm.name} UserName={itm.username} id={itm._id} key={idx} />)
       }
       {
        User.length==0 && (
          <div className="text-3xl font-semibold py-12 text-center">
            NO USER FOUND
          </div>
        )
       }
      </div>
    </div>
  );
};

export default SearchResult;
