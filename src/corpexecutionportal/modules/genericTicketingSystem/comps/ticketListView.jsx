import { Box, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import TicketCardView from "./ticketCardView";
import { getAllTickets } from "../../../services/genericTicketingSystem";

const TicketListView = ({ date = new Date() }) => {
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    getAllTickets(date.toISOString().split("T")[0], setTicketList);
  }, []);

  return (
    <Fragment>
      <Box sx={{ maxHeight: 560, overflow: "auto" }}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map(
            (value, index) => (
              <Grid item lg={12} key={index}>
                <TicketCardView />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketListView;
