import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";

const RPC_URL = "https://sonic.drpc.org";
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000,
});

const useWeb3 = () => {
  const { isConnected, connector } = useAccount();

  const [web3, setWeb3] = useState(new Web3(httpProvider));

  useEffect(() => {
    (async () => {
      if (isConnected) {
        const provider = await connector?.getProvider();
        setWeb3(new Web3(provider || httpProvider));
      }
    })();
  }, [isConnected]);

  return web3;
};

export default useWeb3;
