import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "./Layout/Layout";
import api from "../../api";

const PoemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  const [poem, setpoem] = useState({})

  useEffect(()=>{
    api.get(`/poem/get/${id}`)
    .then(res=>{
      setpoem(res.data)
      console.log(res)
    })
    .catch(()=>{
      navigate(-1)
    })
  },[id])

  // Function to delete the poem (simulation)
  const handleDeletePoem = () => {
    setIsDeleting(true);
    api
      .delete(`/poem/delete/${id}`)
      .then(() => {
        toast({
          title: "Poem Deleted",
          description: `The poem "${poem.title}" has been deleted successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/admin");
      })
      .catch((err) => {
        toast({
          title: "Poem Deleted unsuccesfull",
          description: err.response.data.message ||err.message||`error Occured`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsDeleting(false);
        onClose();
      });
  };

  return (
    <Layout>
      <Box maxW="6xl" mx="auto" p={6} bg="gray.50">
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          mb={6}
          fontWeight="extrabold"
          color="gray.900"
        >
          {poem.title}
        </Heading>

        <VStack spacing={4} align="stretch" mb={6}>
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            Poem Content:
          </Text>
          <Box
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            bg="white"
            whiteSpace="pre-wrap"
            boxShadow="sm"
            overflow="hidden"
            fontFamily="'Merriweather', serif"
          >
            {poem?.stanzas?.map((stanza, index) => (
              <Box key={index} mb={4}>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="1.8"
                  color="gray.700"
                  textAlign="justify"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {stanza}
                </Text>
              </Box>
            ))}
          </Box>
        </VStack>

        <Button
          colorScheme="green"
          leftIcon={<FaEdit />}
          onClick={() => {
            navigate(`/admin/manage/${id}`);
          }}
          size="lg"
          w="full"
          mt={4}
        >
          Edit Poem
        </Button>
        <Button
          colorScheme="red"
          leftIcon={<FaTrashAlt />}
          onClick={onOpen}
          size="lg"
          w="full"
          mt={4}
        >
          Delete Poem
        </Button>

        {/* AlertDialog for Confirmation */}
        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm Deletion
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete the poem titled "{poem.title}"?
                This action cannot be undone.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                  isDisabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleDeletePoem}
                  isLoading={isDeleting}
                  loadingText="Deleting"
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Layout>
  );
};

export default PoemDetails;
