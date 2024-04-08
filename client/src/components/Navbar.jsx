import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
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
              color={useColorModeValue("teal.500", "white")}
              backgroundColor="teal.500"
              paddingX="20px"
              paddingY="10px"
              borderRadius={5}
              size={["md", "lg", "xl"]}
            >
              Todo
            </Text>
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          mr={3}
        >
          <Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"}>
            <Link to="signin">Sign In</Link>
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
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
        <Stack>
          <ThemeToggle />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "New & Noteworthy",
    subLabel: "Up-and-coming Designers",
    href: "#",
  },
];

// import React from "react";
// import {
//   Box,
//   Flex,
//   Heading,
//   useColorMode,
//   HStack,
//   Button,
// } from "@chakra-ui/react";
// import ThemeToggle from "../components/ThemeToggle";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const { colorMode } = useColorMode();

//   return (
//     <Box
//       as="nav"
//       height={["300px", "400px"]}
//       backgroundImage={[
//         `url(/background/bg-image3-${colorMode}.jpg)`,
//         `url(/background/bg-image3-${colorMode}.jpg)`,
//       ]}
//       style={{
//         width: "100%",
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         position: "relative",
//         zIndex: "0",
//         left: "0",
//         top: "0",
//       }}
//     >
//       <Flex
//         align="center"
//         justify="space-between"
//         wrap="wrap"
//         w="100%"
//         p={5}
//         position="relative"
//         zIndex="1"
//       >
//         <Heading
//           letterSpacing={"tighter"}
//           textTransform="uppercase"
//           color="white"
//           backgroundColor="teal.500"
//           paddingX="10px"
//           paddingY="5px"
//           borderRadius={5}
//           size={["md", "lg", "xl"]}
//         >
//           <Link to="/">Todo</Link>
//         </Heading>
//         <HStack spacing={4}>
//           <ThemeToggle />
//           <Button colorScheme="teal" variant="solid">
//             <Link to="/signin">Sign In</Link>
//           </Button>
//           <Button colorScheme="teal" variant="outline">
//             <Link to="/signup">Sign Up</Link>
//           </Button>
//         </HStack>
//       </Flex>
//     </Box>
//   );
// };

// export default Navbar;
