import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import api from "../../api";

const AdminHome = () => {
  // Sample poem titles (this can be fetched from an API or a database)
  const [poems, setpoems] = useState([])

  const navigate = useNavigate();

  // Function to navigate to the poem management page
  const handleNavigate = (e,id) => {
    e.stopPropagation()
    navigate(`/admin/manage/${id}`);
  };

  useEffect(() => {
    api.get('/poem/getall')
    .then((res)=>{
      console.log(res.data)
      setpoems(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  
   
  }, [])
  

  return (
    <Layout>
      <Box maxW="6xl" mx="auto" p={6} bg="gray.50">
        {/* <Heading as="h1" size="md" textAlign="center" mb={8}>
          Admin Home - Poem Titles
        </Heading> */}

        <VStack spacing={4} align="stretch">
          {poems?.map((poem) => (
            <Box
              key={poem._id}
              p={4}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="white"
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              onClick={()=>{
                navigate(`/admin/poemDetails/${poem._id}`)
              }}
            >
              <Text fontSize={'md'}>
                {poem.title}
              </Text>
              <Button
                onClick={(e) => handleNavigate(e,poem._id)}
                leftIcon={<FaPen />}
                colorScheme="blue"
                variant="outline"
                size="sm"
              >
                Manage
              </Button>
            </Box>
          ))}

          {
            poems.length==0 && (
              <div className="text-3xl font-semibold text-center py-12">
                SORRY NO POEMS UPLOADED
              </div>
            )
          }
        </VStack>
      </Box>
    </Layout>
  );
};

export default AdminHome;
