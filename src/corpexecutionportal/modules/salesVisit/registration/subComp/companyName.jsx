import React, { Fragment, useEffect, useState } from "react";
import { fetchAllCorps } from "../../../../services/salesVisitServices";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";
import { useSnackbar } from "notistack";
import { Box, CircularProgress } from "@mui/material";
import { capitalizeEachWord } from "../../../../../assets/utils";

const CompanyName = ({ formValues, setFormValues }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedValue, setSelectedValue] = useState(null);
  const [corpDatalist, setCorpDataList] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    fetchAllCorps(setCorpDataList, setIsLoading);
  }, []);

  const handleInputChange = (event, newInputValue, reason) => {
    if (reason === "input") {
      const existingCorp = corpDatalist.find(
        (corp) =>
          corp.corpName?.replace(/\s/g, "").toLowerCase() ===
          newInputValue.replace(/\s/g, "").toLowerCase()
      );
      if (existingCorp) {
        enqueueSnackbar("Corp is Already Registered", { variant: "error" });
        setFormValues({ ...formValues, corpName: "" });
      } else {
        setFormValues({
          ...formValues,
          corpName: capitalizeEachWord(newInputValue),
        });
      }
    }
  };

  const handleSelectChange = (event, newValue, reason) => {
    if (reason === "selectOption") {
      enqueueSnackbar("Corp is Already Registered", { variant: "error" });
      setFormValues({ ...formValues, corpName: "" });
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fragment>
      <CustomAutocomplete
        freeSolo={true}
        disableClearable={true}
        label={"Company Name"}
        placeholder={"Company Name"}
        options={corpDatalist.filter(
          (corp, index, self) =>
            corp.corpSalesId !== null &&
            corp.corpSalesId !== "" &&
            corp.corpName !== null &&
            corp.corpName !== "" &&
            self.findIndex(
              (c) =>
                c?.corpSalesId === corp?.corpSalesId ||
                c?.corpName === corp?.corpName
            ) === index
        )}
        required={true}
        asterickColor={"red"}
        value={selectedValue}
        getOptionLabel={(option) => option.corpName}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
      />
    </Fragment>
  );
};

export default CompanyName;
