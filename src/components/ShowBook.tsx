import { Box, Button, Container, Grid } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { NavLink, useParams } from "react-router-dom";
import React from "react";
import { trpc } from "../lib/trpc";

function ShowBook() {
  const { id } = useParams();
  console.log(id);
  if (id) {
    const ID = { id: id };
    const getABookquery = trpc.getABook.useQuery(ID);
    const data = getABookquery.data;
    console.log(data);
  }

  return (
    <Container sx={{ marginTop: "40px" }}>
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
              src="https://images.unsplash.com/photo-1584448141569-69f342da535c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2541&q=80"
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed
          nulla architecto ex a explicabo ut, praesentium debitis dolorem
          repellendus cupiditate tenetur minima obcaecati ad omnis. Libero saepe
          illo architecto.
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShowBook;
