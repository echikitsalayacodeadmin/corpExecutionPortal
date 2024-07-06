import { Box, Button, Grid, Stack } from "@mui/material";
import { Fragment, useState } from "react";
import TicketNumber from "../../textElements/ticketNumber";
import CreatedBy from "../../textElements/createdBy";
import StatusForm from "../../formElements/statusForm";
import { BASE_URL } from "../../../../../assets/constants";
import { updateData } from "../../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import ProductForm from "../../formElements/productForm";
import {
  backendOwner,
  DevStatusList,
  frontendOwner,
  OverallStatusList,
  productList,
  StatusListOpsTicket,
} from "../../../../assets/corpConstants";
import TaskForm from "../../formElements/taskForm";
import BackendOwnerForm from "../../formElements/backendOwnerForm";
import FrontendOwerForm from "../../formElements/frontendOwerForm";
import BackendStatusForm from "../../formElements/backendStatusForm";
import FrontendStatusForm from "../../formElements/frontendStatusForm";
import OverallStatusForm from "../../formElements/overallStatusForm";
import TargetDateForm from "../../formElements/targetDateForm";
import dayjs from "dayjs";
import Company from "../../textElements/company";
import TicketType from "../../textElements/ticketType";

const ViewTechInternalTicket = ({ data }) => {
  const [formValues, setFormValues] = useState({
    status:
      StatusListOpsTicket.find(
        (value) => value.value === data?.ticketInfo?.status
      ) || "",
    product:
      productList.find((a) => a.value === data?.ticketInfo?.product) || "",
    task: data?.ticketInfo?.task || "",
    frontendOwner:
      frontendOwner.find((a) => a.value === data?.ticketInfo?.frontendOwner) ||
      "",
    backendOwner:
      backendOwner.find((a) => a.value === data?.ticketInfo?.backendOwner) ||
      "",

    backendStatus:
      DevStatusList.find((a) => a.value === data?.ticketInfo?.backendStatus) ||
      "",

    frontendStatus:
      DevStatusList.find((a) => a.value === data?.ticketInfo?.frontendStatus) ||
      "",

    overallStatus:
      OverallStatusList.find(
        (a) => a.value === data?.ticketInfo?.overallStatus
      ) || "",

    targetDate: data?.ticketInfo?.targetDate
      ? dayjs(data?.ticketInfo?.targetDate)
      : null,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = BASE_URL + `org/updateTicketStatus`;

    let ticketInfo = data?.ticketInfo;

    if (ticketInfo) {
      ticketInfo["status"] = formValues.status?.value;
      (ticketInfo["product"] = formValues.product?.value),
        (ticketInfo["task"] = formValues.task),
        (ticketInfo["frontendOwner"] = formValues.frontendOwner?.value),
        (ticketInfo["backendOwner"] = formValues.backendOwner?.value),
        (ticketInfo["backendStatus"] = formValues.backendStatus?.value),
        (ticketInfo["frontendStatus"] = formValues.frontendStatus?.value),
        (ticketInfo["overallStatus"] = formValues.overallStatus?.value),
        (ticketInfo["targetDate"] = formValues.targetDate
          ? dayjs(formValues.targetDate).format("YYYY-MM-DD")
          : null);
    } else {
      ticketInfo = {
        status: formValues.status?.value,
        product: formValues.product?.value,
        task: formValues.task,
        frontendOwner: formValues.frontendOwner?.value,
        backendOwner: formValues.backendOwner?.value,
        backendStatus: formValues.backendStatus?.value,
        frontendStatus: formValues.frontendStatus?.value,
        overallStatus: formValues.overallStatus?.value,
        targetDate: formValues.targetDate
          ? dayjs(formValues.targetDate).format("YYYY-MM-DD")
          : null,
      };
    }
    const payload = {
      ticketId: data?.ticketId,
      ticketInfo: ticketInfo,
      // status: formValues.status?.value,
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
            <Grid item lg={6}>
              <TicketNumber data={data} />
            </Grid>
            <Grid item lg={6}>
              <CreatedBy data={data} />
            </Grid>
            <Grid item lg={6}>
              <TicketType data={data} />
            </Grid>
            <Grid item lg={6} display="flex" alignItems="center">
              <ProductForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>

            <Grid item lg={6} display="flex" alignItems="center">
              <TaskForm formValues={formValues} setFormValues={setFormValues} />
            </Grid>

            <Grid item lg={6} display="flex" alignItems="center">
              <BackendOwnerForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>

            <Grid item lg={6} display="flex" alignItems="center">
              <FrontendOwerForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>
            <Grid item lg={6} display="flex" alignItems="center">
              <TargetDateForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>

            <Grid item lg={6} display="flex" alignItems="center">
              <BackendStatusForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>

            <Grid item lg={6} display="flex" alignItems="center">
              <FrontendStatusForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>

            <Grid item lg={6} display="flex" alignItems="center">
              <OverallStatusForm
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>

            <Grid item lg={6} display="flex" alignItems="center">
              <StatusForm
                formValues={formValues}
                setFormValues={setFormValues}
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

export default ViewTechInternalTicket;
