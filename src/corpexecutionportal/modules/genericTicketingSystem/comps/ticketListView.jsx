import { Box, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import TicketCardView from "./ticketCardView";
import { getAllTickets } from "../../../services/genericTicketingSystem";

const TicketListView = ({
  date = new Date(),
  userId = localStorage.getItem("USER_ID_CORP_SALES"),
}) => {
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    getAllTickets(date.toISOString().split("T")[0], userId, setTicketList);
  }, []);

  return (
    <Fragment>
      <Box sx={{ maxHeight: 350, overflow: "auto" }}>
        <Grid container spacing={2}>
          {ticketList.map((value, index) => (
            <Grid item lg={12} key={index}>
              <TicketCardView ticket={value} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketListView;
