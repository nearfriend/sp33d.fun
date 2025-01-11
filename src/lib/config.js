"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { bscTestnet, sonic, sonicTestnet } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import PoolABI from "./poolABI.json";
import routerABI from "./routerABI.json";

const projectId = "d9c46c90f96740613e82b9205a8d64cd";

const supportedChains = [bscTestnet, sonic, sonicTestnet];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});

export const Contracts = {
  POOL: {
    address: "0x4994Dd5EFA3dAE77f5564Ee6AC0Ef16321C1e2AB",
    abi: PoolABI,
  },
  Router: {
    address: "0xcC6169aA1E879d3a4227536671F85afdb2d23fAD",
    abi: routerABI,
  },
  WS: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
};
