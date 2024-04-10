import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  useToast,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const data = await res.json();
      // if (res.status === 200) {
      //   login(data.token, data.user);
      //   navigate("/");
      //   toast({
      //     title: "Sign up successful",
      //     status: "success",
      //     duration: 5000,
      //     isClosable: true,
      //   });
      // }
      setFormData({ name: "", email: "", password: "" });
      setLoading(false);
      navigate("/signin");
      console.log(res);
      return toast({
        title: "Sign up successful",
        description: "Your account has been created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to sign up. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Container
        maxW="lg"
        zIndex={1}
        mt={"24"}
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack
          spacing="8"
          backgroundColor={"background"}
          p={7}
          borderRadius={"xl"}
          boxShadow={{ base: "none", sm: "md" }}
        >
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>
                Register your account
              </Heading>
              <Text color="fg.muted">
                Do you have an account? <Link to="/signin">Sign in</Link>
              </Text>
            </Stack>
          </Stack>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box py={{ base: "6", sm: "8" }} px={{ base: "4", sm: "10" }}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Name"
                      isRequired
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      isRequired
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      isRequired
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Stack>

                <Stack spacing="6">
                  <Button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSubmit}
                    colorScheme="blue"
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </motion.div>
        </Stack>
      </Container>
    </motion.div>
  );
};

export default SignUp;
