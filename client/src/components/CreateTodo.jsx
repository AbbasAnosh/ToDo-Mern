import React, { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { FormControl, IconButton, Input } from "@chakra-ui/react";
import CheckBox from "./CheckBox";
import { useDispatch } from "react-redux";

import axios from "axios";
import { addTodo } from "../redux/todosSlice";

const CreateTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();
  // const [todo, setTodo] = useState({
  //   name: "",
  //   completed: false,
  // });

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
      date: new Date(),
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    dispatch(addTodo({ ...todo, date: new Date() }));
    setTodo({
      name: "",
      completed: false,
    });

    // const newTodo = {
    //   name: todo.name,
    //   completed: todo.completed,
    //   date: new Date(),
    // };
    // axios.post("http://localhost:3000/api/todos", newTodo).then((response) => {
    //   console.log(response.status, response.data);
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        display="flex"
        backgroundColor="background"
        shadow="xl"
        padding="1rem"
        mb={"1.5rem"}
        rounded="6px"
      >
        {/* <CheckBox pr={2} aria-label="Mark task as done" /> */}
        <Input
          variant="unstyled"
          placeholder="Create a new todo..."
          isRequired
          name="name"
          value={todo.name}
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

export default CreateTodo;
