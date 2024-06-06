import { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/reportingServices";
import { Box } from "@mui/material";
import RegistrationFailedDatagrid from "./comps/registrationFailedDatagrid";

const FailedToRegisteredEmployee = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
  rows,
}) => {
  console.log({ rows });
  const [employeeList, setEmployeeList] = useState([]);
  const getEmployeeList = async () => {
    const url = BASE_URL + `org/all?corpId=${corpId}`;

    const response = await getData(url);

    if (response.error) {
      console.log({ error: response.error });
      setEmployeeList([]);
    } else {
      console.log({ success: response.data });
      setEmployeeList(response.data);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  return (
    <Fragment>
      <Box>
        <RegistrationFailedDatagrid rows={rows} />
      </Box>
    </Fragment>
  );
};

export default FailedToRegisteredEmployee;
