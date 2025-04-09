import React from "react";
import { Box, Skeleton } from "@chakra-ui/react";

const LoadingHome = () => {
  return (
    <div className="flex gap-3 justify-center items-center h-[100vh] w-[100vw]">
      <div className="min-w-[60vw] min-h-[70vh] p-8">
        <Skeleton height={"18rem"} borderRadius={'1rem'}></Skeleton>
        <div className="flex flex-row gap-5 mt-6">
        <Skeleton height={"4rem"} borderRadius={'1rem'} w={'full'}></Skeleton>
        <Skeleton height={"4rem"} borderRadius={'1rem'} w={'14rem'}></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default LoadingHome;
