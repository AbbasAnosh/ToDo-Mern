import { Box, Flex, Heading, useColorMode, HStack } from "@chakra-ui/react";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Hero() {
  const { colorMode } = useColorMode();

  return (
    <Flex
      mb="2rem"
      height="200px"
      w="100%"
      px="1.5rem"
      justifyContent="space-between"
      alignItems="end"
      zIndex={1}
      maxW="3xl"
      margin={"0 auto"}
    >
      <Box
        height={["200px", "400px"]}
        backgroundImage={[
          `url(/background/bg-image3-${colorMode}.jpg)`,
          `url(/background/bg-image3-${colorMode}.jpg)`,
        ]}
        style={{
          width: "100vw",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "none",
          position: "absolute",
          zIndex: "-1",
          left: "0",
          top: "0",
        }}
      />
      <Heading
        letterSpacing={"1rem"}
        textTransform="uppercase"
        color="white"
        backgroundColor="teal"
        paddingX="10px"
        paddingY="5px"
        borderRadius={5}
      >
        Todo
      </Heading>
      <HStack>
        <SignIn />
        <SignUp />
        <ThemeToggle />
      </HStack>
    </Flex>
  );
}
