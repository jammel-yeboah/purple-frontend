// frontend/components/TopCreators.js
import React from "react";
import { Box, Heading, HStack } from "@chakra-ui/react";
import CreatorCard from "./CreatorCard";

const TopCreators = ({ creators }) => {
  return (
    <Box mb={8} textAlign="center">
      <Heading size="lg" mb={4}>Top Creators</Heading>
      <Box overflowX="auto" whiteSpace="nowrap" mx="auto" maxWidth="80%">
        <HStack spacing={4} display="inline-flex">
          {creators.slice(0, 150).map((creator, index) => (
            <CreatorCard key={creator.id} creator={creator} rank={index + 1} />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default TopCreators;