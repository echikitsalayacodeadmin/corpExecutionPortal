import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/orgAnalysisServices";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CorpNameContext } from "../../global/context/context";

const SelectCorpIndexOrgAnalysis = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateCorpName, updateCorpId } = useContext(CorpNameContext);
  const navigate = useNavigate();
  const [selectedCorp, setSelectedCorp] = useState(null);
  const [corpList, setCorpList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCorps = async () => {
    setIsLoading(true);
    const url = BASE_URL + "org/reporting/all";
    const response = await getData(url);
    if (response.data) {
      setIsLoading(false);

      const temp = response.data?.filter(
        (item, index, self) =>
          self.findIndex(
            (t) => t.orgName === item.orgName || t.corpId === item.corpId
          ) === index
      );
      setCorpList(temp);
    } else {
      setIsLoading(false);
      console.log({ ERROR: response.error });
      setCorpList([]);
    }
  };

  useEffect(() => {
    fetchCorps();
  }, []);

  const handleAutocompleteChange = (event, newValue) => {
    localStorage.removeItem("CORP_ID_ORG_ANALYSIS");
    localStorage.removeItem("CORP_NAME_ORG_ANALYSIS");
    setSelectedCorp(newValue);
    localStorage.setItem("CORP_ID_ORG_ANALYSIS", newValue?.corpId);
    localStorage.setItem("CORP_NAME_ORG_ANALYSIS", newValue?.orgName);
    updateCorpName(newValue?.orgName);
    updateCorpId(newValue?.corpId);
    navigate("/org-analysis/home");
    enqueueSnackbar(`${newValue?.orgName} Selected`, {
      variant: "success",
    });
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
    <Box>
      <Autocomplete
        fullWidth
        size="small"
        options={corpList}
        getOptionLabel={(option) => option?.orgName}
        value={selectedCorp}
        onChange={handleAutocompleteChange}
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
    </Box>
  );
};

export default SelectCorpIndexOrgAnalysis;
