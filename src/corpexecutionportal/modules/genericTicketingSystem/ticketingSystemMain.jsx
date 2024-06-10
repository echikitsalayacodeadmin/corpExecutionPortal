import { Box } from "@mui/material";
import { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import TicketingTabs from "./comps/ticketingTabs";

const TicketingSystemMain = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Tickets">
        <TicketingTabs />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default TicketingSystemMain;
