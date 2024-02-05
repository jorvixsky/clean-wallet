import {
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TokenList from "./components/TokenList";
import { useNetwork } from "wagmi";
import { ChainID } from "@covalenthq/client-sdk";
import Burn from "./components/Burn";
import { BurnableToken } from "./components/Burn";
import { useState } from "react";

function App() {

  const { chain } = useNetwork();
  const [burnableTokens, setBurnableTokens] = useState<BurnableToken[]>([]);

  console.log(burnableTokens)

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        p="1rem"
        boxShadow="md"
        bg="blue.500"
      >
        <Text color="white" mr="1rem" fontSize="2xl" fontWeight="bold">
          Clean Wallet
        </Text>
        <ConnectButton />
      </Flex>
      <Box maxW="1280px" m="0 auto" p="2rem" textAlign="center">
        <Burn burnableTokens={burnableTokens}/>
        <TokenList chain={chain?.id as ChainID} onBurnableTokensChange={setBurnableTokens}/>
      </Box>
    </>
  );
}

export default App;
