import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import search from "../../../../assets/images/doctorRegistration/search.png";
import { useState } from "react";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Grid
      container
      display="flex"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            border: "0.5px solid #D4D4D4",
            borderRadius: "15px",
            "& .MuiFormControl-root": {
              display: "flex",
              justifyContent: "center",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputLabel-outlined": {
              color: "#127DDD66",
              padding: 0.5,
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              px: 1,
            },
          }}
        >
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              background: "#FFFFFF",
              height: "45px",
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="img" src={search} width={22} height={22} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{
              padding: "12px 24px",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "19px",
                color: "#FFFFFF",
              }}
            >
              Search
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
