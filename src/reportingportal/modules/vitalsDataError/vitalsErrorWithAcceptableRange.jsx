import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/reportingServices";
import { fetchVitalsDataError } from "../../services/vitalsDataErrorServices";
import { ReportingContext } from "../../global/context/context";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import { Box, Grid, Typography } from "@mui/material";
import { formatColumnName } from "../../../assets/utils";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";
import GlobalDateLayout from "../../../assets/globalDateLayout/globalDateLayout";

const VitalsErrorWithAcceptableRange = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { updateEmployeeList } = useContext(ReportingContext);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [masterData, setMasterData] = useState([]);
  const [bloodData, setBloodData] = useState([]);

  const getTestDetails = async () => {
    const url = BASE_URL + `org/testsconfig`;
    const result = await getData(url);
    if (result.error) {
      console.log(result.error);
    } else {
      const temp = result.data.map((item, index) => ({
        id: index,
        ...item,
        editRow: "editRow",
      }));
      setBloodData(temp);
    }
  };

  useEffect(() => {
    getTestDetails();
  }, []);

  useEffect(() => {
    fetchVitalsDataError(
      corpId,
      setIsLoading,
      setMasterData,
      updateEmployeeList
    );
  }, [corpId]);

  const transformedData = useMemo(() => {
    if (!Array.isArray(masterData) || !Array.isArray(bloodData)) return [];

    const transformed = masterData.flatMap((employee) => {
      const keys = Object.keys(employee.vitalsErrorData);

      return keys.map((key) => {
        const range = bloodData.find((range) => range.testKey === key);
        const acceptableRange = range
          ? `${range.acceptableRangeMin} - ${range.acceptableRangeMax}`
          : "Not available";

        return {
          empId: employee.empId,
          name: employee.name,
          age: employee.age,
          gender: employee.gender,
          vitalsCreatedDate: employee.vitalsCreatedDate,
          token: employee.token, // Assuming you'll fill this in later
          vitalsDataError: `${key} : ${employee.vitalsErrorData[key]}`, // Displaying each key separately
          acceptableRange,
        };
      });
    });

    return transformed;
  }, [masterData, bloodData]);

  console.log({ transformedData });

  const columns = useMemo(() => {
    if (transformedData.length === 0) return [];

    // Assuming all rows have the same keys, take the first row's keys as columns
    const keys = Object.keys(transformedData[0]);

    return keys.map((key) => ({
      field: key,
      headerName: formatColumnName(key),
      width: key === "name" ? 200 : 170,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return key === "vitalsDataError" ? (
          <span>{params.value}</span>
        ) : (
          <RenderExpandableCells {...params} />
        );
      },
    }));
  }, [transformedData]);

  const filteredData = useMemo(() => {
    return transformedData
      .map((item, index) => ({
        id: index + 1,
        ...item,
      }))
      .filter((item) => {
        const vitalsCreatedDate = new Date(item.vitalsCreatedDate);
        if (fromDate && toDate) {
          const withinDateRange =
            vitalsCreatedDate >= new Date(fromDate) &&
            vitalsCreatedDate <= new Date(toDate);

          return withinDateRange;
        } else if (fromDate) {
          // If only fromDate is provided, filter for that specific date
          const withinDateRange =
            vitalsCreatedDate >= new Date(fromDate) &&
            vitalsCreatedDate <= new Date(fromDate); // toDate is same as fromDate

          return withinDateRange;
        } else {
          return true;
        }
      });
  }, [transformedData, fromDate, toDate]);

  return (
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={4}
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <GlobalDateLayout
              initialDate={fromDate}
              setDate={setFromDate}
              label={"From Date"}
              disableFuture={true}
            />
            <GlobalDateLayout
              initialDate={toDate}
              setDate={setToDate}
              label={"To Date"}
              disableFuture={true}
            />
          </Grid>
        </Grid>
        <CustomDataGridLayout
          columns={columns}
          rows={filteredData}
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
          checkboxSelection={false}
        />
      </Box>
    </Fragment>
  );
};

export default VitalsErrorWithAcceptableRange;
