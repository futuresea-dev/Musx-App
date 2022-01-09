import * as React from "react";
import "./active.css";
import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  makeStyles,
  Button,
  Avatar,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";

import Bell from "../assets/img/bell.svg";

import TextIcon from "../assets/img/TextIcon.svg";

import AvatarPic from "../assets/img/avatar.png";

const useStyles = makeStyles((theme) => ({
  HoldNav: {
    paddingLeft: "305px",
    "& .MuiAppBar-root": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
    },
  },

  LinkText: {
    marginRight: "100px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "10px",
    },
    "& a": {
      textDecoration: "none",
      fontSize: theme.typography.pxToRem(16),
      color: "#fff",
      fontWeight: "normal",
      fontFamily: `'Poppins', sans-serif`,
      [theme.breakpoints.down("md")]: {
        fontSize: theme.typography.pxToRem(14),
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  },

  Avatar: {
    border: "2px solid #FFCA62",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      style={{ padding: 0 }}
    >
      <MenuItem
        style={{
          paddingRight: 0,
          paddingLeft: 0,
        }}
      >
        {/* <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 0,
            paddingLeft: 0,
          }}
        > */}
        <Button
          style={{
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <img src={Bell} alt="Bell Icon" />
        </Button>
      </MenuItem>
      <MenuItem
        style={{
          paddingRight: 0,
          paddingLeft: 0,
        }}
      >
        <Button
          style={{
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <img src={TextIcon} alt="text icon" />
        </Button>
      </MenuItem>
      <MenuItem
        style={{
          paddingRight: 0,
          paddingLeft: 0,
        }}
      >
        <Badge
          style={{
            paddingRight: 0,
            paddingLeft: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className={classes.Avatar}
        >
          <img
            src={AvatarPic}
            style={{
              width: "30px",
              height: "30px",
            }}
            alt="profil icon"
          />
        </Badge>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.HoldNav}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            component="div"
            className={classes.LinkText}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <NavLink to="/home-4/home-tabs" activeClassName="selected">
              HOME
            </NavLink>
          </Typography>

          <Typography
            component="div"
            className={classes.LinkText}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <NavLink to="/home-4/support" activeClassName="selected">
              SUPPORT
            </NavLink>
          </Typography>

          <Typography
            component="div"
            className={classes.LinkText}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <NavLink to="/home-4/download" activeClassName="selected">
              DOWNLOAD
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge>
                <img src={Bell} alt="Bell Icon" />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <img src={TextIcon} alt="text icon" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <svg
                width="20"
                height="20"
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                data-testid="MoreVertIcon"
              >
                <path
                  fill="#fff"
                  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                ></path>
              </svg>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
