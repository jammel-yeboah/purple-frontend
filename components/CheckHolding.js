// components/CheckHolding.js
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Box, Text } from "@chakra-ui/react";

export default function CheckHolding({ mintAddress }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [balance, setBalance] = useState(null); // null indicates not fetched
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user is not connected, reset
    if (!publicKey) {
      setBalance(null);
      return;
    }

    // If balance is already fetched, skip repeated calls
    if (balance !== null) return;

    (async () => {
      try {
        setLoading(true);
        const mintPubKey = new PublicKey(mintAddress);

        // Filter by mint to get only accounts for this specific token
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { mint: mintPubKey }
        );

        let totalHeld = 0;

        tokenAccounts.value.forEach(({ account }) => {
          const info = account.data.parsed.info;
          const tokenAmount = info.tokenAmount;
          // using uiAmountString to avoid rounding issues
          const amountStr = tokenAmount.uiAmountString;
          const mint = info.mint;

          if (mint === mintAddress) {
            // parse the string to float
            totalHeld += parseFloat(amountStr);
          }
        });

        setBalance(totalHeld);
      } catch (err) {
        console.error("Error checking token holdings:", err);
        setBalance(0);
      } finally {
        setLoading(false);
      }
    })();
  }, [publicKey, connection, mintAddress, balance]);

  if (!publicKey) {
    return (
      <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
        <Text>Please connect your wallet.</Text>
      </Box>
    );
  }

  return (
    <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
      {loading ? (
        <Text>Loading token balance...</Text>
      ) : (
        <>
          <Text>
            Public Key: <strong>{publicKey.toBase58()}</strong>
          </Text>
          <Text mt={2}>
            Holding:{" "}
            <strong>{balance !== null ? balance.toLocaleString() : "N/A"}</strong>{" "}
            tokens of {mintAddress}
          </Text>
        </>
      )}
    </Box>
  );
}
