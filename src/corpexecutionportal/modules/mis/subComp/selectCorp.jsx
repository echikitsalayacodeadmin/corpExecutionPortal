import React, { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../../assets/constants";
import { getData } from "../../../assets/corpServices";
import { Autocomplete, TextField } from "@mui/material";

const SelectCorp = ({ setSelectedCorpId, setSelectedCorpName }) => {
  const [selectedCorp, setSelectedCorp] = useState(null);
  const [corpList, setCorpList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCorps = async () => {
    setIsLoading(true);
    let url = BASE_URL + "org/reporting/all";
    const response = await getData(url);
    if (response.error) {
      setIsLoading(false);
      setCorpList([]);
    } else {
      setIsLoading(false);
      setCorpList(
        response.data?.filter(
          (item, index, self) =>
            self.findIndex(
              (t) => t.orgName === item.orgName || t.corpId === item.corpId
            ) === index
        )
      );
    }
  };

  useEffect(() => {
    fetchCorps();
  }, []);

  return (
    <Fragment>
      <Autocomplete
        fullWidth
        size="small"
        options={corpList}
        getOptionLabel={(option) => option?.orgName || ""}
        value={selectedCorp}
        onChange={(event, newValue, reason) => {
          setSelectedCorp(newValue);
          if (setSelectedCorpId) {
            setSelectedCorpId(newValue?.corpId);
            setSelectedCorpName(newValue?.orgName);
          }
          if (reason === "clear") {
            setSelectedCorpId("");
            setSelectedCorpName("");
            setSelectedCorp(null);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              background: "#fff",
              color: "#127DDD",
              fontWeight: "500",
              fontSize: "13px",
              lineHeight: " 15px",
              "& input::placeholder": {
                color: "#000000",
                fontWeight: "500",
                fontSize: "13px",
                lineHeight: " 15px",
              },
            }}
            variant="outlined"
            placeholder="Select Corp"
            label="Select Corp"
            size="small"
            InputProps={{
              ...params.InputProps,
              type: "Search Corp",
            }}
          />
        )}
      />
    </Fragment>
  );
};

export default SelectCorp;
