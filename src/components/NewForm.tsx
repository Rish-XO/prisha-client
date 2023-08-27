import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { NavLink, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import BackupIcon from "@mui/icons-material/Backup";
import "./NewForm.css";
import axios from "axios";
import { trpc } from "../lib/trpc";

function NewForm() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [pdfNamePreview, setPdfNamePreview] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const navigate = useNavigate();

  //create book trp method
  const createBook = trpc.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (image && pdf) {
      const imgData = new FormData();
      imgData.append("image", image);

      const pdfData = new FormData();
      pdfData.append("file", pdf);
      try {
        const imageResponse = await axios.post(
          "http://localhost:5000/upload-image",
          imgData
        );
        const imgName = await imageResponse.data;
        console.log("Image uploaded:", imgName);

        const pdfResponse = await axios.post(
          "http://localhost:5000/upload-pdf",
          pdfData
        );
        const pdfName = await pdfResponse.data;
        console.log("pdf uploaded:", pdfName);

        // sending all data to backend to db
        const bookData = {
          title: title,
          author: author,
          time: time,
          description: description,
          image: imgName,
          pdf: pdfName,
        };

        console.log("book data before trpc", bookData);

        const query = createBook.mutate(bookData, {
          onSuccess(data: any, variables, context) {
            console.log(typeof data, "data after mutation");
            navigate(`/${data.id}`);
          },
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  // end of submit

  const imageUploadHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // console.log(file, "reareaerare");
      setImage(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const imagePreviewURL = e.target?.result as string;
        // console.log("Preview URL:", imagePreviewURL);
        setImagePreview(imagePreviewURL);
      };

      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  const pdfUploadHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file);
      setPdf(file);
      setPdfNamePreview(file.name);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <Container sx={{ marginTop: "40px" }}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-preview"
                  />
                )}
                <label htmlFor="bookCoverInput">
                  <input
                    type="file"
                    id="bookCoverInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={imageUploadHandle}
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
              sx={{ marginBottom: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div style={{ display: "flex", marginBottom: "18px" }}>
              <TextField
                fullWidth
                label="Author"
                placeholder="Enter author name"
                style={{ marginRight: "16px" }}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <TextField
                fullWidth
                label="Book read time"
                placeholder="Add time in mins"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <TextField
              fullWidth
              label="Description"
              placeholder="Enter book description"
              multiline
              rows={4}
              margin="normal"
              sx={{ marginBottom: 2 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* pdf input */}
            <div className="pdf-input">
              {pdfNamePreview && <Typography>{pdfNamePreview}</Typography>}
              <label htmlFor="pdfInput">
                <input
                  type="file"
                  id="pdfInput"
                  accept=".pdf" // Allow only PDF files
                  style={{ display: "none" }} // Hide the input visually
                  onChange={pdfUploadHandle}
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
            <Button
              sx={{ marginTop: "30px", marginLeft: "20px" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default NewForm;
