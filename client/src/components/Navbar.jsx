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
} from "@chakra-ui/react";

import ThemeToggle from "../components/ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const { colorMode } = useColorMode();

  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

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
            onClick={() => {
              onToggle();
            }}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
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
        </Flex>

        {isUserSignedIn ? (
          <Stack mr={3}>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              textColor={"heroGradientStart"}
              backgroundColor={"pagebg"}
              _hover={{
                backgroundColor: "background",
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            alignItems={"center"}
            spacing={6}
            mr={3}
          >
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
        )}
        <Stack>
          <ThemeToggle />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box p={4} bg={"#2C313D"}>
          {isUserSignedIn ? (
            <Stack maxWidth={"max-content"}>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </Stack>
          ) : (
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
          )}
        </Box>
      </Collapse>
    </Box>
  );
};
