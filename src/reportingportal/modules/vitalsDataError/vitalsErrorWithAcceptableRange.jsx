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
import { Box, Typography } from "@mui/material";
import { formatColumnName } from "../../../assets/utils";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";

const VitalsErrorWithAcceptableRange = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { updateEmployeeList } = useContext(ReportingContext);
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
          tokens: "", // Assuming you'll fill this in later
          vitalsDataError: key, // Displaying each key separately
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

  return (
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <CustomDataGridLayout
          columns={columns}
          rows={transformedData.map((item, index) => ({
            id: index + 1,
            ...item,
          }))}
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
          checkboxSelection={false}
        />
      </Box>
    </Fragment>
  );
};

export default VitalsErrorWithAcceptableRange;
