import { Box, Button, Container, Grid, Typography } from "@mui/material";
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
            <Typography>{book.title}</Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ShowBook;
