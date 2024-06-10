import { Box, Grid } from "@mui/material";
import { Fragment, useState } from "react";
import DashboardFilters from "./comps/dashboardFilters";
import TicketListView from "./comps/ticketListView";
import TicketView from "./comps/ticketView";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const DashboardMain = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [status, setStatus] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <Fragment>
      <Box>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <DashboardFilters
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              status={status}
              setStatus={setStatus}
              ticketType={ticketType}
              setTicketType={setTicketType}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </Grid>
          <Grid item lg={12}>
            <TicketListView />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardMain;
