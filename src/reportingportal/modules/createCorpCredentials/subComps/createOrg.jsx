import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import UploadFile from "../../../global/uploadFile";
import { saveData, uploadFile } from "../../../assets/reportingServices";
import { BASE_URL } from "../../../../assets/constants";
import { useFileUpload } from "use-file-upload";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { fetchSnopCorps } from "../../../services/createCorpCredServices";
import { useSnackbar } from "notistack";

const CreateOrg = ({ setValue, setCorpData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState({
    orgName: "",
    orgAddress: "",
    city: "",
    pincode: "",
    orgLogoUrl: { source: "" },
    orgLogoUrlMobile: { source: "" },
  });
  const [snopCorpsList, setSnopCorpList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchSnopCorps(setIsLoading, setSnopCorpList);
  }, []);

  const [selectedSnopCorp, setSelectedSnopCorp] = useState(null);
  const handleSelectSnopCorp = (event, newValue, reason) => {
    setSelectedSnopCorp(newValue);

    if (reason === "clear") {
      setFormValues({
        orgName: "",
        orgAddress: "",
        city: "",
        pincode: "",
        orgLogoUrl: "",
        orgLogoUrlMobile: "",
      });
    }
  };

  const [files, selectFiles] = useFileUpload();

  const handleCreateOrg = async () => {
    let formData = new FormData();
    {
      selectedSnopCorp?.corpId
        ? formData.append("corpId", selectedSnopCorp?.corpId)
        : null;
    }
    formData.append("orgName", formValues?.orgName);
    formData.append("orgAddress", formValues?.orgAddress);
    formData.append("city", formValues?.city);
    formData.append("pincode", formValues?.pincode);
    {
      formValues?.orgLogoUrl?.file
        ? formData.append("orgLogoFile", formValues?.orgLogoUrl?.file)
        : null;
    }
    {
      formValues?.orgLogoUrlMobile?.file
        ? formData.append(
            "orgMobileLogoFile",
            formValues?.orgLogoUrlMobile?.file
          )
        : null;
    }
    const url = BASE_URL + "org/createOrg";
    const result = await uploadFile(url, formData);
    if (result.data) {
      enqueueSnackbar("Success fully Created!", {
        variant: "success",
      });
      setValue("3");
      setCorpData({
        id: result.data.corpId,
        corpName: result.data.orgName,
      });
    } else {
      enqueueSnackbar("An error occured", {
        variant: "error",
      });
    }
  };

  return (
    <Fragment>
      <Box sx={{ marginBlock: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <CustomAutocomplete
              onInputChange={(event, newInputValue) => {
                setFormValues({ ...formValues, orgName: newInputValue });
              }}
              freeSolo={true}
              options={snopCorpsList?.filter(
                (corp, index, self) =>
                  corp.corpId !== null &&
                  corp.corpId !== "" &&
                  corp.corpName !== null &&
                  corp.corpName !== "" &&
                  self.findIndex(
                    (c) =>
                      c?.corpId === corp?.corpId ||
                      c?.corpName === corp?.corpName
                  ) === index
              )}
              value={selectedSnopCorp}
              onChange={(event, newValue) => {
                handleSelectSnopCorp(event, newValue);
                setFormValues({
                  ...formValues,
                  orgName: newValue?.corpName,
                });
              }}
              getOptionLabel={(option) => option?.corpName}
              label={"Search Corp"}
              placeholder={"Enter corp name"}
              required={true}
              asterickColor="red"
              groupLabel="SNOP Corp List"
              helperText="Select from the list if you want to create org from snop corps list, if not then enter new org name directly."
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
              label="Enter Org Address"
              variant="outlined"
              placeholder="Enter Org Address"
              size="small"
              fullWidth
              value={formValues.orgAddress}
              onChange={(e) => {
                setFormValues({ ...formValues, orgAddress: e.target.value });
              }}
              required
            />
          </Grid>
          <Grid item xs={12} lg={4}>
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
              }}
              label="Enter Org City"
              variant="outlined"
              placeholder="Enter Org City"
              size="small"
              fullWidth
              value={formValues.city}
              onChange={(e) => {
                setFormValues({ ...formValues, city: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
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
              }}
              label="Enter Org Pincode"
              variant="outlined"
              placeholder="Enter Org Pincode"
              size="small"
              fullWidth
              value={formValues.pincode}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  pincode: e.target.value,
                });
              }}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <UploadFile
                  title="Upload Logo Desktop"
                  styles={{ height: "40px", borderRadius: "15px" }}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  property={"orgLogoUrl"}
                  onClick={() =>
                    selectFiles(
                      { accept: "*" },
                      ({ name, size, source, file }) => {
                        const filedata = { name, size, source, file };
                        setFormValues((prevFormValues) => ({
                          ...prevFormValues,
                          orgLogoUrl: filedata, // or source if you prefer
                        }));
                      }
                    )
                  }
                />
                {formValues?.orgLogoUrl?.source ? null : (
                  <Typography
                    sx={{ color: "red", fontSize: "13px", marginTop: "10px" }}
                  >
                    Please Upload Desktop Logo *
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <UploadFile
                  title="Upload Logo Mobile"
                  styles={{ height: "40px", borderRadius: "15px" }}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  property={"orgLogoUrlMobile"}
                  onClick={() =>
                    selectFiles(
                      { accept: "*" },
                      ({ name, size, source, file }) => {
                        const filedata = { name, size, source, file };
                        setFormValues((prevFormValues) => ({
                          ...prevFormValues,
                          orgLogoUrlMobile: filedata, // or source if you prefer
                        }));
                      }
                    )
                  }
                />
                {formValues.orgLogoUrlMobile?.source ? null : (
                  <Typography
                    sx={{ color: "red", fontSize: "13px", marginTop: "10px" }}
                  >
                    Please Upload Mobile Logo *
                  </Typography>
                )}
              </Grid>
            </Grid>
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
            onClick={() => handleCreateOrg()}
            disabled={formValues.orgName !== "" ? false : true}
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

export default CreateOrg;
