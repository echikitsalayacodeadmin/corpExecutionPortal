import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import WaitingCardOrders from "./subComps/WaitingCardOrders";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import GlobalDateLayout from "../../../assets/globalDateLayout/globalDateLayout";
import SearchBarCompany from "../../global/searchBarCompany/searchBarCompany";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/corpServices";
import DashboardCard from "../salesVisit/dashboard/subComp/dashboardCard";
import { CorpNameContext } from "../../global/context/usercontext";

const OrderConfirmMain = () => {
  const { corpName, setCorpName } = useContext(CorpNameContext);
  const _storedData =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("SAVE_FILTERS_ORDERS_DASHBOARD_CORP"))
      : null;

  console.log(_storedData);

  useEffect(() => {
    const _fromDate = _storedData
      ? new Date(_storedData?.fromDate)?.toISOString().split("T")[0]
      : new Date().toISOString().slice(0, 10);

    const _toDate = _storedData
      ? new Date(_storedData?.toDate)?.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    setFromDate(_fromDate);
    setToDate(_toDate);
    fetchData(_fromDate, _toDate);
  }, []);

  const fetchData = async (_fromDate, _toDate) => {
    let url =
      BASE_URL +
      `corpSales/all?status=ORDERS&startDate=${_fromDate}&endDate=${_toDate}`;

    const result = await getData(url);
    if (result?.data) {
      console.log("SUCCESS", result?.data);
      const tempList = result?.data;
      setCompanyList(tempList);
      setCompanyListStatic(result?.data);
    } else {
      console.log("ERROR", result?.error);
      setCompanyList([]);
      setCompanyListStatic([]);
    }
  };

  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [companyList, setCompanyList] = useState([]);
  const [companyListStatic, setCompanyListStatic] = useState([]);

  useEffect(() => {
    setCompanyList(companyListStatic);
  }, [companyListStatic]);

  useEffect(() => {
    fetchData(fromDate, toDate);
  }, [fromDate, toDate]);

  useEffect(() => {
    const filtersData = {
      fromDate: fromDate,
      toDate: toDate,
    };
    localStorage.setItem(
      "SAVE_FILTERS_ORDERS_DASHBOARD_CORP",
      JSON.stringify(filtersData)
    );
  }, [fromDate, toDate]);
  useEffect(() => {
    setCorpName("");
  }, [corpName]);
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Order Confirmed">
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item xs={6} lg={6}>
            <GlobalDateLayout
              title="From Date"
              setDate={setFromDate}
              initialDate={fromDate}
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <GlobalDateLayout
              title="To Date"
              setDate={setToDate}
              initialDate={toDate}
            />
          </Grid>
        </Grid>
        <SearchBarCompany
          setTokenListStatic={setCompanyListStatic}
          tokenListStatic={companyListStatic}
          tokenList={companyList}
          setTokenList={setCompanyList}
        />

        {companyList?.map((item, index) => (
          <WaitingCardOrders data={item} key={index} />
        ))}
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default OrderConfirmMain;
