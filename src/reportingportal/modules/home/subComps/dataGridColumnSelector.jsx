import React, { useState } from "react";
import {
  FormControlLabel,
  Switch,
  Button,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  InputBase,
  Box,
} from "@mui/material";

const DataGridColumnSelector = ({ dataGridColumn, handleButtonClick }) => {
  const [selectedColumns, setSelectedColumns] = useState(dataGridColumn);
  const [searchValue, setSearchValue] = useState("");

  const handleColumnToggle = (value) => {
    setSelectedColumns((prevSelectedColumns) => {
      const updatedColumns = prevSelectedColumns.includes(value)
        ? prevSelectedColumns.filter((col) => col !== value)
        : [...prevSelectedColumns, value];

      handleButtonClick(updatedColumns); // Call handleButtonClick with the updatedColumns
      return updatedColumns; // Return the updatedColumns to update the state
    });
  };

  const handleShowAll = () => {
    setSelectedColumns(dataGridColumn?.map((column) => column.value));
  };

  const handleHideAll = () => {
    setSelectedColumns([]);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredColumns = dataGridColumn?.filter((column) =>
    column.label.toLowerCase().includes(searchValue?.toLowerCase())
  );

  return (
    <Paper
      elevation={3}
      style={{
        maxHeight: 300,
        maxWidth: "250px",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      <Box sx={{ borderBottomWidth: "2px", borderBottomColor: "#127DDD" }}>
        <InputBase
          placeholder="Find Column"
          value={searchValue}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>
      <Table>
        <TableBody>
          {filteredColumns?.map((column) => (
            <TableRow key={column.value}>
              <TableCell sx={{ paddingBlock: 0, marginBlock: "4px" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedColumns.includes(column.value)}
                      onChange={() => handleColumnToggle(column.value)}
                    />
                  }
                  label={column.label}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleHideAll}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#FFF",
                  textTransform: "capitalize",
                  padding: "5px",
                }}
              >
                HIDE ALL
              </Button>
              <Button
                variant="contained"
                onClick={handleShowAll}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#FFF",
                  textTransform: "capitalize",
                  padding: "5px",
                }}
              >
                SHOW ALL
              </Button>
            </Box>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DataGridColumnSelector;
