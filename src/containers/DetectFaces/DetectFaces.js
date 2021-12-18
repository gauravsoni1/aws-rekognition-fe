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
  CircularProgress,
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

const DetectFaces = () => {
  const imageContainerClass = imageContainerStyles();

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageName, setSelectedImageName] = useState("");
  const [imageAttribute, setImageAttribute] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const findEmotion = (emotions) => {
    let emotion = null;
    for (let i = 0; i < emotions.length; i++) {
      if (emotion === null) {
        emotion = emotions[i];
      }
      if (emotions[i].Confidence > emotion.Confidence) {
        emotion = emotions[i];
      }
    }
    return emotion.Type;
  };

  const generateImageAttributes = (rawData) => {
    let faceDetails = rawData.FaceDetails[0];
    let tempRenderArray = [];
    tempRenderArray.push({
      attribute: "Age Range",
      value: `Between ${faceDetails.AgeRange.Low} and ${faceDetails.AgeRange.High}`,
    });
    tempRenderArray.push({
      attribute: "Gender",
      value: faceDetails.Gender.Value,
    });
    tempRenderArray.push({
      attribute: "Beard",
      value: faceDetails.Beard.Value ? "Yes" : "No",
    });
    tempRenderArray.push({
      attribute: "Eye Glasses",
      value: faceDetails.Eyeglasses.Value ? "Yes" : "No",
    });
    tempRenderArray.push({
      attribute: "Smile",
      value: faceDetails.Smile.Value ? "Yes" : "No",
    });
    tempRenderArray.push({
      attribute: "Emotion",
      value: findEmotion(faceDetails.Emotions),
    });
    setImageAttribute(tempRenderArray);
  };

  async function getFaceDetails(imageName) {
    let result = {};
    try {
      result = (
        await axios.post("http://localhost:5000/face/detect", {
          file: imageName,
        })
      ).data;
      generateImageAttributes(result);
    } catch (error) {
      console.log("Error getting the face details", error);
    }
  }

  const imageSelected = (row) => {
    console.log("Something", row);
    const awsImageURL = `https://python-project-gaurav.s3.amazonaws.com/${row.name}`;
    setSelectedImage(awsImageURL);
    setSelectedImageName(row.name);
    getFaceDetails(row.name);
  };

  const indexFile = async () => {
    setIsUploading(true);
    await axios.post("http://localhost:5000/indexface", {
      fileName: selectedImageName,
    });
    setIsUploading(false);
  };

  return (
    <Container maxWidth="100%">
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Detect Face</Typography>
        {isUploading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="secondary" onClick={indexFile}>
            Index File
          </Button>
        )}
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
              <Typography variant="caption">Please select an image</Typography>
            )}
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Images table">
              <TableHead style={{ backgroundColor: "lightgray" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Attributes
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Values
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {imageAttribute.map((row) => (
                  <TableRow
                    key={row.attribute}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.attribute}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box display="flex" justifyContent="center" ml={5}>
          <ImageListTable rowSelected={imageSelected}></ImageListTable>
        </Box>
      </Box>
    </Container>
  );
};

export default DetectFaces;
