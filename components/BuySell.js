import React, { useState } from "react";
import styled from "styled-components";
import { FaTrophy, FaTwitter, FaGlobe } from "react-icons/fa";

const CreateTokenContainer = styled.div`
  text-align: left;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 2.5em;
  row-gap: 11px;
  min-width: 400px;
  position: relative;
  z-index: 999;
`;

const InputField = styled.input`
  padding: 20px;
  font-size: 16px;
  background: #414fff29;
  text-align: left;
  border: solid 1px #414fff4d;
  color: black;
`;

const CreateButton = styled.button`
  padding: 20px 20px;
  font-size: 16px;
  background-color: #414fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  flex: 1;
  color: white;

  &:hover {
    background: black;
  }
`;

const BuySell = () => {
  // Sample data for leaderboard with images, ranks, and URLs
  const tokens = [
    {
      rank: 1,
      name: "SonicCoin",
      symbol: "SONIC",
      supply: "1M",
      mc: "$1M",
      price: "$1",
      image: "/meme.png",
      twitter: "https://twitter.com/soniccoin",
      website: "https://soniccoin.com",
    },
    {
      rank: 2,
      name: "TailsToken",
      symbol: "TAILS",
      supply: "500K",
      mc: "$500K",
      price: "$1",
      image: "/meme.png",
      twitter: "https://twitter.com/tailstoken",
      website: "https://tailstoken.com",
    },
    {
      rank: 3,
      name: "KnucklesCoin",
      symbol: "KNUCKLES",
      supply: "750K",
      mc: "$750K",
      price: "$1",
      image: "/meme.png",
      twitter: "https://twitter.com/knucklescoin",
      website: "https://knucklescoin.com",
    },
    {
      rank: 4,
      name: "AmyToken",
      symbol: "AMY",
      supply: "300K",
      mc: "$300K",
      price: "$1",
      image: "/meme.png",
      twitter: "https://twitter.com/amytoken",
      website: "https://amytoken.com",
    },
  ];

  const [tokenAmount, setTokenAmount] = useState("");
  const [selected, setSelected] = useState(false);

  return (
    <div className="inner-token-container">
      <CreateTokenContainer>
        <h1>boom</h1>
        <h1>💥</h1>
        <h3>Token : 0x8f49EFC0F5EC36FBe3aE9c21E3C352FDA115f034</h3>
        <div className="buysell-button">
          <h2
            onClick={() => {
              if (selected) {
                setSelected(false);
              }
            }}
            style={{
              cursor: selected ? "pointer" : "default",
              color: selected ? "black" : "grey",
            }}
          >
            Buy
          </h2>{" "}
          <h2>/</h2>{" "}
          <h2
            style={{
              cursor: selected ? "default" : "pointer",
              color: selected ? "grey" : "black",
            }}
            onClick={() => {
              if (!selected) {
                setSelected(true);
              }
            }}
          >
            Sell
          </h2>
        </div>
        <InputField
          type="text"
          placeholder="Token Amount"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
        />
        <CreateButton>{selected ? "Sell" : "Buy"}</CreateButton>
        <h3>Curve Progress</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>3.58%</h3>
          <h3>100%</h3>
        </div>
        <progress id="file" max="100" value="3.58" style={{ width: "100%" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>269.6 S</h3>
          <h3>7500.00 Max</h3>
        </div>
      </CreateTokenContainer>
    </div>
  );
};

export default BuySell;
