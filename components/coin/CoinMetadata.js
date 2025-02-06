import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList
} from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaGlobe, FaReddit } from "react-icons/fa";

const SocialLink = ({ icon, href, children }) => (
  <Flex align="center" mt={2}>
    {icon}
    <Link href={href} ml={2} color="accent" isExternal>
      {children}
    </Link>
  </Flex>
);

export const CoinMetadata = ({ meta }) => {
  if (!meta) return null;

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <Flex align="center" mb={4}>
        {meta.image && (
          <Image
            src={meta.image}
            boxSize="64px"
            mr={4}
            alt={`${meta.name} logo`}
          />
        )}
        <Box>
          <Heading size="lg">{meta.name}</Heading>
          <Text fontSize="xl" color="gray.500">
            {meta.symbol}
          </Text>
        </Box>
      </Flex>

      {meta.short_summary && (
        <Text mt={2} fontSize="sm" color="gray.300">
          {meta.short_summary}
        </Text>
      )}

      <Box mt={4}>
        {(meta.website_link ||
          meta.twitter_link ||
          meta.github_link ||
          meta.reddit_link ||
          meta.coingecko_link ||
          meta.coinmarketcap_link ||
          meta.whitepaper_link) && (
          <Heading size="sm" mb={2}>
            Links
          </Heading>
        )}

        {meta.website_link && (
          <SocialLink icon={<FaGlobe />} href={meta.website_link}>
            Official Website
          </SocialLink>
        )}
        {meta.twitter_link && (
          <SocialLink icon={<FaTwitter />} href={meta.twitter_link}>
            Twitter
          </SocialLink>
        )}
        {meta.github_link && (
          <SocialLink icon={<FaGithub />} href={meta.github_link}>
            GitHub
          </SocialLink>
        )}
        {meta.reddit_link && (
          <SocialLink icon={<FaReddit />} href={meta.reddit_link}>
            Reddit
          </SocialLink>
        )}
        {meta.whitepaper_link && (
          <Text mt={2}>
            <Link href={meta.whitepaper_link} color="accent" isExternal>
              Whitepaper
            </Link>
          </Text>
        )}
        {meta.coingecko_link && (
          <Text mt={2}>
            <Link href={meta.coingecko_link} color="accent" isExternal>
              CoinGecko
            </Link>
          </Text>
        )}
        {meta.coinmarketcap_link && (
          <Text mt={2}>
            <Link href={meta.coinmarketcap_link} color="accent" isExternal>
              CoinMarketCap
            </Link>
          </Text>
        )}
      </Box>

      {Array.isArray(meta.blockchain) && meta.blockchain.length > 0 && (
        <Box mt={6}>
          <Heading size="sm" mb={2}>
            Chains to Trade Coin
          </Heading>
          <UnorderedList ml={4}>
            {meta.blockchain.map((chain) => (
              <ListItem key={chain.network}>
                <Text as="span" fontWeight="bold">
                  {chain.network.toUpperCase()}:
                </Text>{" "}
                <Text as="span" color="gray.600">
                  {chain.address || "N/A"}, decimals: {chain.decimals}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
    </Box>
  );
};
