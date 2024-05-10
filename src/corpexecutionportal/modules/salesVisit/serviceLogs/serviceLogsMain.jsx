import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import { Grid, Typography } from "@mui/material";
import { getData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";

const ServiceLogsMain = () => {
  const { itemId } = useParams();
  const data = JSON.parse(decodeURIComponent(itemId));
  const [serviceLog, setServiceLog] = useState([]);
  const fetchData = async (_status) => {
    const url =
      BASE_URL +
      `corpSales/service/logs?serviceId=${data?.serviceId}&corpSalesId=${data.corpId}`;
    const result = await getData(url);
    if (result?.data) {
      setServiceLog(result?.data?.[data.serviceId]);
    } else {
      setServiceLog([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data?.serviceId]);

  return (
    <Fragment>
      <MainPageLayoutWithBack title={`${data.serviceName} Logs`}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            {serviceLog?.map((item, index) => (
              <Grid
                key={index}
                container
                sx={{
                  border: "1px solid #000",
                  padding: 1,
                  borderRadius: "15px",
                  marginBottom: 1,
                }}
              >
                <Grid item xs={6} lg={3}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item.userName}
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={3}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item.date}
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={3}>
                  <Typography
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    Prev:
                    {item?.previousStatus?.replace(/_/g, " ")?.toLowerCase()}
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={3}>
                  <Typography
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    Current:
                    {item?.currentStatus?.replace(/_/g, " ")?.toLowerCase()}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default ServiceLogsMain;
