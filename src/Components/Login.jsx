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
import api from "../api";
import { useData } from "../Context/UserContext";

const Login = ({ setIndex }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ButtonLoading, setButtonLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const {setisAuthorized,isAuthorized , setUser} = useData()

  useEffect(()=>{
    if(isAuthorized){
      navigate('/admin')
    }
  },[isAuthorized])

  const handleLogin = (e) => {
    e.preventDefault()
    if (username && password) {
      setButtonLoading(true);
      api
        .post("/user/login", { username, password })
        .then((res) => {
          setisAuthorized(true)
          navigate('/admin')
          setUser(res.data.User)
          localStorage.setItem('token',res.data.token)
          console.log(res.data)
          toast({
            title: "Login Success",
            description: `Welcome back, ${username}!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "Error",
            description:  error.response.data.message ||error.message ||"Error Occcured in Login",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }).finally(()=>{
          setButtonLoading(false)
        })
    } else {
      toast({
        title: "Error",
        description: "Please enter both username and password.",
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
            Login
          </Heading>

          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            disabled={ButtonLoading}
            bg={"black"}
            color={"white"}
            _hover={{
              bg: "black",
              boxShadow: "3px 3px 3px white, inset 3px 3px 2px grey",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Text textAlign="center" fontSize="sm">
            Don't have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => setIndex(1)}
              _hover={{ textDecoration: "underline" }}
            >
              Register
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
