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
  const [data, setData] = useState({ name: "", completed: false, id: null });
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

  return (
    <motion.Box
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      {toDos.map((todo) => (
        <SlideFade in={true} offsetY="20px" key={todo._id}>
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            margin={4}
            borderRadius="lg"
            bg={bg}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            layout
          >
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <HStack maxWidth="100%" marginBottom="4">
                <CheckBox isChecked={todo.completed} />
                <VStack
                  alignItems="self-start"
                  divider={<StackDivider borderColor="gray.200" />}
                >
                  <Text as={todo.completed ? "s" : ""}>{todo.name}</Text>
                  <Text as={todo.completed ? "s" : ""}>{todo.description}</Text>
                </VStack>
              </HStack>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={2}
                align="stretch"
              >
                <Badge colorScheme="green">Author: Abbas Anosh</Badge>
                <Badge colorScheme="blue">
                  Date: {moment(todo.date).format("MMM Do YY")}
                </Badge>
              </VStack>
            </Box>
            <Box>
              <Stack
                spacing={2}
                direction="column"
                align="center"
                justifyContent="center"
              >
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => handleEdit(todo)}
                  aria-label="Edit Todo"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(todo._id)}
                  aria-label="Delete Todo"
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
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          isDisabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Text marginX="4">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        >
          Next
        </Button>
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
                <Button colorScheme="blue" mr={1} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" type="submit">
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
