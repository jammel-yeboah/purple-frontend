// frontend/pages/topics/[topic].js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  Spinner,
  SimpleGrid
} from "@chakra-ui/react";

import TimeSeriesChart from "../../components/TimeSeriesChart";
import TopCreators from "../../components/TopCreators";
import TopNews from "../../components/TopNews";
import TopPosts from "../../components/TopPosts";
import { TopicSummaryCard } from "../../components/TopicSummaryCard";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function TopicDetail() {
  const router = useRouter();
  const { topic } = router.query;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [posts, setPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [creators, setCreators] = useState([]);
  const [timeSeries, setTimeSeries] = useState(null);

  useEffect(() => {
    if (!topic) return;

    async function fetchData() {
      try {
        setLoading(true);

        // 1) time series
        const tsRes = await axios.get(`/api/topic/${topic}/time-series/v1`);
        setTimeSeries(tsRes.data?.data);

        // 2) summary, posts, news, creators in parallel
        const [summaryRes, postsRes, newsRes, creatorsRes] = await Promise.all([
          axios.get(`/api/topic/${topic}/summary`),
          axios.get(`/api/topic/${topic}/posts`),
          axios.get(`/api/topic/${topic}/news`),
          axios.get(`/api/topic/${topic}/creators`)
        ]);

        setSummary(summaryRes.data?.data);
        setPosts(postsRes.data?.data || []);
        setNews(newsRes.data?.data || []);
        setCreators(creatorsRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching topic data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [topic]);

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={2}>{summary?.title || topic}</Heading>

      {/* Display the summary info */}
      <TopicSummaryCard summary={summary} />

      <Box mb={8}>
        <Heading size="lg" mb={4}>
          Time Series Data
        </Heading>
        {/* This is a topic => isCoin={false} or omitted */}
        <TimeSeriesChart timeSeries={timeSeries} defaultMetric="interactions" />
      </Box>

      {/* Top Creators */}
      <Box mb={8}>
        <TopCreators creators={creators} />
      </Box>

      {/* News & Posts */}
      <SimpleGrid columns={[1, 2]} spacing={8}>
        <TopNews news={news} />
        <TopPosts posts={posts} />
      </SimpleGrid>
    </Container>
  );
}
