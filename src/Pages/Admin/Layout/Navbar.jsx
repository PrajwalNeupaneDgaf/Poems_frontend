import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IoIosAdd,
  IoIosHome,
  IoIosLogOut,
  IoIosRefresh,
  IoIosSettings,
} from "react-icons/io";
import { useData } from "../../../Context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { setisAuthorized} = useData()

  const handleClick = (e) => {
   navigate(`/admin${e}`)
  };
  return (
    <div className="fixed top-0 left-0 right-0 px-4 md:px-8 py-4 flex justify-between bg-gray-50 items-center z-30 shadow-sm">
      <strong
        onClick={() => {
          navigate("/");
        }}
        className="flex items-center md:text-2xl text-lg cursor-pointer select-none font-[Navbar]"
      >
        <img src="/MYPOET.gif" alt="My Poet" className="h-12 w-12" />
        POETHUB
      </strong>

      <div className="flex flex-row gap-4 md:gap-8 items-center">
        <nav  id="Navlink" className="flex gap-2 md:gap-4">
          <button onClick={()=>handleClick('/')} className="navbtn" >
            <span className="block md:hidden">
              <IoIosHome size={"1.5rem"} />
            </span>
            <span className="hidden md:block">Home</span>
          </button>
          <button onClick={()=>handleClick('/add')} className="navbtn">
            <span className="block md:hidden">
              <IoIosAdd size={"1.9rem"} />
            </span>
            <span className="hidden md:block">Add</span>
          </button>
          <button onClick={()=>handleClick('/textify')} className="navbtn" >
            <span className="block md:hidden">
              <IoIosRefresh size={"1.5rem"} />
            </span>
            <span className="hidden md:block">Textify</span>
          </button>
        </nav>

        <Button
          onClick={()=>{
            localStorage.removeItem('token')
            setisAuthorized(false)
          }}
          _hover={{
            bg: "white",
            textColor: "black",
          }}
          bg={"black"}
          textColor={"white"}
          px={"1rem"}
          borderRadius={["full", "full", "md", "md"]}
          transition={"all .7s"}
          border={"1px solid black"}
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <span>
            <IoIosLogOut size={"1.4rem"} />
          </span>
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
