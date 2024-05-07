import { Box, Button, Grid, Stack } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { CustomTypographyBoldAlt } from "../../../assets/customTypography";
import MainPageLayout from "../../global/templates/mainPageLayout";
import { showNumber } from "../../../assets/utils";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/corpServices";
import CustomButtonBlue from "../../../assets/customButtonBlue";

const ShowCount = ({ children }) => {
  return <CustomTypographyBoldAlt>{children}</CustomTypographyBoldAlt>;
};

const data = (val) => {
  return [
    {
      id: 1,
      title: "SALES VISITS",
      count: val?.visits,
      countComp: <ShowCount>{`${showNumber(val?.visits)}`}</ShowCount>,
      path: "/corp/salesvisit",
      xsgridwidth: 12,
      disabled: false,
    },
    {
      id: 2,
      title: "QUOTATION SENT",
      count: val?.quotations,
      countComp: <ShowCount>{`${showNumber(val?.quotations)}`}</ShowCount>,
      path: "/corp/quotation",
      xsgridwidth: 12,
      disabled: false,
    },
    {
      id: 3,
      title: "ORDER CONFIRMED",
      count: val?.orders,
      countComp: <ShowCount>{`${showNumber(val?.orders)}`}</ShowCount>,
      path: "/corp/orderconfirmed",
      xsgridwidth: 12,
      disabled: true,
    },
    {
      id: 4,
      title: "EXECUTION PLANNING",
      count: val?.service,
      countComp: <ShowCount>{`${showNumber(val?.service)}`}</ShowCount>,
      path: "/corp/executionplanning",
      xsgridwidth: 12,
      disabled: true,
    },
    {
      id: 5,
      title: "DELIVERY ORCHESTRATOR",
      count: val?.totalEmployees || "",
      countComp: <ShowCount>{`${showNumber(val?.totalEmployees)}`}</ShowCount>,
      path: "/corp/deliveryorchestrator",
      xsgridwidth: 12,
    },
    {
      id: 6,
      title: "ACCOUNT RECEIVABLE",
      count: val?.payment || "",
      countComp: <ShowCount>{`${showNumber(val?.payment)}`}</ShowCount>,
      path: "/camp/accountreceivable",
      xsgridwidth: 12,
      disabled: true,
    },
    {
      id: 7,
      title: "BIZ FIN",
      count: val?.totalEmployees,
      countComp: <ShowCount>{`${showNumber(val?.totalEmployees)}`}</ShowCount>,
      path: "/corp/bizfin",
      xsgridwidth: 12,
      disabled: true,
    },
    {
      id: 8,
      title: "MIS",
      count: val?.totalEmployees,
      countComp: <ShowCount>{`${showNumber(val?.totalEmployees)}`}</ShowCount>,
      path: "/corp/mis",
      xsgridwidth: 12,
      disabled: true,
    },
  ];
};

const HomeMain = () => {
  let navigate = useNavigate();
  const [stats, setStats] = useState({});
  const fetchData = async () => {
    const url = BASE_URL + "corpSales/homepage";
    const data = await getData(url);
    if (data && data.data) {
      console.log("SUCCESS GET", data.data);
      setStats(data.data);
    } else if (data && data.error) {
      setStats({});
    }
  };

  useEffect(() => {
    fetchData();
    localStorage.removeItem("SAVE_FILTERS__SALES_VISIT_DASHBOARD");
  }, []);
  return (
    <Fragment>
      <MainPageLayout title={""}>
        <Box>
          <Grid container spacing={{ lg: 1, xs: 0.5 }} display="flex">
            {data(stats).map((item, index) => (
              <Grid item lg={4} xs={item?.xsgridwidth} key={index}>
                <Box>
                  <Button
                    disabled={item.disabled}
                    onClick={() => navigate(item?.path)}
                    fullWidth
                  >
                    <Box
                      sx={{
                        flex: 1,
                        p: { lg: 3, xs: 2 },
                        minWidth: 100,
                        height: { lg: 80, xs: 60 },
                        border: 0.5,
                        borderRadius: 7,
                        background:
                          "linear-gradient(to right, rgb(240, 240, 240), rgb(120, 190, 255))",
                      }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Stack
                        flex={1}
                        direction={{ lg: "column", xs: "row" }}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <CustomTypographyBoldAlt>
                            {item?.title}
                          </CustomTypographyBoldAlt>
                        </Box>

                        <Box>
                          <Stack flex={1} direction="row" spacing={2}>
                            {item?.countComp}
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Button>
                </Box>
              </Grid>
            ))}
            <Grid item lg={12} xs={12}>
              <CustomButtonBlue
                title="Add Data in Quotation"
                onClick={() => {
                  navigate(`/corp/quotation/addquotationdata`);
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </MainPageLayout>
    </Fragment>
  );
};

export default HomeMain;
