import { Box } from "@mui/material";
import { Fragment } from "react";
import ViewHealthAwareness from "./healthAwareness/viewHealthAwareness";
import ViewSalesOpsTicket from "./salesOps/viewSalesOpsTicket";
import ViewOpsTechTicket from "./opsTech/viewOpsTechTicket";
import ViewTechInternalTicket from "./techInternal/viewTechInternalTicket";

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
        ) : (
          ""
        )}
      </Box>
    </Fragment>
  );
};

export default ViewTicketMainComp;
