// frontend/components/TopPosts.js
import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import PostCard from "./PostCard";

const TopPosts = ({ posts }) => {
  return (
    <Box>
      <Heading size="lg" mb={4}>Top Posts</Heading>
      <Box maxH="800px" overflowY="auto">
        <VStack spacing={4} align="stretch">
          {posts.slice(0, 100).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default TopPosts;