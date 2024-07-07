import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const PackageAutocomplete = ({
  formValues,
  setFormValues,
  listOfPackage = [],
}) => {
  const [value, setValue] = useState(
    listOfPackage.find((a) => a.label === formValues?.packageName) || null
  );
  //const [inputValue, setInputValue] = useState("");

  console.log({ value });

  useEffect(() => {
    setValue(
      listOfPackage.find((a) => a.label === formValues?.packageName) || null
    );
  }, [formValues]);

  return (
    <Box>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Autocomplete
            size="small"
            fullWidth
            disablePortal
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setFormValues({
                ...formValues,
                packageName: newValue?.label || "",
              });
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={listOfPackage}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Package*"
                sx={{
                  "& fieldset": {
                    fontSize: 11,
                    height: 41,
                    borderRadius: 3,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 11,
                    color: "#404040",
                  },
                }}
              />
            )}
            sx={{
              "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
                fontSize: 11,
                fontWeight: 600,
                color: "#000",
              },
            }}
            ListboxProps={{
              sx: { fontSize: 11, fontWeight: 600 },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PackageAutocomplete;
