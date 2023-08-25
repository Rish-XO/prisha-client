import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

function Navbar() {
  return (
    <div>
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h6"
            className="title-left"
          >
            Prisha Policy
          </Typography>
          <div className="centerLinks">
            <Link to="#" className="link">
              Home
            </Link>
            <Link to="#" className="link">
              Favorites
            </Link>
          </div>
          <IconButton className="icon" aria-label="person">
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
