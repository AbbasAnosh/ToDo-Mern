import React, { useState } from "react";
import {
  FormControl,
  Input,
  Button,
  useToast,
  Textarea,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";

import "react-datepicker/dist/react-datepicker.css";

const CreateTodo = ({ onAddTodo }) => {
  const [todo, setTodo] = useState({
    name: "",
    description: "",
    date: new Date(),
    time: "",
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

  const handleTimeChange = (e) => {
    let value = e.target.value;
    value = value.replace(/(\d{2})(?=\d)/g, "$1:").substring(0, 8);
    setTodo({
      ...todo,
      time: value,
    });
  };
  const handleDateChange = (date) => {
    setTodo({
      ...todo,
      date: date,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const timeParts = todo.time.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = timeParts.length > 2 ? parseInt(timeParts[2], 10) : 0;

    const dateTime = new Date(todo.date.getTime());
    dateTime.setHours(hours, minutes, seconds);

    const newData = {
      name: todo.name,
      description: todo.description,
      completed: todo.completed,
      date: dateTime,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/todos",
        newData
      );
      onAddTodo(true);
      setTodo({
        name: "",
        description: "",
        date: new Date(),
        time: "",
        completed: false,
      });
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
              id="todoinput"
              placeholder="What is the name of the todo?"
              isRequired
              borderColor={"border"}
              borderWidth="1px"
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
              backgroundColor="background"
            />

            <Textarea
              id="todotextarea"
              isRequired
              borderColor={"border"}
              borderWidth="1px"
              name="description"
              value={todo.description}
              onChange={handleChange}
              placeholder="What needs to be done?"
              size={{ base: "sm", md: "md" }}
              minWidth={{ base: "100%", md: "660px" }}
              backgroundColor="background"
            />
            <Stack
              direction={{ base: "column", md: "row" }}
              align="left"
              spacing="2"
            >
              <InputGroup className="date-picker-container">
                <InputLeftAddon
                  children={<CalendarIcon color="gray.300" />}
                  backgroundColor={"background"}
                />
                <DatePicker
                  id="tododate"
                  selected={todo.date}
                  onChange={handleDateChange}
                  customInput={<Input backgroundColor={"background"} />}
                  dateFormat="MMMM d, yyyy"
                  isClearable
                  withPortal
                  name="date"
                  value={todo.date}
                />
              </InputGroup>

              <InputGroup
                backgroundColor={"background"}
                borderRadius={"lg"}
                maxWidth={"max-content"}
              >
                <InputLeftElement
                  pointerEvents="none"
                  children={<TimeIcon color="gray.300" />}
                />
                <Input
                  id="todotime"
                  placeholder="HH:MM:SS"
                  name="time"
                  value={todo.time}
                  onChange={handleTimeChange}
                  pattern="\d{2}:\d{2}:\d{2}"
                  maxLength="8"
                  focusBorderColor="blue.500"
                  errorBorderColor="red.300"
                />
              </InputGroup>
            </Stack>
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
