import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography, 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Language from "./Navbar/Language";
import { useLanguage } from "../../Language"; // Import the global language context
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import VideocamIcon from '@mui/icons-material/Videocam';
import CampaignIcon from '@mui/icons-material/Campaign';

const Navbar = () => {
  const { translate } = useLanguage(); // Access the global translate function
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Cultrual");
    const oneuser = JSON.parse(userFromLocalStorage);
    setUser(oneuser);
    setIsLoggedIn(!!userFromLocalStorage);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("Cultrual");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: "black", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ fontWeight: "bold", fontSize: "25px", textDecoration: "none", color: "inherit" }}
          >
            Indian Heritage
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {/* <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                paddingLeft: "8px",
                width: "100%",
                maxWidth: "300px",
                marginLeft:"100px"
              }}
            /> */}
            <IconButton sx={{ padding: "10px" }} >
              {/* <SearchIcon /> */}
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", marginTop: "4px", alignItems: "center", gap: 2 }}>
            <Language />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isLoggedIn ? (
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{ color: "#fff", borderColor: "#000", "&:hover": { backgroundColor: "#f1f1f1" } }}
              >
                {translate("logout")}
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ backgroundColor: "#000", marginLeft: "25px", color: "#fff", "&:hover": { backgroundColor: "#333" } }}
                >
                  {translate("login")}
                </Button>
                <Button
                  component={Link}
                  to="/sigin_home"
                  variant="contained"
                  sx={{ backgroundColor: "#000", marginRight: "4px", color: "#fff", "&:hover": { backgroundColor: "#333" } }}
                >
                  {translate("signup")}
                </Button>
              </>
            )}
          </Box>

          <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": { width: "240px", padding: "10px", backgroundColor: "transparent" },
        }}
      >
        <List>
          {[
            { text: translate("home"), icon: <HomeIcon />, link: "/" },
            { text: translate("about"), icon: <InfoIcon />, link: "/about" },
            // { text: translate("contact"), icon: <ContactMailIcon />, link: "/contact" },
            { text: "Map", icon: <LocationOnIcon />, link: "/map" },
            { text: "Watch_short", icon: <LiveTvIcon />, link: "/See_short" },
            { text: "Add_Short", icon: <ContactMailIcon />, link: "/Add_short", role: "Artist" },
            { text: "livestream", icon: <VideocamIcon />, link: "/livestream"},
            { text: "campian", icon: <CampaignIcon />, link: "/campian"},
          ]
          .filter(item => !item.role || user?.role === item.role)
          .map((item, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to={item.link}
              onClick={toggleDrawer}
              sx={{
                backgroundColor: "transparent",
                "& .MuiListItemText-primary": {
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
