"use client";

import { useEffect, useRef } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <div className="connect">
        <button
          className="btn"
          onClick={async () => {
            // Disconnecting wallet first because sometimes when is connected but the user is not connected
            if (isConnected) {
              disconnect();
            }
            openConnectModal?.();
          }}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect"}
        </button>
      </div>
    );
  }

  if (isConnected && !chain) {
    return (
      <div className="connect">
        <button className="btn" onClick={openChainModal}>
          Wrong network
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl w-full flex items-center justify-between">
      <div className="connect">
        <button onClick={async () => openAccountModal?.()}>
          {address.slice(0, 4)}...{address.slice(-4)}
        </button>
      </div>
    </div>
  );
};
