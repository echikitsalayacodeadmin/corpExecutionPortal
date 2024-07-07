import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import RaiseHealthAwarenessTicket from "./healthAwareness/raiseHealthAwarenessTicket";
import RaiseTechInternalTicket from "./techInternal/raiseTechInternalTicket";
import RaiseSalesOpsTicket from "./salesOps/raiseSalesOpsTicket";
import RaiseOpsTechTicket from "./opsTech/raiseOpsTechTicket";
import RaiseServiceIssueTicket from "./serviceIssue/raiseServiceIssueTicket";
import RaiseNewServiceTicket from "./newService/raiseNewServiceTicket";
import RaiseEmergencyTicket from "./emergency/raiseEmergencyTicket";
import RaisePreemploymentTicket from "./preemployment/raisePreemploymentTicket";
import RaiseDefaultTicket from "./defaultTicket/raiseDefaultTicket";

const RaiseTicketMainComp = ({
  formValues,
  setFormValues,
  selectedTicketType,
  formData,
  companyList,
  sessionTypeList,
}) => {
  return (
    <Fragment>
      <Box>
        {selectedTicketType?.ticketType === "HEALTH_AWARENESS" ? (
          <RaiseHealthAwarenessTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
            sessionTypeList={sessionTypeList}
          />
        ) : selectedTicketType?.ticketType === "SALES_OPS" ? (
          <RaiseSalesOpsTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
          />
        ) : selectedTicketType?.ticketType === "OPS_TECH" ? (
          <RaiseOpsTechTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
          />
        ) : selectedTicketType?.ticketType === "TECH_INTERNAL" ? (
          <RaiseTechInternalTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
          />
        ) : selectedTicketType?.ticketType === "SERVICE_ISSUE" ? (
          <RaiseServiceIssueTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
          />
        ) : selectedTicketType?.ticketType === "NEW_SERVICE_INQUIRY" ? (
          <RaiseNewServiceTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
          />
        ) : selectedTicketType?.ticketType === "EMERGENCY" ? (
          <RaiseEmergencyTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
          />
        ) : selectedTicketType?.ticketType === "PRE_EMPLOYMENT" ? (
          <RaisePreemploymentTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
          />
        ) : (
          <RaiseDefaultTicket
            formValues={formValues}
            setFormValues={setFormValues}
            formData={formData}
            companyList={companyList}
          />
        )}
      </Box>
    </Fragment>
  );
};

export default RaiseTicketMainComp;
