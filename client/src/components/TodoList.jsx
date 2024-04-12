import React, { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  StackDivider,
  useToast,
  Box,
  Text,
  Textarea,
  IconButton,
  useColorModeValue,
  Badge,
  Button,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axios from "axios";

import moment from "moment";
import {
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SlideFade,
} from "@chakra-ui/react";
import CheckBox from "./CheckBox";

const TodoList = ({ isCreated }) => {
  const [toDos, setToDos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    name: "",
    description: "",
    completed: false,
    id: null,
  });
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");

  const getTodos = () => {
    axios
      .get(`http://localhost:3000/api/todos?page=${currentPage}&limit=3`)
      .then((response) => {
        setToDos(response?.data?.todos);
        setTotalPages(response.data.totalPages);
      });
  };

  useEffect(() => {
    if (isCreated) {
      getTodos();
    }
  }, [isCreated]);

  useEffect(() => {
    getTodos();
  }, [currentPage]);

  const handleChange = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
      description:
        e.target.name === "description" ? e.target.value : data.description,
    }));
  };

  const handleEdit = (todo) => {
    setData({
      name: todo.name,
      description: todo.description,
      completed: todo.completed,
      id: todo._id,
    });
    onOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...updateData } = data;

    axios
      .put(`http://localhost:3000/api/todos/${id}`, updateData)
      .then((res) => {
        setData({ name: "", description: "", completed: false, id: null });
        getTodos();
        onClose();
        toast({
          title: "Todo updated.",
          description: "Your todo has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Error updating todo.",
          description: "Failed to update todo.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/todos/${id}`).then(() => {
      getTodos();
      toast({
        title: "Todo deleted.",
        description: "Your todo has been deleted successfully.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const toggleDone = async (id, completed) => {
    try {
      setToDos((prevToDos) =>
        prevToDos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );

      await axios.put(`http://localhost:3000/api/todos/${id}`, {
        completed: completed,
      });
      getTodos();
      toast({
        title: "Todo updated.",
        description: "Your todo has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating todo status.",
        description: "Failed to update todo status.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error updating todo:", error);
    }
  };

  return (
    <motion.Box
      as="div"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      {toDos.map((todo) => (
        <SlideFade in={true} offsetY="20px" key={todo._id}>
          <Box
            as="div"
            p={4}
            shadow="md"
            borderWidth="1px"
            margin={4}
            borderRadius="lg"
            bg={bg}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            layout
          >
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <VStack spacing={2} align="stretch">
                <CheckBox
                  maxWidth="100%"
                  overflowX="auto"
                  isChecked={todo.completed}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleDone(todo._id, !todo.completed);
                  }}
                >
                  <VStack
                    spacing={1}
                    align="start"
                    divider={<StackDivider borderColor="gray.200" />}
                  >
                    <Text
                      decoration={todo.completed && "line-through"}
                      overflowWrap="break-word"
                      transitionDuration="0.3s"
                      color={todo.completed && "GrayText"}
                    >
                      {todo.name}
                    </Text>
                    <Text
                      decoration={todo.completed && "line-through"}
                      overflowWrap="break-word"
                      transitionDuration="0.3s"
                      color={todo.completed && "GrayText"}
                    >
                      {todo.description}
                    </Text>
                  </VStack>
                </CheckBox>
              </VStack>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={1}
                align="start"
                mb={2}
              >
                <Badge colorScheme="green" fontSize={{ base: 10, md: 12 }}>
                  Author: Abbas Anosh
                </Badge>
                <Badge colorScheme="blue" fontSize={{ base: 10, md: 12 }}>
                  Date: {moment(todo.date).format("MMMM Do YYYY, h:mm:ss a")}
                </Badge>
              </VStack>
            </Box>
            <Box>
              <Stack
                direction={{ base: "row", md: "row" }}
                mt={2}
                justify="center"
                align="center"
              >
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => handleEdit(todo)}
                  aria-label="Edit Todo"
                  fontSize={{ base: 16, md: 20 }}
                  w={{ base: 8, md: 10 }}
                  h={{ base: 8, md: 10 }}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(todo._id)}
                  aria-label="Delete Todo"
                  fontSize={{ base: 16, md: 20 }}
                  w={{ base: 8, md: 10 }}
                  h={{ base: 8, md: 10 }}
                />
              </Stack>
            </Box>
          </Box>
        </SlideFade>
      ))}

      <Box
        display="flex"
        justifyContent="center"
        marginTop="10"
        alignItems="center"
      >
        <Stack direction="row" justify="center" align="center" mt={4}>
          <Button
            fontSize={{ base: 15, md: 20 }}
            onClick={() => setCurrentPage(currentPage - 1)}
            isDisabled={currentPage <= 1}
          >
            Previous
          </Button>
          <Text marginX="4" fontSize={{ base: 15, md: 20 }}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            fontSize={{ base: 15, md: 20 }}
            onClick={() => setCurrentPage(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Todo</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                  placeholder="Todo name"
                />
              </FormControl>

              <Text mb="8px" mt="8px">
                Description
              </Text>
              <Textarea
                name="description"
                placeholder="Here is a sample placeholder"
                size="sm"
                onChange={handleChange}
                value={data.description}
              />
            </ModalBody>

            <ModalFooter>
              <Stack direction="row" align="center">
                <Button
                  fontSize={{ base: 15, md: 20 }}
                  colorScheme="blue"
                  mr={1}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  fontSize={{ base: 15, md: 20 }}
                  variant="ghost"
                  type="submit"
                >
                  Update
                </Button>
              </Stack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </motion.Box>
  );
};

export default TodoList;
