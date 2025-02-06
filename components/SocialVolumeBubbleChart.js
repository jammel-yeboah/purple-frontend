// components/SocialVolumeBubbleChart.js

import React from "react";
import { Bubble } from "react-chartjs-2";
import "chart.js/auto"; // Auto-registers Chart.js components

/**
 * Props: coins (array of coin objects)
 * Example coin fields needed:
 *  - market_cap (number)
 *  - social_volume_24h (number)
 *  - social_dominance (number)
 *  - percent_change_24h (number)
 *  - symbol (string) - used for labeling
 */
export default function SocialVolumeBubbleChart({ coins = [] }) {

  // Transform coin data into chart-friendly format
  const chartData = coins.map((coin) => {
    const marketCap = coin.market_cap || 1; // fallback to 1 to avoid log(0)
    const socialVolume = coin.social_volume_24h || 0;
    const socialDominance = coin.social_dominance || 0;
    const priceChange = coin.percent_change_24h || 0;

    // Define bubble radius (r) using socialDominance, capping at e.g. 20 for visual consistency
    const radius = Math.min(socialDominance, 20);

    // Color: green if price change > 0, red otherwise
    const backgroundColor = priceChange > 0 ? "rgba(0, 200, 0, 0.5)" : "rgba(200, 0, 0, 0.5)";

    return {
      x: Math.log10(marketCap),   // Using log scale for better distribution
      y: socialVolume,
      r: radius,
      backgroundColor,
      // Optional label for tooltips
      symbol: coin.symbol
    };
  });

  const data = {
    datasets: [
      {
        label: "Social Volume Bubble",
        data: chartData,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          // Custom tooltip to display coin symbol & stats
          label: function (context) {
            const { x, y, r, backgroundColor, symbol } = context.raw;
            return [
              `Symbol: ${symbol}`,
              `Market Cap (log10): ${x.toFixed(2)}`,
              `Social Volume (24h): ${y}`,
              `Social Dominance: ${r}%`,
            ];
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "linear", // We'll manually use Math.log10 for data.x
        title: {
          display: true,
          text: "Log(Market Cap)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Social Volume (24h)",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Bubble data={data} options={options} />
    </div>
  );
}
