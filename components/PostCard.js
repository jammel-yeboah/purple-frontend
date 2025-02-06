import React from "react";
import { Box, Text, VStack, HStack, Avatar, Link } from "@chakra-ui/react";

// Helper function to format numbers
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
};

export default function PostCard({ post }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      bg="background"
      shadow="sm"
      _hover={{ shadow: "md", bg: "gray.700" }}
      transition="all 0.2s"
      borderColor="border"
    >
      <VStack align="start" spacing={2}>
        <Link
          href={post.post_link}
          isExternal
          fontWeight="bold"
          fontSize="lg"
          color="accent"
        >
          {post.post_title}
        </Link>

        {/* Post details */}
        <HStack spacing={4}>
          <Avatar size="sm" src={post.creator_avatar} />
          <Text fontSize="sm" color="text.secondary">
            {post.creator_display_name}
          </Text>
        </HStack>

        {/* Post interactions */}
        <Text fontSize="sm" color="text.secondary">
          Interactions 24h: {formatNumber(post.interactions_24h)}
        </Text>
        <Text fontSize="sm" color="text.secondary">
          Interactions Total: {formatNumber(post.interactions_total)}
        </Text>
      </VStack>
    </Box>
  );
}