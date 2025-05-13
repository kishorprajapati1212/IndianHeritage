"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import VideocamIcon from "@mui/icons-material/Videocam";
import CampaignIcon from "@mui/icons-material/Campaign";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const user = localStorage.getItem("Cultrual");
      setIsLoggedIn(!!user);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("Cultrual");
    setIsLoggedIn(false);
    router.push("/");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: "black", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" passHref legacyBehavior>
            <a style={{ textDecoration: "none", color: "inherit" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                Indian Heritage
              </Typography>
            </a>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isLoggedIn ? (
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{ color: "#fff", borderColor: "#fff", "&:hover": { backgroundColor: "#222" } }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" passHref legacyBehavior>
                  <Button
                    sx={{ backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#333" } }}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/login/signin" passHref legacyBehavior>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#333" } }}
                  >
                    Signup
                  </Button>
                </Link>
              </>
            )}

            <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
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
            { text: "home", icon: <HomeIcon />, link: "/" },
            { text: "about", icon: <InfoIcon />, link: "/about" },
            { text: "Map", icon: <LocationOnIcon />, link: "/feacture/maps" },
            { text: "Watch_short", icon: <LiveTvIcon />, link: "/feacture/see_short" },
            { text: "livestream", icon: <VideocamIcon />, link: "/feacture/live_stream" },
          ].map((item, index) => (
            <Link href={item.link} passHref legacyBehavior key={index}>
              <a style={{ textDecoration: "none" }} onClick={toggleDrawer}>
                <ListItem
                  button
                  sx={{
                    backgroundColor: "transparent",
                    "& .MuiListItemText-primary": {
                      color: "white",
                      textTransform: "capitalize",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
