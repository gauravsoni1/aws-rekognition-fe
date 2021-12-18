import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import ImageListTable from "../../components/ImageListTable/ImageListTable";

const UploadImages = () => {
  const [data, setData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const inputFile = useRef(null);

  async function fetchData() {
    let results = [];
    results = (await axios.get("http://localhost:5000/images")).data;
    setData(results);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeFile = async (e) => {
    var file = e.target.files[0];

    let formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);
    const response = await axios.post(
      "http://localhost:5000/images",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    setIsUploading(false);
    fetchData();
  };

  const uploadFile = async () => {
    inputFile.current.click();
  };

  return (
    <Container maxWidth="100%">
      {console.log(data)}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Upload Images</Typography>
        <input
          type="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={onChangeFile}
        />
        {isUploading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="secondary" onClick={uploadFile}>
            UPLOAD
          </Button>
        )}
      </Box>
      <Box>
        <ImageListTable></ImageListTable>
      </Box>
    </Container>
  );
};

export default UploadImages;
