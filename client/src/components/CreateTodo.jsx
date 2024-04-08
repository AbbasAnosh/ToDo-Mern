import React, { useState } from "react";
import {
  FormControl,
  Input,
  Button,
  useToast,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";

import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme({ breakpoints });

const CreateTodo = ({ onAddTodo }) => {
  const [todo, setTodo] = useState({
    name: "",
    description: "",
    completed: false,
  });
  const toast = useToast();

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
      [e.target.description]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      name: todo.name,
      description: todo.description,
      completed: todo.completed,
      date: new Date(),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/todos",
        newData
      );
      onAddTodo(true);
      setTodo({ name: "", description: "", completed: false });
      toast({
        title: "Todo added.",
        description: "Your todo has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(response);
    } catch (error) {
      console.error("Failed to add todo", error);
      toast({
        title: "Error",
        description: "Failed to add todo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        display={{ base: "block", md: "flex" }}
        alignItems="end"
        gap="2"
        padding="1rem"
        mb={"1.5rem"}
        shadow="20px"
        rounded="6px"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Stack>
            <Input
              variant="filled"
              placeholder="What is the name of the todo?"
              isRequired
              name="name"
              value={todo.name}
              onChange={handleChange}
              size={{ base: "sm", md: "md" }}
              px="4"
              py="6"
              width="auto"
              minWidth={{ base: "100%", md: "660px" }}
              borderBottomLeftRadius="0"
              borderBottomRightRadius="0"
            />

            <Textarea
              variant="filled"
              isRequired
              name="description"
              value={todo.description}
              onChange={handleChange}
              placeholder="What needs to be done?"
              size={{ base: "sm", md: "md" }}
              minWidth={{ base: "100%", md: "660px" }}
            />
          </Stack>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            colorScheme="blue"
            px="8"
            py={{ base: "2", md: "6" }}
            mt={{ base: 4, md: 0 }}
            mr={{ base: 0, md: 4 }}
            ml={{ base: 4, md: 0 }}
            type="submit"
          >
            Add
          </Button>
        </motion.div>
      </FormControl>
    </form>
  );
};

export default CreateTodo;
