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
import AddIcon from "@mui/icons-material/Add";
import { NavLink, useNavigate } from "react-router-dom";
import { trpc } from "../lib/trpc";

// const dummy = [
//   "balls",
//   "balls",
//   "balls",
//   "balls",
//   "balls",
//   "balls",
//   "balls",
//   "balls",
//   "balls",
//   "balls",
// ];

function BookCard() {
  const booksQueryResponse = trpc.getAllBooks.useQuery();
  const data = booksQueryResponse.data?.rows;
  console.log(data);

  const navigate= useNavigate()

  return (
    <Grid container spacing={2}>

      {data ?
      data.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={item.book_id}>
          <Card sx={{ maxWidth: 180 }}>
            <CardActionArea onClick={() => navigate(`/${item.book_id}`)}>
              <CardMedia
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  objectFit: "contain",
                }}
                component="img"
                height="180"
                image={item.image}
              />
            </CardActionArea>
          </Card>
          <Box>
            <Typography>{item.title}</Typography>
            <Typography variant="subtitle2">{item.author}</Typography>
          </Box>
        </Grid>
      )) : <p>Loading</p>}
      <NavLink to="/new">
        <div className="add-book">
          <AddIcon />
          <Typography sx={{ textDecoration: "underline", color: "darkblue" }}>
            Add a book
          </Typography>
        </div>
      </NavLink>
    </Grid>
  );
}

export default BookCard;
