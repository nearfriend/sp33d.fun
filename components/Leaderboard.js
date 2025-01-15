import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FaTrophy, FaTwitter, FaGlobe } from "react-icons/fa";
import FloatingSupportButton from "./FloatingButton";
import { usePoolContract, useRouterContract } from "../hooks/useContracts";
import BigNumber from "bignumber.js";
import { Contracts } from "../src/lib/config.js";
import { isMobile } from "react-device-detect";

const LeaderboardContainer = styled.div`
  text-align: center;
  width: 52%;
  margin: 0 auto;
  background: white;
  padding: 65px 30px 30px 30px !important;
  position: relative;
  z-index: 999;

  @media (max-width: 768px) {
    width: 99%;
  }
`;

const TokenTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: black;
  min-width: 600px; /* Ensure table doesn't shrink too much */

  @media (max-width: 768px) {
    font-size: 0.9em; /* Reduce font size on smaller screens */
  }
`;

const TableHeader = styled.th`
  background-color: #414fff;
  color: white;
  padding: 10px;
  position:sticky @media (max-width: 768px) {
    padding: 8px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgb(255, 255, 255);
  }
`;

const TableData = styled.td`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  text-align: left; /* Align text to the left */

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const CoinImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  vertical-align: middle;

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const IconLink = styled.a`
  color: inherit; /* Inherit color from parent */
  cursor: pointer;

  &:hover {
    color: #414fff; /* Change color on hover */
  }
`;

const CreateButton = isMobile ? styled.button`
  padding: 5px 10px;
  font-size: 12px;
  background-color: #414fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  color: white;
  border-radius:5px;

  &:hover {
    background: black;
  }
`: styled.button`
padding: 5px 25px;
font-size: 16px;
background-color: #414fff;
border: none;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
column-gap: 5px;
color: white;

&:hover {
  background: black;
}
`;
const Leaderboard = () => {
  const poolContract = usePoolContract();
  const routerContract = useRouterContract();

  const [tokenData, setTokendata] = useState([]);
  const [sort, setSort] = useState(true);

  const SortByMarketCap = () => {
    setSort(!sort);
  };

  const list = useMemo(() => {
    if (sort) {
      return tokenData.sort((a, b) => {
        return new BigNumber(b.marketCap)
          .minus(new BigNumber(a.marketCap))
          .toNumber();
      });
    } else {
      return tokenData.sort((a, b) => {
        return new BigNumber(a.marketCap)
          .minus(new BigNumber(b.marketCap))
          .toNumber();
      });
    }
  }, [tokenData, sort]);

  const fetchMetadata = async (cid) => {
    try {
      const res = await fetch(
        `https://rose-famous-ferret-62.mypinata.cloud/ipfs/${cid}`
      );
      const posts = await res.json();
      return posts;
    } catch (error) {
      return false;
    }
  };

  const FetchAllPairs = async () => {
    const pairData = await poolContract.methods.getAllToken().call();
    const allMetadata = [];

    for (const token of pairData) {
      const metaData = await fetchMetadata(token.uri);
      const outAmount = await routerContract.methods
        .getAmountOut(
          new BigNumber(1).times(10 ** 18).toString(),
          token.instance,
          Contracts.WS
        )
        .call();

      allMetadata.push({
        name: token.name,
        symbol: token.symbol,
        maxSupply: new BigNumber(token.maxSupply).div(10 ** 18).toString(),
        instance: token.instance,
        img: metaData ? metaData.img : "",
        twitter: metaData ? metaData.twitterLink : "",
        website: metaData ? metaData.websiteLink : "",
        marketCap: new BigNumber(outAmount?.amount)
          .div(10 ** 18)
          .times(1000000000)
          .toString(),
        price: new BigNumber(outAmount?.amount)
          .div(10 ** 18) // Divide by 10^18
          .toFixed(18),
      }); // Collect metadata
    }
    console.log(allMetadata);
    setTokendata(allMetadata);
  };

  const [ftmprice, setFTMPrice] = useState(0);

  async function getFTMPrice() {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd"
    );
    const data = await response.json();
    const Price = data.fantom.usd; // Price in USD
    setFTMPrice(Price);
  }

  useEffect(() => {
    getFTMPrice();
  }, []);

  useEffect(() => {
    FetchAllPairs();
  }, []);

  return (
    <>
      <LeaderboardContainer>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {
            isMobile ?
              <h3 className="h1-leader">
                <FaTrophy /> Leaderboard
              </h3> :
              <h1 className="h1-leader">
                <FaTrophy /> Leaderboard
              </h1>
          }
          <CreateButton
            onClick={() => {
              SortByMarketCap();
            }}
          >
            {sort ? "Low to High" : "High to Low"}
          </CreateButton>
        </div>
        <div style={{ height: "70vh", overflowY: "overlay", marginTop: isMobile ? '10px' : '30px' }}>
          {list.length > 0 ? (
            <TokenTable>
              <thead>
                <tr>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader style={{ minWidth: '180px' }}>Image & Name</TableHeader>
                  <TableHeader>Symbol</TableHeader>
                  <TableHeader>Supply</TableHeader>
                  <TableHeader>Market Cap</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Links</TableHeader> {/* New column for links */}
                </tr>
              </thead>
              <tbody>
                {list.map((token, index) => (
                  <TableList
                    key={index}
                    index={index}
                    token={token}
                    ftmprice={ftmprice}
                  />
                ))}
              </tbody>
            </TokenTable>
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </LeaderboardContainer>
    </>
  );
};

const TableList = (props) => {
  const { token, index, ftmprice } = props;

  return (
    <TableRow>
      <TableData>{index + 1}</TableData>
      <TableData>
        <CoinImage
          src={
            token.img === ""
              ? "meme.png"
              : `https://rose-famous-ferret-62.mypinata.cloud/ipfs/${token.img}`
          }
          alt={`${token.name} logo`}
        />
        {token.name}
      </TableData>
      <TableData>{token.symbol}</TableData>
      <TableData>
        {token.maxSupply.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </TableData>
      <TableData>{token.marketCap * ftmprice} $</TableData>
      <TableData>
        {new BigNumber(Number(token.price) * ftmprice).toFixed(18)} $
      </TableData>
      <TableData>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {token.twitter === "" ? (
            ""
          ) : (
            <IconLink
              href={token.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </IconLink>
          )}

          {token.website === "" ? (
            ""
          ) : (
            <IconLink
              href={token.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe />
            </IconLink>
          )}
        </div>
      </TableData>
    </TableRow>
  );
};

export default Leaderboard;
