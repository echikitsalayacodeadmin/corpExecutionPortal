import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { getData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import SelectKam from "../../../global/selectKam/selectKam";
import CustomSelect from "../../../../assets/customSelect";
import SelectLocation from "../../../global/selectLocation/selectLocation";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import SearchBarCompany from "../../../global/searchBarCompany/searchBarCompany";
import DashboardCard from "./subComp/dashboardCard";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { downloadCsv } from "../../../../assets/utils";
import SelectUser from "../../../global/selectUsers/selectUsers";
import SelectkamInDashboard from "../../../global/selectKam/selectkamInDashboard";
import dayjs from "dayjs";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import MainPageLayoutWithBackSV from "../../../global/templates/mainPageLayoutWithBackSV";

const SalesVisitDashboard = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const _storedData = useMemo(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("SAVE_FILTERS__SALES_VISIT_DASHBOARD")
        ) || {}
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  }, []);

  useEffect(() => {
    const _fromDate = _storedData?.fromDate
      ? dayjs(_storedData.fromDate).format("YYYY-MM-DD")
      : dayjs().subtract(7, "day").format("YYYY-MM-DD");

    const _toDate = _storedData?.toDate
      ? dayjs(_storedData.toDate).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD");

    const _status = _storedData?.status || "";
    const _userId = _storedData?.userId || "";
    const _selectedUserName = _storedData?.selectedUserName || "";
    const _selectedLocation = _storedData?.selectedLocation || "";
    const _selectedPriority = _storedData?.selectedPriority || "";
    setFromDate(_fromDate);
    setToDate(_toDate);
    setStatus(_status);
    setUserId(_userId);
    setSelectedUserName(_selectedUserName);
    setselectedLocation(_selectedLocation);
    setSelectedPriority(_selectedPriority);

    fetchData(
      _status,
      _userId,
      _selectedUserName,
      _fromDate,
      _toDate,
      _selectedPriority,
      _selectedLocation
    );
  }, []);

  const fetchData = async (
    _status,
    _userId,
    _selectedUserName,
    _fromDate,
    _toDate,
    _selectedPriority,
    _selectedLocation
  ) => {
    setIsLoading(true);
    let url =
      BASE_URL +
      `corpSales/all?status=VISIT&startDate=${_fromDate}&endDate=${_toDate}`;

    const result = await getData(url);
    if (result?.data) {
      setIsLoading(false);

      const tempList = result?.data?.filter((item) => {
        return (
          (_status === "Interested" ? item?.interested === true : true) &&
          (_status === "NotInterested" ? item?.interested === false : true) &&
          // (_userId ? item.userId === _userId : true) &&
          (_selectedPriority ? item.priority === _selectedPriority : true) &&
          (_selectedLocation ? item.location === _selectedLocation : true) &&
          (_selectedUserName
            ? Object.keys(item?.mapOfUserAndVisitsCount)?.includes(
                _selectedUserName
              )
            : true)
        );
      });
      setCompanyList(tempList);
      setCompanyListStatic(result?.data);
    } else {
      setIsLoading(false);

      setCompanyList([]);
      setCompanyListStatic([]);
    }
  };
  const fetchMisData = async (
    _status,
    _userId,
    _fromDate,
    _toDate,
    _selectedPriority,
    _selectedLocation
  ) => {
    let url =
      BASE_URL +
      `corpSales/mis/report?status=VISIT&userId=${userId}&startDate=${_fromDate}&endDate=${_toDate}`;
    if (_selectedPriority !== "") {
      url += _selectedPriority ? `&priority=${_selectedPriority}` : "";
    }
    if (_selectedLocation !== null || _selectedLocation !== "") {
      url += _selectedLocation ? `&location=${_selectedLocation}` : "";
    }
    if (_status !== "") {
      _status
        ? (url += `&interested=${
            _status === "Interested"
              ? true
              : _status === "NotInterested"
              ? false
              : null
          }`)
        : null;
    }
    const result = await getData(url);
    if (result?.data) {
      const temp = result?.data?.map((item, index) => ({
        ...item,
        prospectiveServices: item?.prospectiveServices?.join(", "),
      }));

      downloadCsv(temp, `data.csv`);
    } else {
      setCSVData([]);
    }
  };

  const downloadCSV = (csvData) => {
    if (csvData.length === 0) {
      enqueueSnackbar("Response is empty", {
        variant: "info",
      });
      return;
    }
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object?.keys(csvData[0])
        .map((key) => key)
        .join(",") +
      "\n" +
      csvData
        .map((row) =>
          Object.values(row)
            .map((val) => `"${val}"`)
            .join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const [fromDate, setFromDate] = useState(
    dayjs().subtract(7, "day").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [status, setStatus] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [companyListStatic, setCompanyListStatic] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedLocation, setselectedLocation] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCompanyList(
      companyListStatic.filter((item) => {
        return (
          (status === "Interested" ? item?.interested === true : true) &&
          (status === "NotInterested" ? item?.interested === false : true) &&
          // (userId ? item.userId === userId : true) &&
          (selectedPriority ? item.priority === selectedPriority : true) &&
          (selectedLocation ? item.location === selectedLocation : true) &&
          (selectedUserName
            ? Object.keys(item?.mapOfUserAndVisitsCount)?.includes(
                selectedUserName
              )
            : true)
        );
      })
    );
  }, [
    companyListStatic,
    status,
    userId,
    status,
    selectedPriority,
    selectedLocation,
  ]);

  useEffect(() => {
    fetchData(
      status,
      userId,
      fromDate,
      toDate,
      selectedPriority,
      selectedLocation
    );
  }, [fromDate, toDate]);

  useEffect(() => {
    const filtersData = {
      fromDate,
      toDate,
      status,
      userId,
      selectedUserName,
      selectedPriority,
      selectedLocation,
    };
    localStorage.setItem(
      "SAVE_FILTERS__SALES_VISIT_DASHBOARD",
      JSON.stringify(filtersData)
    );
  }, [
    fromDate,
    toDate,
    status,
    userId,
    selectedUserName,
    selectedLocation,
    selectedPriority,
  ]);

  const [rows, setRows] = useState([]);

  const fetchServices = async () => {
    const url = BASE_URL + "corpSales/services";
    const result = await getData(url);
    if (result.data) {
      setRows(result.data);
    } else {
      setRows([]);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Fragment>
      <MainPageLayoutWithBackSV
        title="Visit Dashboard"
        onDownloadClick={() =>
          fetchMisData(
            status,
            userId,
            fromDate,
            toDate,
            selectedPriority,
            selectedLocation
          )
        }
        downloadButton={true}
        onRegisterClick={() => {
          navigate(`/corp/registercorp`);
        }}
      >
        <Grid
          spacing={1}
          container
          sx={{
            boxSizing: "border-box",
            background: "#FFFFFF",
            borderRadius: 5,
          }}
        >
          <Grid item xs={4} lg={2}>
            <GlobalDateLayout
              initialDate={fromDate}
              setDate={setFromDate}
              label={"From Date"}
              disableFuture={true}
              sevenDaysBack={true}
            />
          </Grid>
          <Grid item xs={4} lg={2}>
            <GlobalDateLayout
              initialDate={toDate}
              setDate={setToDate}
              label={"To Date"}
              disableFuture={true}
            />
          </Grid>
          <Grid item xs={4} lg={2}>
            <SelectkamInDashboard
              setSelectedUserName={setSelectedUserName}
              setUserId={setUserId}
            />
          </Grid>
          <Grid item xs={4} lg={2}>
            <CustomSelect
              label="Priority"
              placeholder={"Priority"}
              setvalue={setSelectedPriority}
              value={selectedPriority}
              options={[
                { label: "Priority", value: "" },
                { label: "P0", value: "P0" },
                { label: "P1", value: "P1" },
                { label: "P2", value: "P2" },
                { label: "P3", value: "P3" },
                { label: "P4", value: "P4" },
              ]}
            />
          </Grid>
          <Grid item xs={4} lg={2}>
            <SelectLocation
              label={"Location"}
              placeholder={"Location"}
              selectedValue={selectedLocation}
              setSelectedValue={setselectedLocation}
            />
          </Grid>
          <Grid item xs={4} lg={2}>
            <CustomSelect
              label="Status"
              placeholder={"Status"}
              setvalue={setStatus}
              value={status}
              options={[
                { label: "Status", value: "" },
                { label: "Interested", value: "Interested" },
                { label: "Not Interested", value: "NotInterested" },
              ]}
            />
          </Grid>
          <Grid item xs={4} lg={2}>
            <CustomAutocomplete
              options={[]}
              placeholder="Colour Code"
              label="Colour Code"
              value={null}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={4} lg={1}>
            <CustomButtonBlue title={"Next 7 Days"} />
          </Grid>
        </Grid>
        <SearchBarCompany
          setTokenListStatic={setCompanyListStatic}
          tokenListStatic={companyListStatic}
          tokenList={companyList}
          setTokenList={setCompanyList}
        />

        <Box>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            companyList.map((item, index) => (
              <DashboardCard data={item} key={index} serviceMapping={rows} />
            ))
          )}
        </Box>
      </MainPageLayoutWithBackSV>
    </Fragment>
  );
};

export default SalesVisitDashboard;
