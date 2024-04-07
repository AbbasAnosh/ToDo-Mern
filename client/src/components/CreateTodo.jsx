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
        display="flex"
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
              size="md"
              px="4"
              py="6"
              width="auto"
              minWidth="660px"
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
              size="sm"
            />
          </Stack>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button colorScheme="blue" px="8" py="6" type="submit">
            Add
          </Button>
        </motion.div>
      </FormControl>
    </form>
  );
};

export default CreateTodo;
