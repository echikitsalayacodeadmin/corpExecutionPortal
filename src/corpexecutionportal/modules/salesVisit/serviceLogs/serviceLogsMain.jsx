import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import { Grid, IconButton, Typography } from "@mui/material";
import { getData } from "../../../assets/corpServices";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { BASE_URL } from "../../../../assets/constants";

const ServiceLogsMain = () => {
  const navigate = useNavigate();
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
            {serviceLog?.length === 0 && (
              <Grid
                container
                sx={{
                  border: "1px solid #000",
                  padding: 1,
                  borderRadius: "15px",
                  marginBottom: 1,
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} lg={12}>
                  <Typography>No Logs</Typography>
                </Grid>
              </Grid>
            )}
            {serviceLog?.map((item, index) => (
              <Grid
                key={index}
                container
                sx={{
                  border: "1px solid #000",
                  padding: 1,
                  borderRadius: "15px",
                  marginBottom: 1,
                  alignItems: "center",
                }}
              >
                <Grid item xs={6} lg={2}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item.userName}
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={2}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item.date}
                  </Typography>
                </Grid>
                <Grid item xs={10} lg={7}>
                  <Typography
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    {item?.previousStatus === null
                      ? `(null)`
                      : item?.previousStatus
                          ?.replace(/_/g, " ")
                          ?.toLowerCase()}{" "}
                    → {item?.currentStatus?.replace(/_/g, " ")?.toLowerCase()}
                  </Typography>
                </Grid>

                {item?.currentStatus === "QUOTATION_SENT" && (
                  <Grid item xs={2} lg={1}>
                    <IconButton
                      onClick={() => {
                        const query = {
                          corpId: data.corpId,
                          serviceName: data.serviceName,
                        };
                        navigate(
                          `/corp/salesvisit/quotationlist/${encodeURIComponent(
                            JSON.stringify(query)
                          )}`
                        );
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default ServiceLogsMain;
