import React from "react";
import {
  Container,
  Typography,
  Box,  
} from "@mui/material";

const MatchFaces = () => {
  return (
    <Container maxWidth="100%">      
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Detect Face</Typography>        
      </Box>
      <Box>
        Left Container 
      </Box>
      <Box>
        Right Container 
      </Box>
    </Container>
  );
};

export default MatchFaces;
