import React, { useEffect, useState, useRef } from "react";
import { Stack, HStack, VStack, StackDivider } from "@chakra-ui/react";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../redux/todosSlice";
// import { useSelector } from 'react-redux';
import moment from "moment";

import {
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import CheckBox from "./CheckBox";
import { useGetTodosQuery } from "../api/getData";

const TodoList = ({ todo, setTodo }) => {
  // const todos = useSelector(selectTodos);

  // const todo = useSelector((state) => state.todos);
  // const dispatch = useDispatch();

  const [getPost, setGetPost] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: todos, error, isLoading } = useGetTodosQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error fetching todos: {error.message}</p>;
  }

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/todos")
  //     .then((response) => {
  //       setGetPost(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const deletePost = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/api/todos/${id}`);
  //     console.log("Post deleted successfully", id);
  //     setGetPost(
  //       getPost.filter((post) => post._id.toString() !== id.toString())
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <motion.Box
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {todos.map((todo) => (
        <Box
          key={todo.id}
          p={4}
          borderWidth="1px"
          margin={2}
          borderRadius="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent=""
            alignItems="center"
          >
            <HStack>
              <CheckBox />
              <Text>{todo.name}</Text>
            </HStack>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              maxWidth={"85%"}
            >
              <Text>Author: Abbas Anosh</Text>
              <Text>Date: {moment(todo.date).format("MMM Do YY")}</Text>
            </VStack>
          </Box>
          <Box>
            <>
              <IconButton
                icon={<EditIcon />}
                colorScheme="blue"
                onClick={onOpen}
                mr={2}
              />
              <Modal isOpen={isOpen} motionPreset="scale" onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(0px) " />
                <ModalContent>
                  <ModalHeader>Update the todo</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form
                      id="new-note"
                      onSubmit={(event) => {
                        event.preventDefault();
                        alert("Submitted");
                      }}
                    >
                      <FormControl>
                        <FormLabel>Todo</FormLabel>
                        <Input type="email" />
                      </FormControl>
                    </form>
                  </ModalBody>

                  <ModalFooter>
                    <Button type="submit" form="new-note">
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>

            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => deletePost(todo.id)}
            />
          </Box>
        </Box>
      ))}
    </motion.Box>
  );
};

export default TodoList;
