import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import BackupIcon from "@mui/icons-material/Backup";
import "./NewForm.css";

function NewForm() {
  return (
    <Container sx={{ marginTop: "40px" }}>
      <Grid container>
        <Grid item xs={12} md={5}>
          <NavLink to="/">
            <Button
              variant="outlined"
              sx={{ marginBottom: "20px", marginLeft: "10px" }}
            >
              <KeyboardArrowLeftIcon />
              Back to Home
            </Button>
          </NavLink>
          <Box width="25%">
            <div className="add-photo">
              <label htmlFor="bookCoverInput">
                <input
                  type="file"
                  id="bookCoverInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    // Handle file selection here
                    //   const selectedFile = e.target.files[0];
                    //   console.log("Selected file:", selectedFile);
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <AddIcon />
                  <Typography
                    sx={{ textDecoration: "underline", color: "darkblue" }}
                  >
                    Add a book Cover
                  </Typography>
                </div>
              </label>
            </div>
          </Box>
        </Grid>

        {/* inputs sections */}
        <Grid item xs={12} md={7} sx={{ marginTop: "50px" }}>
          <TextField
            fullWidth
            label="Book Title"
            placeholder="Enter book title"
            margin="normal"
            sx={{ marginBottom: 5 }}
          />
          <div style={{ display: "flex", marginBottom: "18px" }}>
            <TextField
              fullWidth
              label="Author"
              placeholder="Enter author name"
              style={{ marginRight: "16px" }}
            />
            <TextField
              fullWidth
              label="Book read time"
              placeholder="Add time in mins"
            />
          </div>
          <TextField
            fullWidth
            label="Description"
            placeholder="Enter book description"
            multiline
            rows={4}
            margin="normal"
            sx={{ marginBottom: 5 }}
          />

          {/* pdf input */}
          <div className="pdf-input">
            <label htmlFor="pdfInput">
              <input
                type="file"
                id="pdfInput"
                accept=".pdf" // Allow only PDF files
                style={{ display: "none" }} // Hide the input visually
                onChange={(e) => {
                  // Handle PDF file selection here
                  //   const selectedPDF = e.target.files[0];
                  //   console.log("Selected PDF:", selectedPDF);
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <BackupIcon sx={{ color: "darkblue" }} />
                <Typography
                  sx={{
                    textDecoration: "underline",
                    color: "darkblue",
                    cursor: "pointer",
                  }}
                >
                  Add a PDF File
                </Typography>
              </div>
            </label>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewForm;
