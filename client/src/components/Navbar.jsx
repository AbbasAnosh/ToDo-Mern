import React from "react";
import {
  Box,
  Flex,
  Heading,
  useColorMode,
  HStack,
  Button,
} from "@chakra-ui/react";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="nav"
      height={["80px", "400px"]}
      backgroundImage={[
        `url(/background/bg-image3-${colorMode}.jpg)`,
        `url(/background/bg-image3-${colorMode}.jpg)`,
      ]}
      style={{
        width: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        zIndex: "0",
        left: "0",
        top: "0",
      }}
    >
      <Flex align="center" justify="space-between" wrap="wrap" w="100%" p={5}>
        <Heading
          letterSpacing={"tighter"}
          textTransform="uppercase"
          color="white"
          backgroundColor="teal.500"
          paddingX="10px"
          paddingY="5px"
          borderRadius={5}
          size="lg"
        >
          <Link to="/">Todo</Link>
        </Heading>
        <HStack spacing={4}>
          <ThemeToggle />
          <Button colorScheme="teal" variant="solid">
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button colorScheme="teal" variant="outline">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
