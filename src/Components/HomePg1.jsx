import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePg1 = () => {
  const [Search, setSearch] = useState("");
  const [IsGoingOut, setIsGoingOut] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="px-4 flex h-[100vh] max-w-[100vw] justify-center items-center ">
      <div className="py-12 w-[100%] md:w-[33rem] flex flex-col gap-2 justify-center items-center">
        <Box
          w={"full"}
          border={"1px solid grey"}
          className="p-2 rounded-lg flex gap-1 items-center"
        >
          <input
            type="text"
            value={Search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="border-none outline-none w-full"
            placeholder="Search UserName"
          />
          <button
            onClick={() => {
              if (Search) {
                navigate(`/search/${Search}`);
              }
            }}
          >
            <IoSearchOutline />
          </button>
        </Box>
        <strong>Or</strong>
        <Button
          onClick={() => {
            navigate("/admin");
          }}
          onMouseEnter={() => {
            setIsGoingOut(true);
          }}
          onMouseLeave={() => {
            setIsGoingOut(false);
          }}
          bg={"black"}
          overflow={"hidden"}
          border={"1px solid black"}
          fontSize={"lg"}
          transformOrigin={"left"}
          transition={"all .4s"}
          textColor={"white"}
          _hover={{
            bg: "white",
            color: "black",
          }}
          w={"full"}
          p={"1.4rem"}
          className="font-white"
        >
          Admin Pannel{" "}
          <motion.div
            className="mx-1"
            animate={
              IsGoingOut
                ? {
                    x: [0, 220],
                  }
                : { x: [220, 0] }
            }
            transition={{
              duration: 1,
            }}
          >
            {" "}
            <FaArrowRight />
          </motion.div>
        </Button>
      </div>
    </div>
  );
};

export default HomePg1;
