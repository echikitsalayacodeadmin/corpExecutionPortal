import { Box } from "@mui/material";
import { Fragment } from "react";
import ViewHealthAwareness from "./healthAwareness/viewHealthAwareness";
import ViewSalesOpsTicket from "./salesOps/viewSalesOpsTicket";
import ViewOpsTechTicket from "./opsTech/viewOpsTechTicket";
import ViewTechInternalTicket from "./techInternal/viewTechInternalTicket";
import ServiceIssueTicket from "./serviceIssue/serviceIssueTicket";
import NewServiceTicket from "./newService/newServiceTicket";
import EmergencyTicket from "./emergency/emergencyTicket";
import PreemploymentTicket from "./preemployment/preemploymentTicket";
import DefaultViewTicket from "./defaultView/defaultViewTicket";

const ViewTicketMainComp = ({ data }) => {
  return (
    <Fragment>
      <Box>
        {data?.ticketType === "HEALTH_AWARENESS" ? (
          <ViewHealthAwareness data={data} />
        ) : data?.ticketType === "SALES_OPS" ? (
          <ViewSalesOpsTicket data={data} />
        ) : data?.ticketType === "OPS_TECH" ? (
          <ViewOpsTechTicket data={data} />
        ) : data?.ticketType === "TECH_INTERNAL" ? (
          <ViewTechInternalTicket data={data} />
        ) : data?.ticketType === "SERVICE_ISSUE" ? (
          <ServiceIssueTicket data={data} />
        ) : data?.ticketType === "NEW_SERVICE_INQUIRY" ? (
          <NewServiceTicket data={data} />
        ) : data?.ticketType === "EMERGENCY" ? (
          <EmergencyTicket data={data} />
        ) : data?.ticketType === "PRE_EMPLOYMENT" ? (
          <PreemploymentTicket data={data} />
        ) : (
          <DefaultViewTicket data={data} />
        )}
      </Box>
    </Fragment>
  );
};

export default ViewTicketMainComp;
