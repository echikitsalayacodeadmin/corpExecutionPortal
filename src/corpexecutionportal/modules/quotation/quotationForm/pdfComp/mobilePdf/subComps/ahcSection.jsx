import { Box, Typography } from "@mui/material";

import React from "react";

const CustomTextTableHeader = ({ children, sx }) => {
  return (
    <Typography
      sx={{
        fontSize: "15px",
        color: "#FFFFFF",
        fontWeight: "bold",
      }}
    >
      {children}
    </Typography>
  );
};

const tableHeader = [
  {
    columnName: "S.No",
  },
  {
    columnName: "Package Name",
  },
  {
    columnName: "Test List",
  },
  {
    columnName: "#Emp",
  },
  {
    columnName: "Price Per Employee",
  },
  {
    columnName: "Total Cost",
  },
];

const AhcSection = ({ data }) => {
  return (
    <Box sx={{ marginVertical: "10px" }}>
      <Box>
        <Typography sx={{ fontSize: "15px", whiteSpace: "pre-line" }}>
          {
            data?.quotationTableDataVMS?.filter(
              (quote) => quote?.quotationDataType === "AHC"
            )[0]?.details
          }
        </Typography>
      </Box>
      <br />
      {data?.quotationTableDataVMS?.filter(
        (quote) => quote?.quotationDataType === "AHC"
      )[0]?.tableUrl === "" ||
      data?.quotationTableDataVMS?.filter(
        (quote) => quote?.quotationDataType === "AHC"
      )[0]?.tableUrl === null ? (
        <Box sx={{ border: "1px solid #DDD" }}>
          <Box sx={{ padding: "3px", borderBottom: "1px solid #DDD" }}>
            <Typography
              sx={{
                fontSize: "15px",
                textAlign: "center",
                color: "#0000FF",
              }}
            >
              {data?.quotationTableDataVMS?.filter(
                (quote) => quote?.quotationDataType === "AHC"
              )[0]?.tableTitle || ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #DDD",
              backgroundColor: "#4682E6",
            }}
          >
            <Box
              sx={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Sno</CustomTextTableHeader>
            </Box>
            <Box
              sx={{
                width: "25%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Package</CustomTextTableHeader>
            </Box>
            <Box
              sx={{
                width: "35%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Test List</CustomTextTableHeader>
            </Box>
            <Box
              sx={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>No Of Emp</CustomTextTableHeader>
            </Box>
            <Box
              sx={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Cost Per Emp</CustomTextTableHeader>
            </Box>
            <Box
              sx={{
                width: "10%",
                padding: "3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Total Cost</CustomTextTableHeader>
            </Box>
          </Box>

          {data.quotationTableDataVMS
            ?.filter((quote) => quote.quotationDataType === "AHC")[0]
            ?.quotationDataVMS?.map((row, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{ display: "flex", borderBottom: "1px solid #DDD" }}
              >
                <Box
                  sx={{
                    width: "10%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "15px" }}>
                    {rowIndex + 1}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "25%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {row.packageName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "35%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {row?.testList?.map((test, index) => (
                    <Box>
                      <Typography
                        key={index}
                        sx={{
                          fontSize: "15px",
                          marginVertical: "2px",
                          textAlign: "center",
                        }}
                      >
                        {test.testName}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "15px" }}>
                    {row.noOfEmp}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "15px" }}>
                    {row.pricePerEmp}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    padding: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "15px" }}>
                    {row.finalPrice}
                  </Typography>
                </Box>
              </Box>
            ))}
          <Box
            sx={{
              borderBottom: "1px solid #DDD",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Total Cost
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              {data.quotationTableDataVMS?.filter(
                (quote) => quote.quotationDataType === "AHC"
              )[0]?.quotationDataVMS.length > 0
                ? `Rs ${
                    data.quotationTableDataVMS
                      ?.filter((quote) => quote.quotationDataType === "AHC")[0]
                      ?.quotationDataVMS?.reduce(
                        (total, item) => total + item.finalPrice,
                        0
                      ) || ""
                  }`
                : null}
            </Typography>
          </Box>
          <Box sx={{ padding: "10px" }}>
            <Typography
              sx={{
                fontSize: "15px",
                whiteSpace: "pre-line",
              }}
            >
              {data?.quotationTableDataVMS?.filter(
                (quote) => quote.quotationDataType === "AHC"
              )[0]?.disclaimer || ""}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          {data?.quotationTableDataVMS?.filter(
            (quote) => quote?.quotationDataType === "AHC"
          )[0]?.tableUrl && (
            <img
              sx={{ width: "100%" }}
              src={
                data?.quotationTableDataVMS?.filter(
                  (quote) => quote?.quotationDataType === "AHC"
                )[0]?.tableUrl
              }
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default AhcSection;
