import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { getData } from "../../../../assets/corpServices";
import { BASE_URL } from "../../../../../assets/constants";

const SearchDocByName = (props) => {
  const [dName, setDName] = useState("");
  const getDoctorDataByName = async (e) => {
    e.preventDefault();
    if (dName) {
      const user = await getData(BASE_URL + "doctor/search?name=" + dName);

      if (user.error) {
      } else {
        const data = await user.data;
        props.getSearchData(data);
        console.log({ "user.data": user.data });
      }
    } else {
      props.getSearchData([]);
    }
  };
  return (
    <Box>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <form onSubmit={getDoctorDataByName}>
            <Stack direction={"row"}>
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Search by doctor name..."
                id="fullWidth2"
                value={dName}
                onChange={(e) => setDName(e.target.value)}
              />
              <Button variant="contained" type="submit">
                Search
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SearchDocByName;
