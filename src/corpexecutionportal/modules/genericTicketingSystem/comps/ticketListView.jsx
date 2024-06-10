import { Box, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import TicketCardView from "./ticketCardView";
import { getAllTickets } from "../../../services/genericTicketingSystem";
import dayjs from "dayjs";

const TicketListView = ({
  date = dayjs(),
  userId = localStorage.getItem("USER_ID_CORP_SALES"),
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  status,
  setStatus,
  selectedCompany,
  setSelectedCompany,
  ticketType,
  setTicketType,
  searchText,
  setSearchText,
}) => {
  console.log({
    startDate,
    endDate,
    status,
    selectedCompany,
    ticketType,
    searchText,
  });
  const [ticketList, setTicketList] = useState([]);

  const [filteredTicketList, setFfilteredTicketList] = useState([]);

  useEffect(() => {
    getAllTickets(
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0],
      userId,
      setTicketList,
      setFfilteredTicketList
    );
  }, [startDate, endDate]);

  useEffect(() => {
    setFfilteredTicketList(
      ticketList.filter(
        (value) =>
          (!status.value || status.value === "ALL"
            ? true
            : value.status === status.value) &&
          (!ticketType?.ticketType
            ? true
            : ticketType?.value === ticketType?.ticketType)
      )
    );
  }, [
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    selectedCompany,
    setSelectedCompany,
    ticketType,
    setTicketType,
    searchText,
    setSearchText,
  ]);
  return (
    <Fragment>
      <Box sx={{ maxHeight: 350, overflow: "auto" }}>
        <Grid container spacing={2}>
          {filteredTicketList.map((value, index) => (
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
