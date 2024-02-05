import { TableContainer, Text, Table, Thead, Tr, Th, Tbody, Td, Checkbox } from "@chakra-ui/react";
import { CovalentClient, BalanceItem, ChainID } from "@covalenthq/client-sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface TokenListProps {
    chain?: ChainID;
}

export default function TokenList({ chain }: TokenListProps) {

    const api = import.meta.env.VITE_COVALENT_API_KEY;

    const { address } = useAccount();

    const client = new CovalentClient(api);

    const [tokens, setTokens] = useState<BalanceItem[]>([]);

    useEffect(() => {
        async function getTokens() {
            if (!chain || !address) return;
            try {
                const tokens = await client.BalanceService.getTokenBalancesForWalletAddress(chain, address);
                return tokens.data.items;
            } catch (error) {
                return error;
            }
        }
        getTokens().then((tokens) => {
            setTokens(tokens as BalanceItem[]);
        }).catch(
            console.error
        );
    }, [chain, address])

    if (!api) return <Text>API key not found</Text>
    if (!address) return <ConnectButton />

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Contract</Th>
                        <Th>Remove</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tokens && tokens.map((token: BalanceItem) => (
                        <Tr key={token.contract_address}>
                            <Td>{token.contract_name ? token.contract_name : "Null"}</Td>
                            <Td>{token.contract_address}</Td>
                            <Td>
                                <Checkbox />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}