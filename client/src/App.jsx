import React from "react";
import { Box } from "@chakra-ui/react";
import Hero from "./components/Hero";
import CreateTodo from "./components/CreateTodo";

const App = () => {
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
      <Box zIndex={1} width="100%" px="1.5rem" maxWidth="3xl" my="auto">
        <CreateTodo />

        <Box
          mt="1.5rem"
          padding="1rem"
          bgColor="background"
          rounded="6px"
          shadow="xl"
          display={["block", "none"]}
        ></Box>
        <p style={{ color: "gray", textAlign: "center", marginTop: "2rem" }}>
          Drag and Drop to reorder list
        </p>
      </Box>
    </Box>
  );
};

export default App;
