import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  CloudUploadOutlined,
  Mood,
  PeopleAlt,
  Masks,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Outlet, Link } from "react-router-dom";

const mainContainerStyle = makeStyles({
  root: {
    marginLeft: "200px",
    padding: 15,
  },
});

const linkStyle = makeStyles({
  root: {
    textDecoration: "none",
    color: "#4e4a4a",
  },
});

const Main = () => {
  const mainContainerClasses = mainContainerStyle();
  const LinkClasses = linkStyle();
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="div">
              AWS Rekognition
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer variant="permanent" anchor="left">
        <Toolbar />
        <Divider />
        <List>
          <Link to="/" className={LinkClasses.root}>
            <ListItem button>
              <ListItemIcon>
                <CloudUploadOutlined />
              </ListItemIcon>
              <ListItemText primary="Upload Images" />
            </ListItem>
          </Link>
          <Link to="/detectfaces" className={LinkClasses.root}>
            <ListItem button>
              <ListItemIcon>
                <Mood />
              </ListItemIcon>
              <ListItemText primary="Detect Faces" />
            </ListItem>
          </Link>
          <Link to="/matchfaces" className={LinkClasses.root}>
            <ListItem button>
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Match Faces" />
            </ListItem>
          </Link>
          <Link to="/ppedetection" className={LinkClasses.root}>
            <ListItem button>
              <ListItemIcon>
                <Masks />
              </ListItemIcon>
              <ListItemText primary="PPE Detection" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box className={mainContainerClasses.root}>
        <Outlet />
      </Box>
    </>
  );
};

export default Main;
