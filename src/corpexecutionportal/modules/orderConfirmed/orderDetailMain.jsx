import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import { IOSSwitch } from "../../../assets/customSwitch";
import GlobalDateLayout from "../../../assets/globalDateLayout/globalDateLayout";
import CompanySummaryInfo from "../salesVisit/detail/subComp/companySummaryInfo";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../assets/constants";
import { saveData } from "../../assets/corpServices";

const OrderDetailMain = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const query = itemId;

  const data = JSON.parse(decodeURIComponent(query));

  const [details, setDetails] = useState("");

  useEffect(() => {
    setDetails(data);
    setDeliveryDate(
      data?.deliveryDate
        ? new Date(data?.deliveryDate)
        : new Date().toISOString().slice(0, 10)
    );
    setFormValues({
      ...formValues,
      deliveryInstruction: data?.deliveryInstruction || "",
    });
  }, [query?.details]);

  console.log({ details });

  const [deliveryDate, setDeliveryDate] = useState(null);
  const [formValues, setFormValues] = useState({
    deliveryInstruction: "",
    serviceStarted: false,
  });

  const Obj = {
    deliveryDate: deliveryDate,
    deliveryInstruction: formValues.deliveryInstruction,
    serviceStarted: formValues.serviceStarted,
    corpSalesId: details?.corpSalesId,
  };
  const handleSubmit = async () => {
    const url = BASE_URL + "corpSales/placeOrder";
    const result = await saveData(url, Obj);
    if (result && result.data) {
      console.log("SUCCESS POST", result.data);
      setFormValues({
        deliveryInstruction: "",
        serviceStarted: false,
      });
      enqueueSnackbar("Successfull Saved!", {
        variant: "success",
      });
      navigate(-1);
    } else if (result && result.error) {
      console.log("ERROR POST", result.error);
      enqueueSnackbar("An error occued", {
        variant: "error",
      });
    }
  };

  return (
    <Fragment>
      <MainPageLayoutWithBack title={"Order Confirmed Detail"}>
        <CompanySummaryInfo data={details} />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Delivery Date
            </Typography>
            <GlobalDateLayout
              setDate={setDeliveryDate}
              initialDate={deliveryDate}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Delivery Instruction
            </Typography>
            <TextField
              value={formValues.deliveryInstruction || ""}
              onChange={(event) => {
                setFormValues({
                  ...formValues,
                  deliveryInstruction: event.target.value,
                });
              }}
              fullWidth
              variant="outlined"
              placeholder="Enter Instructions"
              size="small"
            />
          </Grid>

          <Grid item xs={6} lg={6}>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Service Started
            </Typography>
          </Grid>
          <Grid item xs={6} lg={6}>
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={formValues.serviceStarted || false}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      serviceStarted: e.target.checked,
                    });
                  }}
                />
              }
            />
          </Grid>
        </Grid>

        <CustomButtonBlue title="Submit" onClick={() => handleSubmit()} />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default OrderDetailMain;
const styles = {
  heading: {
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "15px",
    color: "#6B6B6B",
    marginBottom: "5px",
  },
  data: {
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "15px",
    color: "#000000",
    marginBottom: "5px",
    marginLeft: "5px",
  },
};
