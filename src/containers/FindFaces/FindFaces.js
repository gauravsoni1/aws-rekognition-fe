import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ImageListTable from "../../components/ImageListTable/ImageListTable";
import axios from "axios";

const imageContainerStyles = makeStyles({
  root: {
    "& img": {
      height: "300px",
      marginBottom: "50px",
    },
  },
});

const FindFaces = () => {
  const imageContainerClass = imageContainerStyles();
  const [foundImages, setFoundImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageName, setSelectedImageName] = useState("");

  const imageSelected = (row) => {
    console.log("Something", row);
    const awsImageURL = `https://python-project-gaurav.s3.amazonaws.com/${row.name}`;
    setSelectedImage(awsImageURL);
    setSelectedImageName(row.name);
  };

  const findFace = async () => {
    const { data } = await axios.post("http://localhost:5000/findface", {
      fileName: selectedImageName,
    });
    let matchedFacesS3ID = [];
    const matchedFaces = data.FaceMatches;
    for (let i = 0; i < matchedFaces.length; i++) {
      if (matchedFaces[i]["Face"]["ExternalImageId"]) {
        matchedFacesS3ID.push(matchedFaces[i]["Face"]["ExternalImageId"]);
      }
    }
    setFoundImages(matchedFacesS3ID);
  };

  const renderPhotoGrid = () => {
    let imageGrid = [];
    imageGrid = foundImages.map((imgUrl) => {
      return (
        <img
          style={{ maxWidth: "200px" }}
          src={`https://python-project-gaurav.s3.amazonaws.com/${imgUrl}`}
          alt="img"
        ></img>
      );
    });
    return imageGrid;
  };

  return (
    <Container maxWidth="100%">
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Find Face</Typography>
        <Button variant="contained" color="secondary" onClick={findFace}>
          Find Faces
        </Button>
      </Box>
      <Box display="flex">
        <Box flexBasis="30%">
          <Box
            className={imageContainerClass.root}
            display="flex"
            justifyContent="center"
          >
            {selectedImage ? (
              <img src={selectedImage} alt="img"></img>
            ) : (
              <Typography variant="caption">Please select a image</Typography>
            )}
          </Box>
          <Box>
            <Typography variant="h6">Found images</Typography>
            <Box>{renderPhotoGrid()}</Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" ml={5}>
          <ImageListTable rowSelected={imageSelected}></ImageListTable>
        </Box>
      </Box>
    </Container>
  );
};

export default FindFaces;
