import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Link as ChakraLink
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ConnectWalletButtonNoSSR = dynamic(
    () => import("../../components/ConnectWalletButton"),
    { ssr: false }
  );

export default function PurpleAIWaitlist() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "Email missing",
        description: "Please enter your email.",
        status: "error",
        duration: 3000
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          reason,
          // if you want to store a walletAddress, pass it here
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        // throw new Error(data.error || "Failed to join waitlist");
      }

      toast({
        title: "Success",
        description: "You have joined the Purple AI waitlist!",
        status: "success",
        duration: 3000,
      });
      setEmail("");
      setReason("");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="800px" mx="auto" py={8}>
      <Heading as="h1" size="xl" mb={4}>
        Purple AI Waitlist
      </Heading>

      <Text mb={6} fontSize="md" color="gray.200">
        We’re building a powerful AI chatbot that will help you query real-time crypto data,
        build trading strategies, and create automated alerts — all through
        natural language. If you’d like early access, sign up below.
      </Text>

      {/* Connect Wallet optional */}
      <Text mb={2} fontSize="md" color="gray.200">
        Optionally, connect your Solana wallet ...
      </Text>
      <Box mb={6}>
        {/* Render the dynamic, client-side only component */}
        <ConnectWalletButtonNoSSR />
      </Box>

      {/* Form Fields */}
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontWeight="bold" mb={1}>Email Address</Text>
          <Input
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </Box>

        <Box>
          <Text fontWeight="bold" mb={1}>Why do you want to join Purple AI?</Text>
          <Textarea
            placeholder="Tell us your use case or what excites you about Purple AI!"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Box>

        <Button
          colorScheme="purple"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Submitting"
        >
          Join Waitlist
        </Button>
      </VStack>

      <Text mt={6} fontSize="md" color="gray.200">
        Meanwhile, follow us on{" "}
        <ChakraLink
          href="https://twitter.com/purplappdotfun"
          color="purple.500"
          isExternal
        >
          Twitter
        </ChakraLink>{" "}
        to stay updated on all things Purple AI
      </Text>
    </Box>
  );
}
