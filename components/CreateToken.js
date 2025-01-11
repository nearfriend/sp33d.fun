"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaBolt } from "react-icons/fa";
import { PinataSDK } from "pinata";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useAccount } from "wagmi";
import { usePoolContract } from "../hooks/useContracts";
import BigNumber from "bignumber.js";
import useWeb3 from "../hooks/useWeb3";

export const apikey = "23eb84f8dfb91dd81628";
export const apisecret =
  "c26c07d8ee22bfec98dd31772376cd1db0ab310abffc1aaa2f5232c1a56775e3";

const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const jsonUrl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

const CreateTokenContainer = styled.div`
  text-align: center;
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
  text-align: center;
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

  &:hover {
    background: black;
    color: white;
  }
`;

const FileInput = styled.input`
  display: none; /* Hide the default file input */
`;

const CustomUploadButton = styled.label`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #414fff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: #333; /* Darker shade on hover */
  }
`;

const ImagePreviewContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hasImage",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ hasImage }) =>
    hasImage ? "200px" : "50px"}; /* Fixed height for image or placeholder */
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${({ hasImage }) =>
    hasImage
      ? "transparent"
      : "#f0f0f0"}; /* Light background for placeholder */
  color: #aaa; /* Text color for placeholder */
  font-size: 14px;
  text-align: center;
`;

const ImagePreview = styled.img`
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  object-fit: contain; /* Maintain aspect ratio and fit within the container */
`;

const CreateToken = ({ setActiveTab }) => {
  const web3 = useWeb3();
  const { address } = useAccount();
  const poolContract = usePoolContract();

  const [loading, setLoading] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [twitterLink, setTwitterLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [launchedData, setLaunchedData] = useState({
    uri: "",
    tokenName: "",
    tokenSymbol: "",
    tokenAddress: "",
    lpAddress: "",
  });

  const [selectedValue, setSelectedValue] = useState(0.1);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadFileToPinata = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(url, formData, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
          pinata_api_key: apikey,
          pinata_secret_api_key: apisecret,
        },
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadJsonInfo = async(img)=>{
    console.log(img,twitterLink,websiteLink)
    const response = await axios.post(jsonUrl, {
      img,
      twitterLink,
      websiteLink
    }, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `Application/json`,
        pinata_api_key: apikey,
        pinata_secret_api_key: apisecret,
      },
    });
    return response.data.IpfsHash
  }

  const handleCreate = async () => {
    if (tokenName && tokenSymbol && imageFile) {
      try {
        setLoading("upload");
        const cid = await uploadFileToPinata(imageFile);
        console.log("image cid", cid);

        const jsonCid = await uploadJsonInfo(cid);
        console.log('jsonCid',jsonCid)

        setLoading("launch");

        const initialAmount = new BigNumber(selectedValue).times(10 ** 18).toString();
        const estimatedGas = await poolContract.methods
          .launch(address, tokenName, tokenSymbol, jsonCid)
          .estimateGas({
            from: address,
            value: initialAmount,
          });

        const tx = await poolContract.methods
          .launch(address, tokenName, tokenSymbol, jsonCid)
          .send({
            value: initialAmount,
            from: address,
            gas: estimatedGas,
            gasPrice: web3.utils.toWei("5", "gwei"),
          });

        const data = {
          uri: cid,
          tokenName,
          tokenSymbol,
          tokenAddress: tx.events?.Launched?.returnValues?.token,
          lpAddress: tx.events?.HandleLiquidity?.returnValues?.pair,
        };

        setLaunchedData(data);

        console.log(tx);
        toast.success("Congratlation! \nNew Meme Coin Created Successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Error occurred!");
      } finally {
        setLoading("");
      }
    } else {
      toast.error("please input valid infomation!");
    }
  };

  return (
    <div className="inner-token-container">
      <Toaster />
      <CreateTokenContainer>
        <h1 className="h1-create">Create a Sonic Memecoin</h1>
        <InputField
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
        />
        <FileInput
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={handleImageChange}
        />
        <CustomUploadButton htmlFor="file-upload">
          Upload Image
        </CustomUploadButton>
        <ImagePreviewContainer hasImage={!!imagePreview}>
          {imagePreview ? (
            <ImagePreview src={imagePreview} alt="Image Preview" />
          ) : (
            "No image uploaded yet"
          )}
        </ImagePreviewContainer>
        <h1
          className="h1-create"
          style={{ paddingBottom: "0px", fontSize: "16px" }}
        >
          AddLiquidity Amount
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <div>
            <input
              style={{ marginRight: "8px" }}
              type="radio"
              id="option1"
              value="option1"
              checked={selectedValue === 0.1}
              onChange={() => handleRadioChange(0.1)}
            />
            <label htmlFor="option1" style={{ color: "black" }}>
              0.1 S
            </label>
          </div>

          <div>
            <input
              style={{ marginRight: "8px" }}
              type="radio"
              id="option2"
              value="option2"
              checked={selectedValue === 1}
              onChange={() => handleRadioChange(1)}
            />
            <label htmlFor="option2" style={{ color: "black" }}>
              1 S
            </label>
          </div>
        </div>
        <InputField
          type="text"
          placeholder="Twitter Link (optional)"
          value={twitterLink}
          onChange={(e) => setTwitterLink(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Website Link (optional)"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />
        {(() => {
          if (loading === "upload") {
            return <CreateButton disabled>Uploading Image...</CreateButton>;
          }
          if (loading === "launch") {
            return (
              <CreateButton disabled>
                <FaBolt /> Launching...
              </CreateButton>
            );
          }
          return (
            <CreateButton onClick={handleCreate}>
              <FaBolt /> Create a Sp33d.fun Token
            </CreateButton>
          );
        })()}
      </CreateTokenContainer>

      {launchedData.tokenAddress ? (
        <div
          className="new-meme-card"
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <img
            src={`https://rose-famous-ferret-62.mypinata.cloud/ipfs/${launchedData.uri}`}
            alt="uri"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p>{launchedData.tokenName}</p>&nbsp;
              <p>({launchedData.tokenSymbol})</p>
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: "20px" }}>Token Address</p>
              <p style={{ fontSize: 12, lineHeight: "12px" }}>
                {launchedData.tokenAddress}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: "20px" }}>LP Address</p>
              <p style={{ fontSize: 12, lineHeight: "12px" }}>
                {launchedData.lpAddress}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateToken;
