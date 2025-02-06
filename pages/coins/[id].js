// frontend/pages/coins/[id].js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";

import { CoinMetadata } from "../../components/coin/CoinMetadata";
import { MarketDataCard } from "../../components/coin/MarketDataCard";
import TimeSeriesChart from "../../components/TimeSeriesChart";
import TopCreators from "../../components/TopCreators";
import TopNews from "../../components/TopNews";
import TopPosts from "../../components/TopPosts";
import { TopicSummaryCard } from "../../components/TopicSummaryCard";
import LoadingSpinner from "../../components/LoadingSpinner";


export default function CoinDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [market, setMarket] = useState(null);
  const [timeSeries, setTimeSeries] = useState(null);
  const [creators, setCreators] = useState([]);
  const [news, setNews] = useState([]);
  const [posts, setPosts] = useState([]);

  // New: We'll store the "topic summary" data here
  const [topicSummary, setTopicSummary] = useState(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);

        // 1) Fetch coin data
        const metaRes = await axios.get(`/api/coin/${id}/meta`);
        setMeta(metaRes.data?.data);

        const marketRes = await axios.get(`/api/coin/${id}/market`);
        setMarket(marketRes.data?.data);

        const tsRes = await axios.get(`/api/coin/${id}/time-series`);
        setTimeSeries(tsRes.data?.data);

        // 2) Use coin symbol as "topic"
        const topic = metaRes.data?.data?.symbol?.toLowerCase();

        // 3) We can fetch topic summary here as well
        const [summaryRes, postsRes, newsRes, creatorsRes] = await Promise.all([
          axios.get(`/api/topic/${topic}/summary`),
          axios.get(`/api/topic/${topic}/posts`),
          axios.get(`/api/topic/${topic}/news`),
          axios.get(`/api/topic/${topic}/creators`)
        ]);

        setTopicSummary(summaryRes.data?.data);
        setPosts(postsRes.data?.data || []);
        setNews(newsRes.data?.data || []);
        setCreators(creatorsRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching coin data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxW="container.xl" py={8}>
      {/* Coin Metadata & Market Data side by side */}
      <SimpleGrid columns={[1, 2]} spacing={6} mb={8}>
        <CoinMetadata meta={meta} />
        <MarketDataCard market={market} />
      </SimpleGrid>

      {/* 
        Now, we can display the same "topic summary" data 
        that we do for [topic].js 
      */}
      <TopicSummaryCard summary={topicSummary} />

      {/* Time Series Chart */}
      <Box mb={8}>
        <Heading size="lg" mb={4}>
          Time Series Data
        </Heading>
        {/* This is a coin => isCoin={true} */}
        <TimeSeriesChart
          timeSeries={timeSeries}
          defaultMetric="interactions"
          isCoin={true}
        />
      </Box>

      {/* Creators, News, Posts */}
      <Box mb={8}>
        <TopCreators creators={creators} />
      </Box>

      <SimpleGrid columns={[1, 2]} spacing={8}>
        <TopNews news={news} />
        <TopPosts posts={posts} />
      </SimpleGrid>
    </Container>
  );
}
