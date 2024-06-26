import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import SelectLocation from "../../../global/selectLocation/selectLocation";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import SearchBarCompany from "../../../global/searchBarCompany/searchBarCompany";
import DashboardCard from "./subComp/dashboardCard";
import { useNavigate } from "react-router-dom";
import { downloadCsv, getColorOfNextVisitDate } from "../../../../assets/utils";
import SelectkamInDashboard from "../../../global/selectKam/selectkamInDashboard";
import dayjs from "dayjs";
import MainPageLayoutWithBackSV from "../../../global/templates/mainPageLayoutWithBackSV";
import { CorpNameContext } from "../../../global/context/usercontext";

const SalesVisitDashboard = () => {
  const { corpName, setCorpName } = useContext(CorpNameContext);
  const navigate = useNavigate();
  const initialLoad = useRef(true);
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
      : dayjs().subtract(2, "month").format("YYYY-MM-DD");
    const _toDate = _storedData?.toDate
      ? dayjs(_storedData?.toDate).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD");
    const _userId = _storedData?.userId || "";
    const _selectedUserName = _storedData?.selectedUserName || "";
    const _selectedLocation = _storedData?.selectedLocation || "";
    const _selectedPriority = _storedData?.selectedPriority || "";
    const _selectedColor = _storedData?.selectedColor || "";
    setFromDate(_fromDate);
    setToDate(_toDate);
    setUserId(_userId);
    setSelectedUserName(_selectedUserName);
    setselectedLocation(_selectedLocation);
    setSelectedPriority(_selectedPriority);
    setSelectedColor(_selectedColor);
    if (initialLoad.current) {
      fetchData(
        _userId,
        _selectedUserName,
        _fromDate,
        _toDate,
        _selectedPriority,
        _selectedLocation,
        _selectedColor
      );
      initialLoad.current = false;
    }
  }, []);

  const fetchData = async (
    _userId,
    _selectedUserName,
    _fromDate,
    _toDate,
    _selectedPriority,
    _selectedLocation,
    _selectedColor
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
          (_selectedPriority ? item.priority === _selectedPriority : true) &&
          (_selectedLocation ? item.location === _selectedLocation : true) &&
          (_selectedUserName
            ? Object?.keys(item?.mapOfUserAndVisitsCount || {}).includes(
                _selectedUserName
              )
            : true) &&
          (_selectedColor
            ? getColorOfNextVisitDate(item.nextVisitDate) === _selectedColor
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

  const [fromDate, setFromDate] = useState(
    dayjs().subtract(2, "month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));

  const [companyList, setCompanyList] = useState([]);
  const [companyListStatic, setCompanyListStatic] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedLocation, setselectedLocation] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCompanyList(
      companyListStatic.filter((item) => {
        return (
          (selectedPriority ? item.priority === selectedPriority : true) &&
          (selectedLocation ? item.location === selectedLocation : true) &&
          (selectedUserName
            ? Object.keys(item?.mapOfUserAndVisitsCount || {})?.includes(
                selectedUserName
              )
            : true) &&
          (selectedColor
            ? getColorOfNextVisitDate(item.nextVisitDate) === selectedColor
            : true)
        );
      })
    );
  }, [
    companyListStatic,
    userId,
    selectedUserName,
    selectedPriority,
    selectedLocation,
    selectedColor,
  ]);

  useEffect(() => {
    if (!initialLoad.current) {
      fetchData(
        userId,
        selectedUserName,
        fromDate,
        toDate,
        selectedPriority,
        selectedLocation
      );
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    const filtersData = {
      fromDate,
      toDate,
      userId,
      selectedUserName,
      selectedPriority,
      selectedLocation,
      selectedColor,
    };
    localStorage.setItem(
      "SAVE_FILTERS__SALES_VISIT_DASHBOARD",
      JSON.stringify(filtersData)
    );
  }, [
    fromDate,
    toDate,
    userId,
    selectedUserName,
    selectedLocation,
    selectedPriority,
    selectedColor,
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setCorpName("");
  }, [corpName]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fragment>
      <MainPageLayoutWithBackSV
        title="Dashboard"
        onDownloadClick={() =>
          fetchMisData(
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
              selectedUserName={selectedUserName}
              setUserId={setUserId}
            />
          </Grid>
          <Grid item xs={4} lg={2}>
            <CustomAutocomplete
              options={["P0", "P1", "P2", "P3", "P4"]}
              placeholder="Priority"
              label="Priority"
              getOptionLabel={(option) => option}
              value={selectedPriority}
              onChange={(event, newValue, reason) => {
                setSelectedPriority(newValue);
                if (reason === "clear") {
                  setSelectedPriority("");
                }
              }}
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
            <CustomAutocomplete
              options={["green", "orange", "red"]}
              placeholder="Colour Code"
              label="Colour Code"
              getOptionLabel={(option) => option}
              value={selectedColor}
              onChange={(event, newValue, reason) => {
                setSelectedColor(newValue);
                if (reason === "clear") {
                  setSelectedColor("");
                }
              }}
              renderOption={(props, option) => (
                <Box
                  {...props}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      color: option,
                    }}
                  >
                    {option === "green"
                      ? `Green (>= 3 Days)`
                      : option === "orange"
                      ? `Orange (<=2 Days)`
                      : `Red (Late)`}
                  </Typography>
                </Box>
              )}
            />
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
