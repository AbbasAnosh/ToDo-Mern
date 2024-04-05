import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Hero from "./components/Hero";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todo, setTodo] = useState({
    name: "",
    completed: false,
  });
  return (
    <Box
      width="100%"
      minHeight="100vh"
      overflowY="auto"
      bgColor="pagebg"
      display="flex"
      flexDirection="column"
      zIndex={-1}
      alignItems="center"
    >
      <Hero />
      <Box
        zIndex={1}
        width="100%"
        px="1.5rem"
        maxWidth="3xl"
        paddingTop={"90px"}
        my="auto"
      >
        <CreateTodo todo={todo} setTodo={setTodo} />
        <TodoList todo={todo} setTodo={setTodo} />

        <p style={{ color: "gray", textAlign: "center", marginTop: "2rem" }}>
          Drag and Drop to reorder list
        </p>
      </Box>
    </Box>
  );
};

export default App;
