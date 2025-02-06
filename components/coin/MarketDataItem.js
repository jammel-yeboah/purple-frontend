import { Flex, Text } from "@chakra-ui/react";

export const MarketDataItem = ({ label, value }) => {
  let displayValue = value;      // The final string we show
  let displayColor = "inherit";  // Default text color

  // 1. If this is the "Price" label, parse and do comma separation with currency format
  if  (label === "Price") {
    const numericVal = Number(value); // Explicit conversion to float
    if (!isNaN(numericVal)) {
      displayValue = numericVal.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      });
    }
  }

  // 2. If this is the "24h Change" label, parse, color-code, and add +/-
  if (label === "24h Change") {
    const numericVal = parseFloat(value);
    if (!Number.isNaN(numericVal)) {
      displayColor = numericVal > 0 ? "green.500" : "red.500";
      // e.g. +3.25% or -2.74%
      displayValue = `${numericVal > 0 ? "+" : ""}${numericVal.toFixed(2)}%`;
    }
  }

  return (
    <Flex
      direction="column"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      align="center"
      justify="center"
    >
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>

      <Text
        fontSize={["md", "lg"]} // responsive font
        fontWeight="bold"
        mt={1}
        overflowWrap="anywhere"
        whiteSpace="normal"
        textAlign="center"
        w="full"
        color={displayColor}
      >
        {displayValue}
      </Text>
    </Flex>
  );
};
