import { Box, Button, Grid, Stack } from "@mui/material";
import { Fragment, useState } from "react";
import TicketNumber from "../../textElements/ticketNumber";
import CreatedBy from "../../textElements/createdBy";
import Company from "../../textElements/company";
import StatusForm from "../../formElements/statusForm";
import { BASE_URL } from "../../../../../assets/constants";
import { updateData } from "../../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import { StatusListNewServiceTicket } from "../../../../assets/corpConstants";
import ServiceName from "../../textElements/serviceName";
import AdditionalDetails from "../../textElements/additionalDetails";
import RemarksForm from "../../formElements/remarksForm";
import PreferredDate from "../../textElements/preferredDate";
import DateForm from "../../formElements/dateForm";
import dayjs from "dayjs";
import TicketType from "../../textElements/ticketType";
import CommonTicketHeader from "../../textElements/commonTicketHeader";

const NewServiceTicket = ({ data }) => {
  const [formValues, setFormValues] = useState({
    status:
      StatusListNewServiceTicket.find(
        (value) => value.value === data?.ticketInfo?.status
      ) || "",

    remarks: data?.ticketInfo?.remarks,
    newDate: data?.ticketInfo?.newDate
      ? dayjs(data?.ticketInfo?.newDate)
      : null,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = BASE_URL + `org/updateTicketStatus`;

    let ticketInfo = data?.ticketInfo;

    if (ticketInfo) {
      ticketInfo["status"] = formValues.status?.value;
      ticketInfo["remarks"] = formValues.remarks;
      ticketInfo["newDate"] = formValues.newDate
        ? dayjs(formValues.newDate).format("YYYY-MM-DD")
        : null;
    } else {
      ticketInfo = {
        status: formValues.status?.value,
        remarks: formValues.remarks,
        newDate: formValues.newDate
          ? dayjs(formValues.newDate).format("YYYY-MM-DD")
          : null,
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
              <ServiceName data={data} />
            </Grid>
            <Grid item lg={4}>
              <DateForm formValues={formValues} setFormValues={setFormValues} />
            </Grid>

            <Grid item lg={4}>
              <AdditionalDetails data={data} />
            </Grid>
            <Grid item lg={4}>
              <PreferredDate data={data} />
            </Grid>

            <Grid item lg={4}>
              <RemarksForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>

            <Grid item lg={4}>
              <StatusForm
                formValues={formValues}
                setFormValues={setFormValues}
                statusList={StatusListNewServiceTicket}
              />
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

export default NewServiceTicket;
