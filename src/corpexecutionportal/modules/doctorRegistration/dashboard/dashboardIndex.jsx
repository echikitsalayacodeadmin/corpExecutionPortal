import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GridComps from "../girdComp.jsx/GridComp";
import { useEffect } from "react";
import { useState } from "react";
import SearchBar from "../girdComp.jsx/searchBar";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import FilterGrid from "./filterGrid";
import { getData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/lab";

const DashboardIndex = () => {
  const [status, setStatus] = useState([]);
  const [allData, setAllData] = useState([]);
  const [docDetail, setDocDetail] = useState([]);
  const [statusList, setStatusList] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState("");
  const [dateValue, setDateValue] = useState(new Date());

  const fetchBranchList = async (date) => {
    const url = BASE_URL + "admin/doctor/availability?date=" + date;

    const data = await getData(url);

    if (data.error) {
      console.log("error");
    } else {
      console.log("succes");
      const tempStatusList = [];

      Object?.entries(data.data)?.map(([docId, value]) => {
        const filteredList = value?.filter((appointment) => {
          if (statusList === "LIVE & UPCOMING") {
            return (
              appointment.appointmentStatus === "LIVE" ||
              appointment.appointmentStatus === "UPCOMING"
            );
          } else {
            return appointment.appointmentStatus === statusList;
          }
        });
        if (filteredList?.length > 0) {
          tempStatusList.push({
            doctorName: value?.[0].doctorName,
            specialization: value?.[0].specialization,
            list: filteredList,
          });
        }
      });
      setStatus(tempStatusList);

      const tempDocDetail = [];

      Object.entries(data.data).forEach(([docId, value]) => {
        const filteredList = value.filter(
          (appointment) => appointment.docId === selectedDocId
        );
        if (filteredList?.length > 0) {
          tempDocDetail?.push({
            doctorName: value?.[0].doctorName,
            specialization: value?.[0].specialization,
            list: value,
          });
        }
      });
      setDocDetail(tempDocDetail);

      const tempAllData = [];

      Object?.entries(data.data)?.map(([docId, value]) =>
        tempAllData?.push({
          doctorName: value?.[0].doctorName,
          specialization: value?.[0].specialization,
          list: value,
        })
      );

      setAllData(tempAllData);
    }
  };
  console.log({ CLINICDATA: status });
  console.log({ CLINIcDOCLIST: allData });

  const handleChangeStatus = (event) => {
    setStatusList(event.target.value);
    setSelectedDocId("");
  };

  const handleChangeDoctor = (event) => {
    setSelectedDocId(event.target.value);
    setStatusList("");
  };
  console.log(selectedDocId);

  const handleShowAll = () => {
    setSelectedDocId("");
    setStatusList("");
  };

  useEffect(() => {
    fetchBranchList(dateValue.toISOString().split("T")[0]);
  }, [dateValue, statusList, selectedDocId]);

  const fetchAllDoctor = async () => {
    const url = BASE_URL + "doctor/all";

    const data = await getData(url);

    if (data.error) {
      console.log("error");
    } else {
      console.log("succes");
      setDoctorList(data.data);
    }
  };

  console.log({ DOCTORLIST: doctorList });
  console.log({ DOCTORDATAAAA: docDetail });

  useEffect(() => {
    fetchAllDoctor();
  }, []);

  return (
    <Box sx={{ m: 5 }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item lg={5} xs={12}>
          <FilterGrid
            handleShowAll={handleShowAll}
            selectedDocId={selectedDocId}
            handleChangeDoctor={handleChangeDoctor}
            doctorList={doctorList}
            statusList={statusList}
            handleChangeStatus={handleChangeStatus}
          />
        </Grid>
        <Grid
          item
          lg={5}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchBar />
        </Grid>
        <Grid
          item
          lg={2}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                openTo="day"
                views={["year", "month", "day"]}
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <InsertInvitationIcon />
                    </IconButton>
                  ),
                }}
                renderInput={(params) => (
                  <Box
                    sx={{
                      border: "0.5px solid #D4D4D4",
                      borderRadius: "15px",
                      width: "160px",
                      paddingTop: "5px",

                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "none",
                        },
                      " .MuiIconButton-root": {
                        color: "#127DDD",
                      },
                    }}
                  >
                    <TextField
                      {...params}
                      size="small"
                      style={{ borderRadius: "15px" }}
                    />
                  </Box>
                )}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
      {statusList === "" && selectedDocId === "" ? (
        allData.length === 0 ? (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            No data found
          </Typography>
        ) : (
          <GridComps data={allData} />
        )
      ) : null}
      {statusList !== "" && <GridComps data={status} />}

      {statusList === "" && <GridComps data={docDetail} />}
    </Box>
  );
};

export default DashboardIndex;
