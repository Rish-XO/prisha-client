import { Box, Container, Typography } from "@mui/material";
import React from "react";
import BookIcon from "@mui/icons-material/Book";
import BookCard from "../components/BookCard";

function Home() {
  return (
    <Container>
      <Box sx={{ marginTop: "55px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <BookIcon fontSize="large" sx={{ color: "darkblue" }} />
          <Typography variant="h4" fontWeight={600} sx={{ color: "darkblue" }}>
            My Books
          </Typography>
        </div>
        <Box sx={{ marginTop: "55px" }}>
          <BookCard />
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
