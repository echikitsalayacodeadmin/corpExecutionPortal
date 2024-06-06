import { Box, Grid, TextField } from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { fetchCorps } from "../../../services/selectCorpServices";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { useSnackbar } from "notistack";
import {
  saveData,
  saveDataWithoutToken,
} from "../../../assets/reportingServices";
import { BASE_URL_AUTH } from "../../../../assets/constants";

const CreateOrgCredentials = ({ corpData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [corpList, setCorpList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCorps(setIsLoading, setCorpList);
  }, []);

  const [userName, setUserName] = useState("");
  const [selectedCorp, setSelectedCorp] = useState(null);
  const handleSelectCorp = (event, newValue) => {
    setSelectedCorp(newValue);
  };

  const handleSubmitCredentials = async () => {
    const payload = {
      id: selectedCorp?.corpId,
      userName: userName,
    };

    const url = BASE_URL_AUTH + "corp/createCredentials";
    const result = await saveData(url, payload);
    if (result.error) {
      console.log({ ERROR: result });
      enqueueSnackbar("An error Occured!", {
        variant: "error",
      });
    } else {
      console.log({ SUCCESS: result.data });
      enqueueSnackbar("Successfully Created", {
        variant: "success",
      });
    }
  };

  return (
    <Fragment>
      <Box sx={{ marginBlock: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <CustomAutocomplete
              placeholder="Select Corp"
              label="Select Corp"
              options={corpList.filter(
                (corp, index, self) =>
                  corp.corpId !== null &&
                  corp.corpId !== "" &&
                  corp.orgName !== null &&
                  corp.orgName !== "" &&
                  self.findIndex(
                    (c) =>
                      c?.corpId === corp?.corpId || c?.orgName === corp?.orgName
                  ) === index
              )}
              getOptionLabel={(option) => option?.orgName}
              value={selectedCorp}
              onChange={handleSelectCorp}
              required={true}
              asterickColor="red"
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <TextField
              sx={{
                height: "50px",
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
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              label="Enter User Name"
              variant="outlined"
              placeholder="Enter User Name"
              size="small"
              fullWidth
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButtonBlue
            onClick={() => {
              handleSubmitCredentials();
            }}
            disabled={userName !== "" ? false : true}
            title={"Submit"}
            styles={{
              height: "40px",
              padding: "20px",
              width: "200px",
              marginBlock: "20px",
            }}
          />
        </Box>
      </Box>
    </Fragment>
  );
};

export default CreateOrgCredentials;
