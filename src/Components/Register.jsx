import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useData } from "../Context/UserContext";
import api from "../api";

const Register = ({ setIndex }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ButtonLoading, setButtonLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const { setisAuthorized, isAuthorized, setUser } = useData();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/admin");
    }
  }, [isAuthorized]);

  const handleRegister = (e) => {
    e.preventDefault()
    if (name && username && password) {
      setButtonLoading(true);
      api
        .post("/user/register", { username, password,name })
        .then((res) => {
          setisAuthorized(true);
          console.log(res.data);
          navigate("/admin");
          setUser(res.data.User);
          localStorage.setItem('token',res.data.token)
          toast({
            title: "Register Success",
            description: `Welcome back, ${username}!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: "Error",
            description:
            error.response.data.message ||
            error.message ||
              "Error Occcured in Register",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setButtonLoading(false);
        });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100%"
      h="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <Box w="full" maxW="sm" p={8} bg="white" boxShadow="md" borderRadius="lg">
        <VStack spacing={4} align="stretch">
          <Heading size="lg" textAlign="center">
            Register
          </Heading>

          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            disabled={ButtonLoading}
            bg="black"
            color="white"
            _hover={{
              bg: "black",
              boxShadow: "3px 3px 3px white, inset 3px 3px 2px grey",
            }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Text textAlign="center" fontSize="sm">
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => setIndex(0)}
              _hover={{ textDecoration: "underline" }}
            >
              Login
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Register;
