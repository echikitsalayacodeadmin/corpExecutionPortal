import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { getData } from "../../../../assets/corpServices";
import { BASE_URL } from "../../../../../assets/constants";

const SearchDocByPhone = (props) => {
  const [dMobileNo, setDMobileNo] = useState("");
  const getDoctorDataByMobileNo = async (e) => {
    e.preventDefault();
    if (dMobileNo) {
      const user = await getData(
        BASE_URL + "doctor/search?phoneNo=" + dMobileNo
      );

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
          <form onSubmit={getDoctorDataByMobileNo}>
            <Stack direction={"row"}>
              <TextField
                size="small"
                fullWidth
                label="Search by mobile number..."
                id="fullWidth3"
                value={dMobileNo}
                onChange={(e) => setDMobileNo(e.target.value)}
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
export default SearchDocByPhone;
