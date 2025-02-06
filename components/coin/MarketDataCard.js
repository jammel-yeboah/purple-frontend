import { Box, SimpleGrid } from "@chakra-ui/react";
import { MarketDataItem } from "./MarketDataItem";

export const MarketDataCard = ({ market }) => {
  if (!market) return null;

  // Create an array of item data to map over (for example):
  const items = [
    {
      label: "Price",
      value: market.price ? `$${market.price.toFixed(2)}` : "N/A",
      change: null, // not used
    },
    {
      label: "24h Change",
      value: market.percent_change_24h
        ? `${market.percent_change_24h.toFixed(2)}%`
        : "N/A",
      change: market.percent_change_24h, // color-coded in MarketDataItem
    },
    {
      label: "Market Cap",
      value: market.market_cap
        ? `$${market.market_cap.toLocaleString()}`
        : "N/A",
      change: null,
    },
    {
      label: "24h Volume",
      value: market.volume_24h
        ? `$${market.volume_24h.toLocaleString()}`
        : "N/A",
      change: null,
    },
  ];

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" h="100%">
      {/* minChildWidth for responsiveness */}
      <SimpleGrid spacing={4} minChildWidth="220px">
        {items.map(({ label, value, change }) => (
          <MarketDataItem
            key={label}
            label={label}
            value={value}
            change={change}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
