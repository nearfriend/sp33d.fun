"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import CreateToken from "../../components/CreateToken";
import Leaderboard from "../../components/Leaderboard";
import BuySell from "../../components/BuySell";
import Presale from "../../components/Presale";
import Chat from "../../components/Chat";
import { isMobile } from "react-device-detect";

const Home = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div style={{ height: "100vh", background: isMobile ? "white" : "" }}>
      <Header setActiveTab={setActiveTab} />
      {
        isMobile ? <>
          {activeTab === "create" ? (
            <CreateToken setActiveTab={setActiveTab} />
          ) : activeTab === "leaderboard" ? (
            <Leaderboard />
          ) : activeTab === "presale" ? (
            <Presale />
          ) : (
            <Chat />
          )}
        </> :
          <div style={{ height: "85%" }}>
            {activeTab === "create" ? (
              <CreateToken setActiveTab={setActiveTab} />
            ) : activeTab === "leaderboard" ? (
              <Leaderboard />
            ) : activeTab === "presale" ? (
              <Presale />
            ) : (
              <Chat />
            )}
          </div>
      }
    </div>
  );
};

export default Home;
