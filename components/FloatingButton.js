"use client";
import React from "react";
import styled from "styled-components";
import { FaHandsHelping } from "react-icons/fa"; // Support-themed icon
import { MdHeadsetMic } from "react-icons/md";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  color: #333; /* Dark color for contrast */
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #f0f0f0; /* Slightly darker white for hover effect */
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
`;

const FloatingSupportButton = () => {
  const handleClick = () => {
    window.open("https://t.me/yourTelegramLink", "_blank");
  };

  return (
    <FloatingButton onClick={handleClick} aria-label="Support on Telegram">
      <MdHeadsetMic />
    </FloatingButton>
  );
};

export default FloatingSupportButton;
