import React, { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

const SearchBarCompany = ({
  setSelectedValue,
  setTokenList,
  tokenList,
  setTokenListStatic,
  tokenListStatic,
}) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (value) {
      if (isNaN(value)) {
        const filterList = tokenListStatic.filter((val) =>
          val?.corpName?.toLowerCase().includes(value?.toLowerCase())
        );
        setTokenList(filterList);
      } else {
        setTokenList(
          tokenListStatic?.filter((item) =>
            item?.mobileNo !== null ? item?.mobileNo?.startsWith(value) : false
          )
        );
      }
    } else {
      setTokenList(tokenListStatic);
    }
  }, [value]);

  return (
    <Fragment>
      <Grid container marginY={1}>
        <Grid item xs={12} lg={12}>
          <TextField
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            sx={{
              background: "#fff",
              color: "#000000",
              fontWeight: "300",
              fontSize: "13px",
              lineHeight: " 15px",
              "& input::placeholder": {
                color: "#777777",
                fontWeight: "300",
                fontSize: "13px",
                lineHeight: " 15px",
              },
              border: "0.5px solid rgba(0, 0, 0, 0.15)",
              borderRadius: "15px",
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SearchBarCompany;
