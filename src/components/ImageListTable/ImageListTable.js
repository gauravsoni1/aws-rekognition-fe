import React, { useEffect, useState } from "react";
import {  
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";

const ImageListTable = (props) => {
  const [data, setData] = useState([]);

  async function fetchData() {
    let results = [];
    results = (await axios.get("http://localhost:5000/images")).data;
    setData(results);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const imageSelected = (e,row) =>{
    if (typeof(props.rowSelected) == 'function'){
      props.rowSelected(row)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Images table">
        <TableHead style={{ backgroundColor: "lightgray" }}>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>
              Images on AWS S3
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Size In KB
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={(e) => imageSelected(e, row)}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.size / 1000}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ImageListTable;
