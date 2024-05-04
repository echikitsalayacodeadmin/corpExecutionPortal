import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { getData, saveData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { sortArrayByLastModifiedDate } from "../../../../assets/utils";
import CustomButtonBlue from "../../../../assets/customButtonBlue";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${period}`;
};

const QuotationSelect = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [corpList, setCorpList] = useState([]);
  const [selectedCorp, setSelectedCorp] = useState(null);
  const [qouatationList, setQouatationList] = useState([]);
  const [selectedQouation, setSelectedQouatation] = useState(null);
  const [isExistingCorp, setIsExistingCorp] = useState(true);
  const [newCorpName, setNewCropName] = useState("");

  const fetCorpList = async () => {
    setIsLoading(true);
    const url = BASE_URL + "corpSales/all/corps";
    const response = await getData(url);
    if (response?.data) {
      setIsLoading(false);
      setCorpList(response?.data);
    } else {
      setCorpList([]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetCorpList();
  }, []);

  const fetchQouatationList = async () => {
    if (selectedCorp?.corpSalesId) {
      const url =
        BASE_URL + "quotation/previous?corpId=" + selectedCorp?.corpSalesId;
      const response = await getData(url);
      if (response?.data) {
        setQouatationList(response?.data);
        if (response?.data.length === 0) {
          router.push({
            pathname: "/corpSales/quotationss/quotationCreate",
            query: {
              corpId: selectedCorp?.corpSalesId,
              quotationId: null,
              companyName: selectedCorp?.corpName,
              address: selectedCorp?.corpAddress,
              quotationStatus: null,
              fromAdmin: false,
            },
          });
        }
        enqueueSnackbar(`${selectedCorp?.corpName} is Selected!`, {
          variant: "success",
        });
      } else {
        setQouatationList([]);
      }
    }
  };
  useEffect(() => {
    fetchQouatationList();
  }, [selectedCorp]);

  const handleCreateCorp = async () => {
    const url = BASE_URL + "corpSales/register";
    const Obj = {
      corpName: newCorpName,
    };
    const result = await saveData(url, Obj);
    if (result && result.data) {
      console.log("SUCCESS POST", result.data);
      setNewCropName("");
      router.push({
        pathname: "/corpSales/quotationss/quotationCreate",
        query: {
          corpSalesId: result.data.corpSalesId,
          companyName: result.data.corpName,
          address: result.data.address,
        },
      });
      enqueueSnackbar("Corp Created Successfully!", {
        variant: "success",
      });
    } else if (result && result.error) {
      console.log("SUCCESS POST", result.error);
      enqueueSnackbar("An Error Occured", {
        variant: "error",
      });
    }
  };

  console.log({ selectedCorp });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <CustomAutocomplete
            options={corpList.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.corpName === item.corpName)
            )}
            label="Search Corp"
            placeholder="Search Corp"
            value={selectedCorp}
            required={true}
            asterickColor={"red"}
            freeSolo={true}
            getOptionLabel={(corp) => corp?.corpName}
            onChange={(event, newValue, reason) => {
              setSelectedCorp(newValue);
              console.log({ newValue });
              if (reason === "clear") {
                setSelectedCorp(null);
              }
            }}
            onInputChange={(event, newInputValue) => {
              setNewCropName(newInputValue);
              const exists = corpList.some(
                (corp) =>
                  corp.corpName
                    .toLowerCase()
                    .trim()
                    .includes(newInputValue.toLowerCase().trim()) ||
                  corp.corpName.toLowerCase().trim() ===
                    newInputValue.toLowerCase().trim()
              );
              setIsExistingCorp(exists);
            }}
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
                    color: "#000",
                  }}
                >
                  {option?.corpName}
                </Typography>
              </Box>
            )}
            helperText="Select Corp from the list if you want to create quotation for existing corps, if not then enter new Corp name directly."
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <CustomAutocomplete
            options={sortArrayByLastModifiedDate(qouatationList).map(
              (item, index) => ({
                ...item,
                index: index + 1,
              })
            )}
            disabled={!isExistingCorp}
            label="Select Existing Quotation"
            placeholder="Select Quotation"
            value={selectedQouation}
            getOptionLabel={(quotation) =>
              quotation.corpName
                ? `Quotation ${quotation?.index}: ${quotation?.corpName} ${
                    quotation?.quotationStatus === "PENDING"
                      ? "PENDING"
                      : quotation?.quotationStatus === "APPROVED"
                      ? "APPROVED"
                      : ""
                  } ${
                    "Last Modified:" +
                    new Date(quotation?.lastModifiedDate)
                      ?.toISOString()
                      .split("T")[0] +
                    formatDateTime(quotation?.lastModifiedDate)
                  }`
                : ""
            }
            onChange={(event, newValue, reason) => {
              setSelectedQouatation(newValue);
              console.log({ newValue });
              enqueueSnackbar(
                `Quotation ${newValue?.index}: ${newValue?.corpName} ${newValue?.quotationStatus} is Selected!`,
                {
                  variant: "success",
                }
              );

              if (reason === "clear") {
                setSelectedQouatation(null);
              }
            }}
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
                    color: "#000",
                  }}
                >
                  {`Quotation ${option?.index}: ${option?.corpName} ${
                    option?.quotationStatus === "PENDING"
                      ? "PENDING"
                      : option?.quotationStatus === "APPROVED"
                      ? "APPROVED"
                      : ""
                  } ${
                    "Last Modified: " +
                    new Date(option?.lastModifiedDate)
                      ?.toISOString()
                      .split("T")[0] +
                    " " +
                    formatDateTime(option?.lastModifiedDate)
                  }`}
                </Typography>
              </Box>
            )}
          />
        </Grid>
      </Grid>

      <CustomButtonBlue
        disabled={selectedQouation === null ? true : false}
        title={"Copy Selected Quotation"}
        onClick={() => {
          router.push({
            pathname: "/corpSales/quotationss/quotationCreate",
            query: {
              corpId: selectedQouation?.corpId,
              quotationId: selectedQouation?.id,
              companyName: selectedQouation?.corpName,
              address: selectedQouation?.corpAddress,
              quotationStatus: selectedQouation?.quotationStatus,
              fromAdmin: false,
              copyQuotation: true,
            },
          });
        }}
      />
      <CustomButtonBlue
        disabled={selectedQouation === null ? true : false}
        title={"View Selected Quotation"}
        onClick={() => {
          router.push({
            pathname: "/corpSales/quotationss/quotationUpdate",
            query: {
              corpId: selectedQouation?.corpId,
              quotationId: selectedQouation?.id,
              companyName: selectedQouation?.corpName,
              address: selectedQouation?.corpAddress,
              quotationStatus: selectedQouation?.quotationStatus,
              fromAdmin: false,
            },
          });
        }}
      />

      <CustomButtonBlue
        title={"Create New Quotation"}
        disabled={selectedCorp === null || !isExistingCorp ? true : false}
        onClick={() => {
          router.push({
            pathname: "/corpSales/quotationss/quotationCreate",
            query: {
              corpId: selectedCorp?.corpSalesId,
              quotationId: null,
              companyName: selectedCorp?.corpName,
              address: selectedCorp?.corpAddress,
              quotationStatus: null,
              fromAdmin: false,
            },
          });
        }}
      />
      <CustomButtonBlue
        title={"Create New Corp"}
        disabled={isExistingCorp || newCorpName === "" ? true : false}
        onClick={() => {
          handleCreateCorp();
        }}
      />
    </Fragment>
  );
};

export default QuotationSelect;
