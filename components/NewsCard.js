import React from "react";
import { Box, Link, Text, VStack } from "@chakra-ui/react";

// Helper function to format numbers
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
};

export default function NewsCard({ newsItem }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="background"
      p={4}
      boxShadow="sm"
      borderColor="border"
    >
      <VStack align="start" spacing={2}>
        <Link
          href={newsItem.post_link}
          isExternal
          fontWeight="bold"
          fontSize="lg"
          color="accent"
        >
          {newsItem.post_title}
        </Link>
        <Text fontSize="sm" color="text.secondary">
          Interactions 24h: {formatNumber(newsItem.interactions_24h)}
        </Text>
        <Text fontSize="sm" color="text.secondary">
          Interactions Total: {formatNumber(newsItem.interactions_total)}
        </Text>
      </VStack>
    </Box>
  );
}