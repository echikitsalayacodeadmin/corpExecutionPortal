import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getData } from "../../assets/reportingServices";
import { BASE_URL } from "../../../assets/constants";

const PackageAutocomplete = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
  setSelectedPackage,
}) => {
  const [listOfPackage, setListOfPackage] = useState([]);
  const fetchPackages = async () => {
    const url = BASE_URL + `org/package/${corpId}`;
    const packages = await getData(url);
    if (packages.error) {
      console.log("error");
      setListOfPackage([]);
    } else {
      let data = Object.entries(packages.data);
      setListOfPackage(
        data.map((item, index) => ({
          id: index + 1,
          label: item[0],
          value: item[1],
        }))
      );
      console.log({ success: data });
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const [value, setValue] = useState(null);

  return (
    <Box>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Autocomplete
            fullWidth
            size="small"
            value={value}
            onChange={(event, newValue, reason) => {
              setValue(newValue);
              setSelectedPackage(newValue.label);
              if (reason === "clear") {
                setValue(null);
                setSelectedPackage("");
              }
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={listOfPackage}
            renderInput={(params) => <TextField {...params} label="Package" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PackageAutocomplete;
