import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import WaitingCardQoutationDashboard from "./comps/waitingCardQoutationDashboard";
import { sortArrayByLastModifiedDate } from "../../../../assets/utils";
import { BASE_URL } from "../../../../assets/constants";
import { getData } from "../../../assets/corpServices";
import CustomAutocomplete from "../../../../assets/customAutocomplete";

const QuotationDashboardNew = () => {
  const [corpList, setCorpList] = useState([]);
  const [selectedCorp, setSelectedCorp] = useState(null);
  const [qouatationList, setQouatationList] = useState([]);

  const fetCorpList = async () => {
    const url = BASE_URL + "corpSales/all";
    const response = await getData(url);
    if (response?.data) {
      setCorpList(response?.data);
    } else {
      setCorpList([]);
    }
  };
  useEffect(() => {
    fetCorpList();
  }, []);

  const fetchQouatationList = async () => {
    const url = BASE_URL + "quotation/previous";
    const response = await getData(url);
    if (response?.data) {
      setQouatationList(sortArrayByLastModifiedDate(response?.data));
    } else {
      setQouatationList([]);
    }
  };
  useEffect(() => {
    fetchQouatationList();
  }, []);

  const [selectedStatus, setSelectedStatus] = useState({
    value: "PENDING_APPROVAL",
  });

  const filteredQuotationList = useMemo(() => {
    return qouatationList?.filter(
      (quotation) =>
        (!selectedCorp || quotation?.corpId === selectedCorp.corpSalesId) &&
        (selectedStatus !== null
          ? quotation.quotationStatus === selectedStatus.value
          : true)
    );
  }, [qouatationList, selectedCorp, selectedStatus]);

  return (
    <Fragment>
      <Box sx={{ marginTop: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <CustomAutocomplete
              options={corpList.filter(
                (item, index, self) =>
                  index === self.findIndex((t) => t.corpName === item.corpName)
              )}
              label="Search Corp"
              placeholder="Search Corp"
              value={selectedCorp}
              required={true}
              asterickColor={"red"}
              getOptionLabel={(corp) => corp?.corpName}
              onChange={(event, newValue, reason) => {
                setSelectedCorp(newValue);
                console.log({ newValue });
                if (reason === "clear") {
                  setSelectedCorp(null);
                }
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <CustomAutocomplete
              options={[
                { value: "PENDING_APPROVAL" },
                { value: "PENDING" },
                { value: "APPROVED" },
                { value: "REJECTED" },
              ]}
              label="Select Status"
              placeholder="Select Status"
              value={selectedStatus}
              getOptionLabel={(option) => option?.value}
              onChange={(event, newValue, reason) => {
                setSelectedStatus(newValue);
                console.log({ newValue });
                if (reason === "clear") {
                  setSelectedStatus(null);
                }
              }}
            />
          </Grid>
        </Grid>

        {filteredQuotationList.length > 0 ? (
          filteredQuotationList.map((item, index) => (
            <WaitingCardQoutationDashboard data={item} key={index} />
          ))
        ) : (
          <Box
            sx={{
              background: "#FFFFFF",
              boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.15)",
              borderRadius: "15px",
              padding: "10px",
              marginY: "10px",
            }}
          >
            <Typography sx={{ color: "#000000", textAlign: "center" }}>
              No Quotation Found
            </Typography>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default QuotationDashboardNew;
