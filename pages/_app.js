// pages/_app.js
import React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  // SlopeWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import Layout from "../components/Layout";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Mainnet;
  // const endpoint = "https://crimson-withered-sailboat.solana-mainnet.quiknode.pro/0fcd5ddfcd8c9c31b605b823cc228e05dde7db27";
  const endpoint = "https://api.mainnet-beta.solana.com";

  // 1) Create the adapter instances.
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    // new SlopeWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter()
  ];

  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
