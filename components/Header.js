import React from "react";
import styled from "styled-components";
import { FaPlus, FaTrophy } from "react-icons/fa";
import { ConnectBtn } from "./connectButton";
import { isMobile } from "react-device-detect";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChatIcon from '@mui/icons-material/Chat';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Stack } from "@mui/material";

const HeaderContainer = isMobile ? styled.header`
display: flex;
justify-content: space-between;
padding: 10px 10px 10px 15px;
color: black;
background: white;
font-family: "Sonic", sans-serif;
z-index: 1000;
position:fixed;
width: 100%;
top:0px;
`: styled.header`
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

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem sx={{ display: 'flex', justifyContent: 'center', pb: '10px' }} disablePadding>
          <img src="splogo.png" style={{ height: '2.8rem' }} alt="Logo" />
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => setActiveTab("create")}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary='Create' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setActiveTab("leaderboard")}>
            <ListItemIcon>
              <LeaderboardIcon />
            </ListItemIcon>
            <ListItemText primary='Leaderboard' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setActiveTab("presale")}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary='Presale' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setActiveTab("chat")}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary='AI Chat' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSupportClick}>
            <ListItemIcon>
              <SupportAgentIcon />
            </ListItemIcon>
            <ListItemText primary='Support' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <HeaderContainer>
      {
        isMobile ?
          <>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
            <Stack flexDirection='row'>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
                sx={[
                  open && { display: 'none' },
                ]}
              >
                <MenuIcon />
              </IconButton>
              <img src="splogo.png" style={{ height: '2.8rem' }} alt="Logo" />
            </Stack>
            <div className="side">
              <ConnectBtn />
            </div></> : <>
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
          </>
      }

    </HeaderContainer>
  );
};

export default Header;
