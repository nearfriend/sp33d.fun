import React from "react";
import styled from "styled-components";
import { FaPlus, FaTrophy } from "react-icons/fa";
import { ConnectBtn } from "./connectButton";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  color: white;
  font-family: "Sonic", sans-serif;
  position: relative;
  z-index: 999;
`;

const TabButton = styled.button`
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: black;
  }
  background: #414fff;
  height: 2.5em;
  padding: 10px 20px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;

  /* Mobile Styles */
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 7px 8px;
  }
`;

const Header = ({ setActiveTab }) => {
  const handleSupportClick = () => {
    window.open("https://t.me/yourTelegramLink", "_blank");
  };

  return (
    <HeaderContainer>
      <div className="menu">
        <div className="logo">
          <img src="splogo.png" alt="Logo" />
        </div>
        <div className="side">
          <ConnectBtn />
        </div>
      </div>
      <div className="inner-container">
        <TabButton onClick={() => setActiveTab("create")}>
          <FaPlus />
          Create
        </TabButton>
        <TabButton onClick={() => setActiveTab("leaderboard")}>
          <FaTrophy />
          Leaderboard
        </TabButton>
        <TabButton onClick={() => setActiveTab("presale")}>
          Presale
        </TabButton>
        <TabButton onClick={() => setActiveTab("chat")}>
          AI Chat
        </TabButton>
        <TabButton>
          <a
            href="#!"
            onClick={handleSupportClick}
            style={{ cursor: "pointer", color: "inherit" }}
          >
            [ support ]
          </a>
        </TabButton>
      </div>
    </HeaderContainer>
  );
};

export default Header;
