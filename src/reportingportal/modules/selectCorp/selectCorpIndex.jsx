import {
  Autocomplete,
  Avatar,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/reportingServices";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CorpNameContext } from "../../global/context/context";

const SelectCorpIndex = ({ role = localStorage.getItem("REPORTING_ROLE") }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateCorpName, updateCorpId } = useContext(CorpNameContext);
  const navigate = useNavigate();
  const [selectedCorp, setSelectedCorp] = useState(null);
  const [corpList, setCorpList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCorps = async () => {
    setIsLoading(true);
    let url = BASE_URL + "org/reporting/all";
    if (role === "REPORTING_OPS") {
      url = BASE_URL + "org/reporting/all?managedByOps=true";
    }
    const response = await getData(url);
    if (response.error) {
      setIsLoading(false);
      console.log({ ERROR: response.error });
      setCorpList([]);
    } else {
      setIsLoading(false);
      console.log({ SUCCESS: response.data });
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

  const handleAutocompleteChange = (event, newValue) => {
    setIsLoading(true);
    localStorage.removeItem("SAVED_FILTER_HOME");
    localStorage.removeItem("CORP_ID_REPORTING");
    localStorage.removeItem("CORP_NAME_REPORTING");
    localStorage.removeItem("CORP_LOGO_REPORTING");
    localStorage.removeItem("CORP_ADDRESS_REPORTING");
    localStorage.removeItem("SAVED_FILTER_HOME_MAIN");
    localStorage.removeItem("SAVED_FILTER_HEADER");
    localStorage.removeItem("SAVED_FILTER_SIDE_BAR");
    localStorage.removeItem("SAVED_FILTER_MASTER_PDF");
    localStorage.removeItem("SAVED_FILTER_UPLOAD_REPORT");
    localStorage.removeItem("SAVED_S3_FILTERS");
    localStorage.removeItem("SAVED_S3_ALL_FILES_FILTERS");
    setSelectedCorp(newValue);
    localStorage.setItem("CORP_ID_REPORTING", newValue?.corpId);
    localStorage.setItem("CORP_NAME_REPORTING", newValue?.orgName);
    localStorage.setItem("CORP_LOGO_REPORTING", newValue?.logo);
    localStorage.setItem("CORP_ADDRESS_REPORTING", newValue?.orgAddress);
    updateCorpName(newValue?.orgName);
    updateCorpId(newValue?.corpId);
    enqueueSnackbar(`${newValue?.orgName} Selected`, {
      variant: "success",
    });
    let corpId = localStorage.getItem("CORP_ID_REPORTING");
    console.log({ corpId });
    localStorage.removeItem("CAMP_ID_REPORTING");
    getCampList(corpId);
  };

  const getCampList = async (corpId) => {
    const url = BASE_URL + `org/camp/list/${corpId}`;
    const camp = await getData(url);
    if (camp.error) {
      console.log({ errorGettingCampList: camp.error });
    } else {
      console.log({ CAMPID: camp.data });
      localStorage.setItem("CAMP_ID_REPORTING", camp.data?.[0]?.id || null);
      if (corpId) {
        navigate("/reporting/reporting-main/master-data");
      }
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

export default SelectCorpIndex;
