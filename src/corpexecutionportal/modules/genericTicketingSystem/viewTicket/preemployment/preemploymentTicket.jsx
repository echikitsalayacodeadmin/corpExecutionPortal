import { Box, Button, Grid, Stack } from "@mui/material";
import { Fragment, useState } from "react";
import TicketNumber from "../../textElements/ticketNumber";
import CreatedBy from "../../textElements/createdBy";
import Company from "../../textElements/company";
import Task from "../../textElements/task";
import TargetDate from "../../textElements/targetDate";
import Attachment from "../../textElements/attachment";
import StatusForm from "../../formElements/statusForm";
import { BASE_URL } from "../../../../../assets/constants";
import { updateData } from "../../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import { StatusListOpsTicket } from "../../../../assets/corpConstants";
import Name from "../../textElements/name";
import EmployeeName from "../../textElements/employeeName";
import Date from "../../textElements/date";
import TestType from "../../textElements/testType";
import Department from "../../textElements/department";
import EmpId from "../../textElements/empId";
import Address from "../../textElements/address";
import EmployeeContactNumber from "../../textElements/employeeContactNumber";
import HRContactNumber from "../../textElements/hrContactNumber";
import PackageName from "../../textElements/packageName";
import TicketType from "../../textElements/ticketType";
import CommonTicketHeader from "../../textElements/commonTicketHeader";

const PreemploymentTicket = ({ data }) => {
  const [formValues, setFormValues] = useState({
    status:
      StatusListOpsTicket.find(
        (value) => value.value === data?.ticketInfo?.status
      ) || "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = BASE_URL + `org/updateTicketStatus`;

    let ticketInfo = data?.ticketInfo;

    if (ticketInfo) {
      ticketInfo["status"] = formValues.status?.value;
    } else {
      ticketInfo = {
        status: formValues.status?.value,
      };
    }
    const payload = {
      ticketId: data?.ticketId,
      ticketInfo: ticketInfo,
      status: formValues.status?.value,
    };
    const res = await updateData(url, payload);
    if (res.error) {
      console.warn({ error: res.error });
      enqueueSnackbar("Failed to update ticket!", {
        variant: "error",
      });
    } else {
      console.log({ success: res.data });
      enqueueSnackbar("Successfully updated ticket.", {
        variant: "success",
      });
    }
  };

  console.log({ formValues });
  return (
    <Fragment>
      <Box>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <CommonTicketHeader data={data} />
            </Grid>

            <Grid item lg={4}>
              <EmpId data={data} />
            </Grid>
            <Grid item lg={4}>
              <EmployeeName data={data} />
            </Grid>
            <Grid item lg={4}>
              <Date data={data} />
            </Grid>
            <Grid item lg={4}>
              <TestType data={data} />
            </Grid>

            <Grid item lg={4}>
              <Department data={data} />
            </Grid>
            <Grid item lg={4}>
              <Address data={data} />
            </Grid>
            <Grid item lg={4}>
              <EmployeeContactNumber data={data} />
            </Grid>

            <Grid item lg={4}>
              <HRContactNumber data={data} />
            </Grid>
            <Grid item lg={4}>
              <PackageName data={data} />
            </Grid>

            <Grid item lg={4}>
              <StatusForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>
            <Grid item lg={12}>
              <Attachment data={data} />
            </Grid>
            <Grid item lg={12} display="flex" justifyContent="center">
              <Stack display="flex" justifyContent="center">
                <Button type="submit" variant="contained" sx={{ width: 200 }}>
                  Save
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fragment>
  );
};

export default PreemploymentTicket;
