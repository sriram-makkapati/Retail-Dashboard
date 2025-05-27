import { Spinner, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const SRBackdrop = ({ load, text, zIndex = 2000 }) => {
  return (
    load && (
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex={zIndex}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <Flex direction="column" align="center">
          <Spinner size="xl" color="white" />
          {text && (
            <Text fontSize="16px" fontStyle="italic" mt={4}>
              {text}...
            </Text>
          )}
        </Flex>
      </Box>
    )
  );
};

export default SRBackdrop;
