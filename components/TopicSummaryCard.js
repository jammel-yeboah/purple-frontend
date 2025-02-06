// frontend/components/TopicSummaryCard.js
import React from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  Stack,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";

export function TopicSummaryCard({ summary }) {
  if (!summary) return null;

  // Destructure fields for convenience
  const {
    title = "",
    categories = [],
    trend,
    interactions_1h,
    interactions_24h,
    num_contributors,
    num_posts,
    types_count = {},
    types_interactions = {},
    types_sentiment = {},
    types_sentiment_detail = {}
  } = summary;

  return (
    <Box borderWidth="1px" borderRadius="md" p={6} mb={8}>
      {/* High-level overview */}
      <Heading size="md" mb={4}>
        Overview (Last 24 Hours)
      </Heading>

      <Stack spacing={2}>
        {/* Categories (if any) */}
        {categories.length > 0 && (
          <Text fontSize={"lg"}>
            <strong>Categories:</strong> {categories.join(", ")}
          </Text>
        )}

        {/* Trend */}
        {trend && (
          <Text fontSize={"lg"}>
            <strong>Trend:</strong> {trend}
          </Text>
        )}

        {/* 24h stats */}
        <Text fontSize={"lg"}>
          <strong>Interactions (24h):</strong>{" "}
          {interactions_24h ? interactions_24h.toLocaleString() : "N/A"}
        </Text>
        <Text fontSize={"lg"}>
          <strong>Interactions (1h):</strong>{" "}
          {interactions_1h ? interactions_1h.toLocaleString() : "N/A"}
        </Text>
        <Text fontSize={"lg"}>
          <strong>Contributors:</strong>{" "}
          {num_contributors ? num_contributors.toLocaleString() : "N/A"}
        </Text>
        <Text fontSize={"lg"}>
          <strong>Posts:</strong>{" "}
          {num_posts ? num_posts.toLocaleString() : "N/A"}
        </Text>
      </Stack>

      <Divider my={6} />

      {/* Per-network metrics */}
      <Heading size="md" mb={2}>
        Social Networks Overview
      </Heading>
      <Text fontSize="m" color="gray.600">
        All data below is also for the past 24 hours:
      </Text>

      {/* 1) types_count = # posts per network */}
      <Box mt={4}>
        <Heading size="s" mb={1}>
          Posts Created (by Network)
        </Heading>
        <UnorderedList ml={4} styleType="disc">
          {Object.entries(types_count).map(([network, count]) => (
            <ListItem key={network}>
              <strong>{network}:</strong> {count.toLocaleString()}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* 2) types_interactions = # interactions per network */}
      <Box mt={4}>
        <Heading size="s" mb={1}>
          Interactions (by Network)
        </Heading>
        <UnorderedList ml={4} styleType="disc">
          {Object.entries(types_interactions).map(([network, val]) => (
            <ListItem key={network}>
              <strong>{network}:</strong> {val.toLocaleString()}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* 3) types_sentiment = average sentiment score per network */}
      <Box mt={4}>
        <Heading size="s" mb={1}>
          Sentiment Averages (by Network)
        </Heading>
        <UnorderedList ml={4} styleType="disc">
          {Object.entries(types_sentiment).map(([network, val]) => (
            <ListItem key={network}>
              <strong>{network}:</strong> {val}%
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* 4) types_sentiment_detail = positive/neutral/negative breakdown */}
      <Box mt={4}>
        <Heading size="s" mb={1}>
          Sentiment Details (by Network)
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Positive / Neutral / Negative (by 24h interactions)
        </Text>
        <UnorderedList ml={4} styleType="disc" mt={2}>
          {Object.entries(types_sentiment_detail).map(([network, stats]) => {
            const { positive = 0, neutral = 0, negative = 0 } = stats;
            return (
              <ListItem key={network}>
                <strong>{network}:</strong>{" "}
                Positive {positive.toLocaleString()}, Neutral{" "}
                {neutral.toLocaleString()}, Negative {negative.toLocaleString()}
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
    </Box>
  );
}
