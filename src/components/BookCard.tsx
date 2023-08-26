import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import "./BookCard.css";
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";

const dummy = [
  "balls",
  "balls",
  "balls",
  "balls",
  "balls",
  "balls",
  "balls",
  "balls",
  "balls",
  "balls",
];

function BookCard() {
  return (
    <Grid container spacing={2}>
      {/* there will the mapping and need to put key in grid item */}
      {dummy.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Card sx={{ maxWidth: 180 }}>
            <CardActionArea>
              <CardMedia
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  objectFit: "contain",
                }}
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1584448141569-69f342da535c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2541&q=80"
              />
            </CardActionArea>
          </Card>
          <Box>
            <Typography>Fifty shades of balls</Typography>
            <Typography variant="subtitle2">{item}</Typography>
          </Box>
        </Grid>
      ))}
      <NavLink to="/new">

      <div  className="add-book">
        <AddIcon />
        <Typography sx={{textDecoration: 'underline' , color: "darkblue"}}>Add a book</Typography>
      </div>
      </NavLink>
    </Grid>
  );
}

export default BookCard;
