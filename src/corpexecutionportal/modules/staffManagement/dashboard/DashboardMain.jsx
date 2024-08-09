import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import DashboardTableComponent from "../tableComp/DashboardTableComponent";
import { getAttendanceDetailsByDateAndCorpId } from "../services/staffservice";
import dayjs from "dayjs";
import { CustomDate } from "../../../assets/customDate/customDateComps";
import { getCompanyList } from "../../../services/genericTicketingSystem";
import CustomSelectNew from "../../../../assets/customSelectNew";

const DashboardMain = () => {
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [formValues, setFormValues] = useState({
    date: dayjs(),
    company: "",
  });

  useEffect(() => {
    getAttendanceDetailsByDateAndCorpId(
      formValues.company,
      dayjs(formValues.date).format("YYYY-MM-DD"),
      setAttendanceDetails
    );
  }, [formValues]);

  useEffect(() => {
    getCompanyList(setCompanyList);
  }, []);

  console.log({ formValues, companyList, attendanceDetails });

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12} display="flex" justifyContent="center">
            <Typography variant="h6">OHC Staff Attendance Dashboard</Typography>
          </Grid>
          <Grid item lg={2}>
            <CustomDate
              formValues={formValues}
              setFormValues={setFormValues}
              label="Select Date"
              height={46}
            />
          </Grid>
          <Grid item lg={5}>
            <CustomSelectNew
              width={"100%"}
              placeholder="Company filter"
              formValues={formValues}
              setFormValues={setFormValues}
              borderRadius={3.5}
              options={companyList}
              property="company"
              labelProp="orgName"
              valueProp="corpId"
            />
          </Grid>
          <Grid item lg={12}>
            <DashboardTableComponent data={attendanceDetails} />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardMain;
