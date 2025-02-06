import React from "react";
import { Box, Image, Text, VStack, Flex } from "@chakra-ui/react";

// Helper function to format numbers
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
};

export default function CreatorCard({ creator, rank }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w="200px"
      p={4}
      bg="background"
      textAlign="center"
      position="relative"
    >
      <Flex position="absolute" top={2} left={2}>
        <Text fontSize="s" fontWeight="bold" color="accent">
          {rank}
        </Text>
      </Flex>
      <Image
        borderRadius="full"
        boxSize="100px"
        src={creator.creator_avatar || "https://via.placeholder.com/100"}
        alt={creator.creator_name}
        mx="auto"
        mb={4}
      />
      <VStack spacing={2}>
        <Text fontWeight="bold" color="text.primary">
          {creator.creator_name}
        </Text>
        <Text fontSize="sm" color="text.secondary">
          {formatNumber(creator.interactions_24h)} 24h Interactions
        </Text>
        <Text fontSize="sm" color="text.secondary">
          {formatNumber(creator.creator_followers)} Followers
        </Text>
      </VStack>
    </Box>
  );
}