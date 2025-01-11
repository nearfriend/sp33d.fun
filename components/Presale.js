import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const CreateTokenContainer = styled.div`
  text-align: left;
  padding: 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 2.5em;
  row-gap: 11px;
  min-width: 640px;
  position: relative;
  z-index: 999;
`;

const InputField = styled.input`
  padding: 20px 20px 20px 45px;
  font-size: 16px;
  font-weight: 700;
  background: #414fff29;
  text-align: left;
  border-radius: 6px;
  border: solid 1px #414fff4d;
  color: black;
  flex: 1;
`;

const CreateButton = styled.button`
  padding: 20px 0px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 6px;
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

const Presale = () => {
  const [tokenAmount, setTokenAmount] = useState("");
  const [coinamount, setCoinamount] = useState("");
  const [selected, setSelected] = useState(false);
  const [ftmprice, setFTMPrice] = useState(0);

  async function getFTMPrice() {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd"
    );
    const data = await response.json();
    const Price = data.fantom.usd; // Price in USD
    setFTMPrice(Price);
  }

  useEffect(() => {}, [coinamount, tokenAmount]);

  useEffect(() => {
    getFTMPrice();
  }, []);

  return (
    <div className="inner-token-container">
      <Toaster position="top-right" />
      <CreateTokenContainer>
        <div className="buysell-button">
          {selected ? (
            <>
              <CreateButton
                onClick={() => {
                  setSelected(false);
                }}
              >
                <img
                  src="./sonic.webp"
                  alt="sonic"
                  style={{ width: "30px", height: "30px" }}
                />
                Sonic
              </CreateButton>
              <h2
                style={{
                  cursor: selected ? "default" : "pointer",
                  color: selected ? "grey" : "black",
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                <img
                  src="./fantom-dark.png"
                  alt="sonic"
                  style={{ width: "30px", height: "30px", marginRight: "5px" }}
                />
                Fantom
              </h2>
            </>
          ) : (
            <>
              <h2
                style={{
                  cursor: selected ? "pointer" : "default",
                  color: selected ? "black" : "grey",
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                <img
                  src="./sonic-dark.svg"
                  alt="sonic"
                  style={{ width: "30px", height: "30px", marginRight: "5px" }}
                />
                Sonic
              </h2>
              <CreateButton
                onClick={() => {
                  setSelected(true);
                }}
              >
                <img
                  src="./fantom.png"
                  alt="sonic"
                  style={{ width: "30px", height: "30px" }}
                />
                Fantom
              </CreateButton>
            </>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ width: "200px", height: "200px" }}
            src="/qr_code.png"
            alt="QR Code"
          />
        </div>
        <h4 style={{ textAlign: "center", color: "black" }}>
          Send {selected ? "Fantom" : "Sonic"} to <br />{" "}
          {selected
            ? "0xE95653B23DF1eE3948935F6D0b06bc6EF5A29500"
            : "0xE95653B23DF1eE3948935F6D0b06bc6EF5A29500"}
          <CopyToClipboard
            text={
              selected
                ? "0xE95653B23DF1eE3948935F6D0b06bc6EF5A29500"
                : "0xE95653B23DF1eE3948935F6D0b06bc6EF5A29500"
            }
            onCopy={() => {
              toast.success("Address Copied!");
            }}
          >
            <span
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                color: "#414fff",
              }}
            >
              Copy
            </span>
          </CopyToClipboard>
        </h4>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            {selected ? (
              <img
                src="./fantom-dark.png"
                alt="sonic"
                style={{
                  width: "30px",
                  marginLeft: "10px",
                  position: "absolute",
                  height: "30px",
                }}
              />
            ) : (
              <img
                src="./sonic-dark.svg"
                alt="sonic"
                style={{
                  width: "30px",
                  marginLeft: "10px",
                  position: "absolute",
                  height: "30px",
                }}
              />
            )}
            <InputField
              type="text"
              placeholder="00000"
              value={coinamount}
              onChange={(e) => {
                setTokenAmount(
                  Number(e.target.value * (ftmprice / 0.001)).toFixed(5)
                );
                setCoinamount(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="./sp33dlogo.png"
              alt="sonic"
              style={{
                width: "30px",
                marginLeft: "10px",
                position: "absolute",
                height: "30px",
              }}
            />
            <InputField
              type="text"
              placeholder="00000 $SP33D"
              value={tokenAmount}
              onChange={(e) => {
                setCoinamount(
                  Number(e.target.value * (0.001 / ftmprice)).toFixed(5)
                );
                setTokenAmount(e.target.value);
              }}
            />
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            color: "black",
            border: "1px solid #414fff",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Total supply :</h4>
            <h4>21,000,000</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>IDO supply :</h4>
            <h4>10,500,000</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Min :</h4>
            <h4>
              (~$ {Number(ftmprice * 10).toFixed(5)} ) 10{" "}
              {selected ? "FTM" : "S"}
            </h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Max :</h4>
            <h4>
              (~$ {Number(ftmprice * 100000).toFixed(5)} ) 100000{" "}
              {selected ? "FTM" : "S"}
            </h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Price :</h4>
            <h4>0.001$</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Hardcap :</h4>
            <h4>72%</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Ends in :</h4>
            <h4>20/4/2025</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Launch date :</h4>
            <h4>20/4/2024</h4>
          </div>
        </div>
      </CreateTokenContainer>
    </div>
  );
};

export default Presale;
