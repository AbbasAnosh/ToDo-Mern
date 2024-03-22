import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { FormControl, IconButton, Input } from "@chakra-ui/react";

const CreateTodo = () => {
  return (
    <form>
      <FormControl
        id="create-todo"
        display="flex"
        backgroundColor="background"
        shadow="xl"
        padding="0.5rem"
        mb={"1.5rem"}
        rounded="6px"
      >
        <Input placeholder="Enter a new todo" />
      </FormControl>
    </form>
  );
};

export default CreateTodo;
