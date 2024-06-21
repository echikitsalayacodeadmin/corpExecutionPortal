import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BASE_URL } from "../../../../assets/constants";
import { saveData } from "../../../assets/reportingServices";
import { useSnackbar } from "notistack";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { ReportingContext } from "../../../global/context/context";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { handleRefreshColumns } from "../../../services/refreshColumnHeader";

const GenerateReport = ({
  employeeList,
  corpId,
  totalEmployees,
  originalEmployeeList,
}) => {
  const _storedData = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("SAVED_FILTER_GENERATE_REPORT")) || {}
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  }, []);

  console.log({ _storedData });

  useEffect(() => {
    setDate(
      _storedData.date
        ? new Date(_storedData.date)?.toISOString().split("T")[0]
        : new Date()?.toISOString().split("T")[0]
    );
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const { selectedReportData } = useContext(ReportingContext);

  const [isCheckedSigned, setIsCheckedSigned] = useState(true);

  const handleSignedCheckbox = (event) => {
    setIsCheckedSigned(event.target.checked);
  };
  const [isRemoveDate, setIsRemoveDate] = useState(false);

  const handleRemoveDate = (event) => {
    setIsRemoveDate(event.target.checked);
  };
  const [isPickEmployeeFromSequence, setIsPickEmployeeFromSequence] =
    useState(false);

  const handlePickEmployeeFromSequence = (event) => {
    setIsPickEmployeeFromSequence(event.target.checked);
  };
  const [isForceCreate, setisForceCreate] = useState(false);

  const handleForceCreate = (event) => {
    setisForceCreate(event.target.checked);
  };
  const [useContractorName, setUseContractorName] = useState(false);

  const handleUseContractorName = (event) => {
    setUseContractorName(event.target.checked);
  };

  console.log({ isCheckedSigned });

  const [date, setDate] = useState(new Date()?.toISOString().split("T")[0]);
  const [employeesId, setEmployeesId] = useState("");
  const [employeesIdList, setEmployeesIdList] = useState([]);

  const [selectDoctor, setSelectDoctor] = React.useState(null);

  const handleSelectDoctor = (event, newValue) => {
    setSelectDoctor(newValue);
  };

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateReport = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    setIsLoading(true);
    if (
      employeeList !== "" ||
      employeeList !== undefined ||
      employeesId !== ""
    ) {
      const Obj = {
        corpId: corpId,
        orgEmployeeFileType: selectedReportData.value,
        date: date,
        employeeList: isPickEmployeeFromSequence ? "DB" : "LIST",
        employeesListAsString:
          employeeList !== ""
            ? employeeList
            : employeesId !== ""
            ? employeesId
            : null,
        employeeProcessed: 0,
        problems: ["string"],
        signed: isCheckedSigned,
        forceCreate: isForceCreate,
        removeDate: isRemoveDate,
        campCycleId: campCycleId,
        useContractorName: useContractorName,
      };
      const url = BASE_URL + "org/reporting/uploadSystemGeneratedReports";
      const result = await saveData(url, Obj);
      if (result.error) {
        setIsLoading(false);
        console.log({ ERROR: result.error });
        enqueueSnackbar("An error Occured!", {
          variant: "error",
        });
      } else {
        setIsLoading(false);
        console.log({ SUCCESS: result.data });
        enqueueSnackbar("Successfully Created!", {
          variant: "success",
        });
        setResponse(result.data);
      }
    }
  };

  useEffect(() => {
    const savedFilter = {
      date,
    };
    localStorage.setItem(
      "SAVED_FILTER_GENERATE_REPORT",
      JSON.stringify(savedFilter)
    );
  }, [date]);

  const filteredEmployee = useMemo(() => {
    if (!employeesIdList || employeesIdList.length === 0) {
      return [];
    }
    const filtered = employeesIdList
      .map((empId) =>
        originalEmployeeList.find((employee) => employee?.empId === empId)
      )
      .filter((employee) => employee !== undefined);
    return filtered.length > 0 ? filtered : [];
  }, [employeesIdList, originalEmployeeList]);

  console.log({
    employeesIdList,
    employeesId,
    filteredEmployee,
    totalEmployees,
    employeeList,
  });

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
      <Box>
        <Grid container spacing={1} sx={{ marginTop: "10px" }}>
          <Grid
            item
            lg={4}
            xs={6}
            sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}
          >
            <GlobalDateLayout
              label={"Select Date"}
              setDate={setDate}
              initialDate={date}
              disableFuture={true}
            />
          </Grid>
          <Grid item lg={4} xs={6}>
            <CustomAutocomplete
              placeholder="Search Doctor"
              label={"Select Doctor"}
              value={selectDoctor}
              options={[]}
              onChange={handleSelectDoctor}
            />
          </Grid>

          <Grid item lg={4} xs={6} sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCheckedSigned}
                  onChange={handleSignedCheckbox}
                />
              }
              label="Signed"
            />
            <Box
              sx={{
                padding: "7px",
                borderRadius: "15px",
                border: "1px solid lightgrey",
                marginLeft: "10px",
              }}
            >
              <Typography
                sx={{ textAlign: "center", color: "#000", fontWeight: "400" }}
              >
                Total Selected Employees :{" "}
                {totalEmployees ||
                  employeesIdList.filter((item) => item !== "").length}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4} xs={6} sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPickEmployeeFromSequence}
                  onChange={handlePickEmployeeFromSequence}
                />
              }
              label="Pick Employee From Sequence"
            />
          </Grid>
          <Grid item lg={4} xs={6} sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isForceCreate}
                  onChange={handleForceCreate}
                />
              }
              label="Force Create"
            />
            <FormControlLabel
              control={
                <Checkbox checked={isRemoveDate} onChange={handleRemoveDate} />
              }
              label="Remove Date"
            />
          </Grid>

          <Grid item lg={4} xs={6}>
            <TextField
              multiline
              disabled={
                employeeList === "" || employeeList === undefined ? false : true
              }
              maxRows={5}
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
              label="Enter Employee Ids"
              variant="outlined"
              placeholder="Enter Employee Ids in Comma seperated Values"
              size="small"
              fullWidth
              value={employeesId}
              onChange={(e) => {
                const value = e?.target?.value;
                const uniqueValues = [
                  ...new Set(value.split(",").map((item) => item.trim())),
                ];
                const uniqueValuesString = uniqueValues.join(",");
                setEmployeesId(uniqueValuesString);
                setEmployeesIdList(uniqueValues);
              }}
            />
          </Grid>

          <Grid item lg={4} xs={6} sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useContractorName}
                  onChange={handleUseContractorName}
                />
              }
              label="Use Contractor Name"
            />
          </Grid>

          <Grid item lg={4} xs={12}>
            <CustomButtonBlue
              onClick={() => handleGenerateReport()}
              title="Generate Report"
            />
          </Grid>
        </Grid>

        {response ? (
          <Box
            sx={{
              marginTop: "10px",
              borderRadius: "15px",
              border: "1px solid #000",
              padding: "10px",
              width: "300px",
            }}
          >
            <Typography>Response</Typography>
            <Typography>
              Total Employee Processed : {response?.employeeProcessed}
            </Typography>
            <Typography>
              Signed : {response?.signed ? "True" : "False"}
            </Typography>
          </Box>
        ) : null}

        {filteredEmployee.length > 0 ? (
          <Grid
            container
            sx={{
              marginTop: "10px",
              padding: "5px 0px",
            }}
          >
            <Grid item lg={4} xs={4}>
              <Typography>Employee ID</Typography>
            </Grid>
            <Grid item lg={8} xs={8}>
              <Typography>Employee Name</Typography>
            </Grid>
          </Grid>
        ) : null}
        {filteredEmployee.map((item) => (
          <Box key={item?.empId} sx={{ marginTop: "20px" }}>
            <Grid
              container
              sx={{
                borderBottom: "1px solid #ccc",
                padding: "5px 0px",
              }}
            >
              <Grid item lg={4} xs={4}>
                <Typography>{item?.empId}</Typography>
              </Grid>
              <Grid item lg={8} xs={8}>
                <Typography>{item?.name}</Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Fragment>
  );
};

export default GenerateReport;
