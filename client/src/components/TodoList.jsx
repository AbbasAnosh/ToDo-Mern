import React, { useEffect, useState } from "react";
import { HStack, VStack, StackDivider } from "@chakra-ui/react";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axios from "axios";

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

const TodoList = () => {
  const [ToDo, setToDo] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({ name: "", completed: false });

  const getTodos = () => {
    axios.get("http://localhost:3000/api/todos").then((response) => {
      setToDo(response.data);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e, id) => {
    // e.preventDefault();/

    axios
      .put(`http://localhost:3000/api/todos/${id}`, data)
      .then((res) => {
        setData({ name: "", completed: "", date: new Date() });
        console.log(res.data.message, "updated successfully");
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/todos/${id}`);
    setToDo((data) => {
      return data.filter((todo) => todo._id !== id);
    });
  };

  // const todos = useSelector(selectTodos);

  // const todo = useSelector((state) => state.todos);
  // const dispatch = useDispatch();
  // const [selectedTodo, setSelectedTodo] = useState(null);

  // const handleEditClick = (todo) => {
  //   setSelectedTodo(todo);
  //   onOpen();
  // };

  // const handleSaveTodo = () => {
  //   dispatch(updateTodo({ id: selectedTodo._id, updatedTodo: selectedTodo }));
  //   onClose();
  // };

  // const [getPost, setGetPost] = useState([]);
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const { data: todos, error, isLoading } = useGetTodosQuery();

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   return <p>Error fetching todos: {error.message}</p>;
  // }

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
      {ToDo.map((todo) => (
        <Box
          key={todo._id}
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
                      onSubmit={(e) => {
                        handleSubmit(e, todo._id);
                      }}
                    >
                      <FormControl>
                        <FormLabel>Todo</FormLabel>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Create a new todo..."
                          onChange={handleChange}
                        />
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
              onClick={() => handleDelete(todo._id)}
            />
          </Box>
        </Box>
      ))}
    </motion.Box>
  );
};

export default TodoList;
