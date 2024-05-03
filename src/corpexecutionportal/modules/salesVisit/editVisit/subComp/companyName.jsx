import React, { Fragment, useEffect, useState } from "react";
import { fetchAllCorps } from "../../../../services/salesVisitServices";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";
import { FormHelperText } from "@mui/material";

const CompanyName = ({ formValues, setFormValues }) => {
  const [selectedValue, setSelectedValue] = useState({
    corpName: "",
  });
  const [corpDatalist, setCorpDataList] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  useEffect(() => {
    fetchAllCorps(setCorpDataList, setIsLoading);
  }, []);

  useEffect(() => {
    setSelectedValue({ corpName: formValues.corpName || "" });
  }, [formValues]);

  return (
    <Fragment>
      <CustomAutocomplete
        freeSolo={true}
        label={"Company Name"}
        placeholder={"Enter Company Name"}
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
        getOptionLabel={(option) => option?.corpName || ""}
        onChange={(event, newValue, reason) => {
          setSelectedValue({ corpName: newValue.corpName });
          setFormValues({ ...formValues, corpName: newValue?.corpName });
          if (reason === "clear") {
            setSelectedValue({
              corpName: "",
            });
            setFormValues({ ...formValues, corpName: "" });
          }
        }}
        onInputChange={(event, newInputValue, reason) => {
          setFormValues({ ...formValues, corpName: newInputValue });
        }}
      />
      {/* <FormHelperText>
        If company already exist then dont register again
      </FormHelperText> */}
    </Fragment>
  );
};

export default CompanyName;
