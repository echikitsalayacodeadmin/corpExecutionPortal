import React, { Fragment, useEffect, useMemo, useState } from "react";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import { useParams } from "react-router-dom";
import { getData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import WaitingCardQoutationDashboard from "../../quotation/quotationDashboard/comps/waitingCardQoutationDashboard";
import { Box, Grid, Typography } from "@mui/material";
import { sortArrayByLastModifiedDate } from "../../../../assets/utils";

const QuotationListMain = () => {
  const { itemId } = useParams();
  const query = JSON.parse(decodeURIComponent(itemId));
  const corpId = query?.corpId;
  const serviceName = query.serviceName;
  const [qouatationList, setQouatationList] = useState([]);

  const fetchQouatationList = async () => {
    const url = BASE_URL + "quotation/previous?corpId=" + corpId;
    const response = await getData(url);
    if (response?.data) {
      const temp =
        sortArrayByLastModifiedDate(response?.data).filter((item) =>
          serviceName === "AHC"
            ? item?.quotationTableDataVMS?.[0]?.quotationDataVMS?.length > 0
            : serviceName === "OHC Equipments" || serviceName === "OHC Staff"
            ? item?.ohcVM?.ohcCategoryVMS?.length
            : null
        ) || [];
      setQouatationList(temp);
    } else {
      setQouatationList([]);
    }
  };
  useEffect(() => {
    fetchQouatationList();
  }, [corpId]);

  const [selectedStatus, setSelectedStatus] = useState(null);

  const filteredQuotationList = useMemo(() => {
    return qouatationList?.filter((quotation) =>
      selectedStatus !== null
        ? quotation.quotationStatus === selectedStatus.value
        : true
    );
  }, [qouatationList, selectedStatus]);

  return (
    <Fragment>
      <MainPageLayoutWithBack title={`${serviceName} Quotation List`}>
        <Box sx={{ marginTop: 1 }}>
          <Grid container spacing={1}>
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
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default QuotationListMain;
