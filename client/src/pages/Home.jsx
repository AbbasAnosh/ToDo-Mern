import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";

const Home = () => {
  const [isCreated, setIsCreated] = useState(false);
  return (
    <Box
      width="100%"
      overflowY="auto"
      bgColor="pagebg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <Box
        width="100%"
        px="1.5rem"
        maxWidth="3xl"
        paddingTop={"90px"}
        my="auto"
        paddingBottom={"80px"}
      >
        <CreateTodo onAddTodo={setIsCreated} />
        <TodoList isCreated={isCreated} />
      </Box>
    </Box>
  );
};

export default Home;
