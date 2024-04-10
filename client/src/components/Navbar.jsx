import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  HStack,
} from "@chakra-ui/react";

import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export const Navbar = ({ user }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  return (
    <Box maxWidth={"4xl"} mr={"auto"} ml={"auto"}>
      <Box
        height={["400px", "500px"]}
        backgroundImage={[
          `url(/background/bg-image3-${colorMode}.jpg)`,
          `url(/background/bg-image3-${colorMode}.jpg)`,
        ]}
        style={{
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "none",
          position: "absolute",
          zIndex: "-1",
          left: "0",
          top: "0",
        }}
      />
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/">
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              textColor={"heroGradientEnd"}
              backgroundColor="background"
              paddingX="20px"
              paddingY="10px"
              borderRadius={5}
              fontSize={20}
              size={["md", "lg", "xl"]}
              fontWeight={600}
            >
              Todo
            </Text>
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          alignItems={"center"}
          spacing={6}
          mr={3}
        >
          {user ? (
            <HStack>
              <Text>John Doe</Text>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                textColor={"heroGradientStart"}
                backgroundColor={"pagebg"}
                _hover={{
                  backgroundColor: "background",
                }}
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <Link to="/signin" textDecoration="none">
              <Button
                fontSize={"sm"}
                fontWeight={600}
                backgroundColor={"pagebg"}
                textColor={"heroGradientStart"}
                display={{ base: "none", md: "inline-flex" }}
                _hover={{
                  backgroundColor: "background",
                }}
              >
                Sign In
              </Button>
            </Link>
          )}
          <Link to="/signup">
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              textColor={"heroGradientStart"}
              backgroundColor={"pagebg"}
              _hover={{
                backgroundColor: "background",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
        <Stack>
          <ThemeToggle />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box p={4} bg={"#2C313D"}>
          <Stack maxWidth={"max-content"}>
            <Button>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};
