import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  VStack,
  HStack,
  SimpleGrid,
  Text,
  Input,
  Button,
  useToast,
  Flex
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import CoinTable from "../components/CoinTable";
import TopCreators from "../components/TopCreators";
import TopNews from "../components/TopNews";
import TopPosts from "../components/TopPosts";
import LoadingSpinner from "../components/LoadingSpinner";


export default function Home() {
  const [creators, setCreators] = useState([]);
  const [posts, setPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        // Create an array of 6 requests for coins (pages 0-5, 100 coins each)
        const coinsPromises = Array.from({ length: 8 }, (_, i) => //CHANGE -> from 6 requests to 8 requests
          axios.get(`/api/coins?sort=social_volume_24h&limit=100&page=${i}`)
        );
  
        // Fetch all data in parallel
        const [creatorsRes, postsRes, newsRes, ...coinsResults] = await Promise.all([
          axios.get("/api/creators"),
          axios.get("/api/posts"),
          axios.get("/api/news"),
          ...coinsPromises // Spread the 6 coin requests
        ]);
  
        // Combine all 600 coins into a single array
        const allCoins = coinsResults.flatMap(res => 
          res.data?.data?.map(coin => ({
            ...coin,
            id: coin.id || coin.symbol // Fallback if needed
          })) ?? []
        );

      // Update state
      setCreators(
        (creatorsRes.data?.data ?? []).filter(
          (creator) => creator.creator_id !== "twitter::19923144" && creator.creator_id !== "twitter::34713362"  && creator.creator_id !==  "twitter::1822461609387933696"
        )
      );
      setPosts(postsRes.data?.data ?? []);
      setNews(newsRes.data?.data ?? []);
      setCoins(allCoins); // All 600 coins
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const res = await axios.get(`/api/search?query=${searchQuery}`);
      if (res.data.type === "coin") {
        router.push(`/coins/${res.data.value}`);
      } else {
        router.push(`/topics/${res.data.value}`);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Search Error",
        description: "Unable to search. Please try again later.",
        status: "error",
        duration: 4000
      });
    }
  };

  return (
    <Box p={6}>
      {/* Search Bar */}
        <HStack mb={8} justify="center">
          <Input
            placeholder="Search anything (eg 'solana', 'ai agents')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
            }}
          />
          <Button onClick={handleSearch} colorScheme="purple">
            Search
          </Button>
        </HStack>

      <TopCreators creators={creators} />

      <SimpleGrid columns={[1, 2]} spacing={8}>
        <TopNews news={news} />
        <TopPosts posts={posts} />
      </SimpleGrid>

      <Box mt={8}>
        <Flex justify="center" align="center">
          <Heading size="lg">Overview Table</Heading>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <CoinTable coins={coins} />
        </Flex>
      </Box>
    </Box>
  );
}