import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import UploadFile from "../../../global/uploadFile";
import {
  updateData,
  updateMultipartData,
  uploadFile,
} from "../../../assets/reportingServices";
import { BASE_URL } from "../../../../assets/constants";
import { useFileUpload } from "use-file-upload";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { fetchRegisteredCorps } from "../../../services/createCorpCredServices";
import { useSnackbar } from "notistack";

const UpdateOrg = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState({
    orgName: "",
    orgAddress: "",
    city: "",
    pincode: "",
    orgLogoUrl: { source: "" },
    orgLogoUrlMobile: { source: "" },
  });
  const [corpList, setCorpList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchRegisteredCorps(setIsLoading, setCorpList);
  }, []);

  const [selectedCorp, setSelectedCorp] = useState(null);
  const handleSelectCorp = (event, newValue, reason) => {
    setSelectedCorp(newValue);
    setFormValues({
      orgName: newValue?.orgName || "",
      orgAddress: newValue?.orgAddress || "",
      city: newValue?.city || "",
      pincode: newValue?.pincode || "",
      orgLogoUrl: { source: newValue?.logo || "" },
      orgLogoUrlMobile: { source: newValue?.mobileLogo || "" },
    });

    if (reason === "clear") {
      setFormValues({
        orgName: "",
        orgAddress: "",
        city: "",
        pincode: "",
        orgLogoUrl: { source: "" },
        orgLogoUrlMobile: { source: "" },
      });
    }
  };

  const [files, selectFiles] = useFileUpload();

  const handleUpdateDetails = async () => {
    let formData = new FormData();
    {
      selectedCorp?.corpId
        ? formData.append("corpId", selectedCorp?.corpId)
        : null;
    }
    formData.append("orgName", formValues?.orgName);
    formData.append("orgAddress", formValues?.orgAddress);
    formData.append("city", formValues?.city);
    formData.append("pincode", formValues?.pincode);
    {
      formValues.orgLogoUrl.file
        ? formData.append("orgLogoFile", formValues.orgLogoUrl.file)
        : null;
    }
    {
      formValues?.orgLogoUrlMobile.file
        ? formData.append(
            "orgMobileLogoFile",
            formValues?.orgLogoUrlMobile.file
          )
        : null;
    }
    const url = BASE_URL + "org/updateOrg";
    const result = await updateMultipartData(url, formData);
    if (result.data) {
      enqueueSnackbar("Successfully Updated!", {
        variant: "success",
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
              // freeSolo={true}
              placeholder="Select Corp to Updated"
              label="Select Corp to Updated"
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
              error={formValues?.orgName !== "" ? false : true}
              renderOption={(props, option) => (
                <Box
                  {...props}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      color: option.isDetailsCompleted ? "#000" : "red",
                    }}
                  >
                    {option?.orgName}
                  </Typography>
                </Box>
              )}
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
              label="Enter Org Name"
              variant="outlined"
              placeholder="Enter Org Name"
              size="small"
              fullWidth
              error={formValues.orgName !== "" ? false : true}
              value={formValues.orgName}
              onChange={(e) => {
                setFormValues({ ...formValues, orgName: e.target.value });
              }}
              required
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
              error={formValues.orgAddress !== "" ? false : true}
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
                {formValues.orgLogoUrl.source !== "" ? null : (
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
                          orgLogoUrlMobile: filedata,
                        }));
                      }
                    )
                  }
                />
                {formValues.orgLogoUrlMobile.source !== "" ? null : (
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
            onClick={() => {
              handleUpdateDetails();
            }}
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

export default UpdateOrg;
