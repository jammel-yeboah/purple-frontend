import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import ConnectWalletButton from "../components/ConnectWalletButton";

const Layout = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box>
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        p={4}
        bg="accent"
        flexWrap="wrap"
      >
        {/* Left side: App name linking to home */}
        <Heading size="lg">
          <ChakraLink
            as={NextLink}
            href="/"
            textDecoration="underline"
            color="white"
          >
            purple
          </ChakraLink>
        </Heading>

        {/* Right side: Purple AI, Docs, Connect Wallet */}
        <Flex align="center" flexWrap="wrap">
          {/* Purple AI link */}
          <ChakraLink
            href="https://purple-3.gitbook.io/purple/purple-ai/purple-ai-coming-soon"
            color="white"
            mr={[3, 4, 6]} // Adjusts margin dynamically
            isExternal
            fontSize={["sm", "md", "lg"]} // Adjusts size dynamically
          >
            Purple AI
          </ChakraLink>

          {/* Docs link */}
          <ChakraLink
            href="https://purple-3.gitbook.io/purple"
            color="white"
            mr={[3, 4, 6]}
            isExternal
            fontSize={["sm", "md", "lg"]}
          >
            Docs
          </ChakraLink>

          {/* Connect Wallet button */}
          {isClient && <ConnectWalletButton />}
        </Flex>
      </Flex>

      <Box p={4}>{children}</Box>
    </Box>
  );
};

export default Layout;