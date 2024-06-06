import { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/reportingServices";
import { Box } from "@mui/material";
import RegistrationDatagrid from "./comps/registrationDatagrid";

const RegisteredEmployees = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
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
        <RegistrationDatagrid rows={employeeList} />
      </Box>
    </Fragment>
  );
};

export default RegisteredEmployees;
