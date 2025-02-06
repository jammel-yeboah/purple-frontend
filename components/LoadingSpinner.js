import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="background"
      color="text.primary"
    >
      <Spinner size="xl" thickness="4px" speed="0.65s" color="accent" />
      <Text ml={4} fontSize="xl">
        Loading...
      </Text>
    </Box>
  );
};

export default LoadingSpinner;