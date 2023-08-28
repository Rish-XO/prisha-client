import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { NavLink, useParams } from "react-router-dom";
import React, { useState } from "react";
import { trpc } from "../lib/trpc";
import { pdfjs, Document, Page } from "react-pdf";
import CloseIcon from "@mui/icons-material/Close";
import "./ShowBook.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ShowBook() {
  const [viewPdf, setViewPdf] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const openPdf = () => {
    setViewPdf(true);
  };

  const closePdf = () => {
    setViewPdf(false);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const { id } = useParams();
  console.log(id, "id from params");

  const book: any = trpc.getABook.useQuery({ id: id ?? "" }).data;

  console.log(book, "data from trpc");

  return (
    <Container sx={{ marginTop: "40px" }}>
      {/* rendering the pdf */}

      {book && (
        <Dialog open={viewPdf} onClose={closePdf} maxWidth="md" fullWidth>
          <IconButton
            aria-label="close"
            onClick={closePdf}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
          <Box sx={{ marginTop: "20px", textAlign: "center" }}>
              <Button onClick={goToPreviousPage}>Previous Page</Button>{" "}
              <span>
                Page {pageNumber} of {numPages}
              </span>{" "}
              <Button onClick={goToNextPage}>Next Page</Button>
            </Box>
            <Document file={book.pdf} onLoadSuccess={onDocumentLoadSuccess} >
              <Page pageNumber={pageNumber} className="pdf"/>
            </Document>
            
          </DialogContent>
        </Dialog>
      )}

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
            <Typography
              variant="h6"
              fontWeight={500}
              sx={{ marginTop: "10px" }}
            >
              {book.description}
            </Typography>
            <Box sx={{ marginTop: "40px" }}>
              <Rating></Rating>
            </Box>
            <Box sx={{ marginTop: "40px" }}>
              <Button variant="contained" onClick={openPdf}>
                Read this Book
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ShowBook;
