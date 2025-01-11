import { useEffect, useState } from "react";
import useWeb3 from "./useWeb3";
import { Contracts } from "../src/lib/config.js";

const useContract = (abi, address, contractOptions) => {
  const web3 = useWeb3();
  const [contract, setContract] = useState(
    new web3.eth.Contract(abi, address, contractOptions)
  );

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions));
  }, [abi, address, contractOptions, web3]);

  return contract;
};

export const usePoolContract = () => {
  return useContract(Contracts.POOL.abi, Contracts.POOL.address);
};

export const useRouterContract = () => {
  return useContract(Contracts.Router.abi, Contracts.Router.address);
};

export default useContract;
