// frontend/components/TimeSeriesChart.js
import React, { useState } from "react";
import { Box, Text, Select } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { format } from "date-fns";

// 1. Define a master set of all possible metrics:
const ALL_METRIC_OPTIONS = [
  { value: "close", label: "Price (Close)" },
  { value: "open", label: "Price (Open)" },
  { value: "high", label: "Price (High)" },
  { value: "low", label: "Price (Low)" },
  { value: "volume_24h", label: "24h Volume" },
  { value: "market_cap", label: "Market Cap" },
  { value: "market_dominance", label: "Market Dominance" },
  { value: "circulating_supply", label: "Circulating Supply" },
  { value: "sentiment", label: "Sentiment" },
  { value: "spam", label: "Spam Posts" },
  { value: "volatility", label: "Volatility" },
  { value: "contributors_active", label: "Active Contributors" },
  { value: "contributors_created", label: "New Contributors" },
  { value: "posts_active", label: "Active Posts" },
  { value: "posts_created", label: "New Posts" },
  { value: "interactions", label: "Interactions" },
  { value: "social_dominance", label: "Social Dominance" }
];

// 2. Identify which metrics are “coin-specific” so we can exclude them for topics:
const COIN_ONLY_METRICS = new Set([
  "close",
  "open",
  "high",
  "low",
  "volume_24h",
  "market_cap",
  "market_dominance",
  "circulating_supply",
  "volatility"
]);

// Helper to format UNIX timestamps (in seconds).
const formatDate = (timestamp) => {
  return format(new Date(timestamp * 1000), "MMM dd HH:mm");
};

// Custom tooltip for the chart.
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box bg="black" p={3} borderRadius="md" boxShadow="lg">
        <Text fontWeight="bold">{formatDate(data.time)}</Text>
        {Object.entries(data).map(([key, val]) => {
          // Skip keys you don’t want displayed
          if (key === "time" || key === "alt_rank" || key === "galaxy_score") {
            return null;
          }

          let displayValue = val;
          if (typeof val === "number") {
            if (key.includes("dominance") || key === "sentiment") {
              displayValue = `${val.toFixed(2)}%`;
            } else if (key.includes("volume") || key.includes("market_cap")) {
              displayValue = `$${val.toLocaleString(undefined, {
                maximumFractionDigits: 0
              })}`;
            } else if (key === "volatility") {
              displayValue = val.toFixed(4);
            } else {
              displayValue = val.toLocaleString();
            }
          }
          return (
            <Text key={key} fontSize="sm">
              {key.replace(/_/g, " ")}: {displayValue}
            </Text>
          );
        })}
      </Box>
    );
  }
  return null;
};

// Main TimeSeriesChart component
// Pass isCoin={true} for coin charts, or isCoin={false} for topics.
const TimeSeriesChart = ({
  timeSeries,
  defaultMetric = "interactions",
  isCoin = false
}) => {
  // Filter out coin-only metrics if not a coin
  const metricOptions = isCoin
    ? ALL_METRIC_OPTIONS
    : ALL_METRIC_OPTIONS.filter((opt) => !COIN_ONLY_METRICS.has(opt.value));

  const [selectedMetric, setSelectedMetric] = useState(defaultMetric);

  return (
    <Box mb={6} p={4} borderWidth="1px" borderRadius="md">
      <Select
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        mb={4}
        maxWidth="300px"
      >
        {metricOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {timeSeries && timeSeries.length > 0 ? (
        <Box height="400px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeSeries}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={formatDate}
                minTickGap={20}
              />
              <YAxis
                tickFormatter={(value) => {
                  // If using coin metrics that are typically % or $:
                  if (
                    selectedMetric.includes("dominance") ||
                    selectedMetric === "sentiment"
                  ) {
                    return `${value}%`;
                  }
                  if (["volume_24h", "market_cap"].includes(selectedMetric)) {
                    return `$${Math.round(value / 1e6)}M`;
                  }
                  return value.toLocaleString();
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke="#3182ce"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Text>No time series data available</Text>
      )}
    </Box>
  );
};

export default TimeSeriesChart;
