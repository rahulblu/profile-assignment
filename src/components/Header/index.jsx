import React from "react";
import {
  AppBar,
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppHeader } from "../../styles/styledComponents";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppHeader position="static" color="header">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <b>V</b>iral Nation
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => darkMode && toggleDarkMode()}
        >
          <LightModeIcon />
        </IconButton>
        <Switch checked={darkMode} onChange={toggleDarkMode} color="default"/>

        <IconButton
          color="inherit"
          onClick={() => !darkMode && toggleDarkMode()}
        >
          <DarkModeIcon />
        </IconButton>
      </Toolbar>
    </AppHeader>
  );
};

export default Header;
