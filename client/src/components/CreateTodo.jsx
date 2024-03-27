import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { FormControl, IconButton, Input } from "@chakra-ui/react";
import CheckBox from "./CheckBox";

const CreateTodo = () => {
  return (
    <form>
      <FormControl
        display="flex"
        backgroundColor="background"
        shadow="xl"
        padding="1rem"
        mb={"1.5rem"}
        rounded="6px"
      >
        <CheckBox pr={2} aria-label="Mark task as done" />
        <Input
          variant="unstyled"
          placeholder="Create a new todo..."
          isRequired
          style={{ caretColor: "#5d77b4" }}
        />
      </FormControl>
    </form>
  );
};

export default CreateTodo;
