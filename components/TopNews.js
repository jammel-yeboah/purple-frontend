// frontend/components/TopNews.js
import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import NewsCard from "./NewsCard";

const TopNews = ({ news }) => {
  return (
    <Box>
      <Heading size="lg" mb={4}>Top News</Heading>
      <Box maxH="800px" overflowY="auto">
        <VStack spacing={4} align="stretch">
          {news.slice(0, 100).map((item) => (
            <NewsCard key={item.news_id} newsItem={item} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default TopNews;