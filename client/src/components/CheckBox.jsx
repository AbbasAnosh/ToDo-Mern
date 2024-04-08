import React from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { Box, Center, useCheckbox } from "@chakra-ui/react";

const CheckBox = (props) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <Box
      as="label"
      {...getLabelProps()}
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key !== " ") return;
        e.preventDefault();
        props.onChange(e);
      }}
      px={{ base: 1, md: 4 }}
      py={{ base: 1, md: 3 }}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Center
        rounded="full"
        bgPos={state?.isChecked ? "100% 100%" : "0% 0%"}
        bgSize="200% 200%"
        bgGradient="linear(135deg, var(--chakra-colors-border) 50%,#6ebaf8 51%, #a47ee1 100%)"
        _hover={{ bgPos: "100% 100%" }}
        transition="all 0.2s ease-in"
        minW={{ base: 4, md: 6 }}
        h={{ base: 4, md: 6 }}
        {...getCheckboxProps()}
      >
        <Center
          bgColor={state.isChecked ? "transparent" : "background"}
          transitionDuration="0.3s"
          w={{ base: 3, md: 5 }}
          h={{ base: 3, md: 5 }}
          rounded="full"
        >
          <CheckIcon
            boxSize={state.isChecked ? 2.5 : 0}
            transitionDuration="0.3s"
            color="white"
          />
        </Center>
      </Center>
      {props.children}
    </Box>
  );
};

export default CheckBox;
