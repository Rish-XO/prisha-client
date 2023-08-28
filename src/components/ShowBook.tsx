import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { NavLink, useParams } from "react-router-dom";
import React from "react";
import { trpc } from "../lib/trpc";

// interface Book {
//   author: string;
//   book_id: string;
//   description: string;
//   image: string;
//   pdf: string;
//   time: string;
//   title: string;
// }

function ShowBook() {
  const { id } = useParams();
  console.log(id, "id from params");

  const book: any = trpc.getABook.useQuery({ id: id ?? "" }).data;

  console.log(book, "data from trpc");

  return (
    <Container sx={{ marginTop: "40px" }}>
      {book && (
        <Grid container>
          <Grid item xs={12} md={5}>
            <NavLink to="/">
              <Button variant="outlined" sx={{ marginBottom: "20px" }}>
                <KeyboardArrowLeftIcon />
                Back to Home
              </Button>
            </NavLink>
            <Box width="25%">
              <img
                src={book.image}
                alt=""
                style={{
                  maxWidth: "600px",
                  height: "500px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "darkblue", marginTop: "50px" }}
            >
              {book.title}
            </Typography>
            <Typography sx={{ marginTop: "10px" }} variant="subtitle2">
              {book.author}
            </Typography>
            <Typography sx={{ marginTop: "10px" }} variant="subtitle2">
              Book read time: {book.time} mins
            </Typography>
            <Typography variant="h6" fontWeight={500} sx={{ marginTop: "10px" }}>
              {book.description} 
            </Typography>
            <Box sx={{marginTop: "40px"}}>
              <Rating></Rating>
            </Box>
            <Box sx={{marginTop: "40px"}}>
              <Button variant="contained">Read this Book</Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ShowBook;
