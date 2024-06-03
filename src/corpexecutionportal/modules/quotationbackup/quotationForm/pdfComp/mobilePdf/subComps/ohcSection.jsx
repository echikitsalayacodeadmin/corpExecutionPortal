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

const OhcSection = ({ data }) => {
  return (
    <Box style={{ marginVertical: "10px" }}>
      <Box style={{ marginVertical: "10px" }}>
        <Typography style={{ fontSize: "15px", whiteSpace: "pre-line" }}>
          {data?.ohcVM?.details}
        </Typography>
      </Box>
      {data?.ohcVM?.ohcTableUrl === "" || data?.ohcVM?.ohcTableUrl === null ? (
        <Box style={{ border: "1px solid #DDD" }}>
          <Box style={{ padding: "3px", borderBottom: "1px solid #DDD" }}>
            <Typography
              style={{
                fontSize: "15px",
                textAlign: "center",
                color: "#0000FF",
              }}
            >
              {data?.ohcVM?.title || ""}
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              borderBottom: "1px solid #DDD",
              backgroundColor: "#4682E6",
            }}
          >
            <Box
              style={{
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
              style={{
                width: "30%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Package Name</CustomTextTableHeader>
            </Box>
            <Box
              style={{
                width: "30%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Description</CustomTextTableHeader>
            </Box>
            <Box
              style={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>No Of Staff</CustomTextTableHeader>
            </Box>
            <Box
              style={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Cost Per Month</CustomTextTableHeader>
            </Box>
            <Box
              style={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Total Cost / Month</CustomTextTableHeader>
            </Box>
          </Box>
          {data?.ohcVM?.ohcCategoryVMS?.map((category, rowIndex) => (
            <Box key={rowIndex}>
              <Box
                style={{
                  width: "100%",
                  padding: "3px",
                  borderBottom: "1px solid #DDD",
                  backgroundColor: "#FFF2CC",
                }}
              >
                <Typography
                  style={{
                    fontSize: "11px",
                    textAlign: "center",
                    color: "#000000",
                    fontWeight: "bold",
                  }}
                >
                  {category?.categoryTitle}
                </Typography>
              </Box>
              {category?.ohcPackageVMS?.map((pack, index) => (
                <Box key={index}>
                  <Box
                    style={{
                      width: "100%",
                      padding: "3px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottom: "1px solid #DDD",
                      backgroundColor: "#CFE3E0",
                    }}
                  >
                    <Typography
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      {pack?.packageTitle}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      borderBottom: "1px solid #DDD",
                    }}
                  >
                    <Box
                      style={{
                        width: "10%",
                        padding: "3px",
                        borderRight: "1px solid #DDD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: "30%",
                        padding: "3px",
                        borderRight: "1px solid #DDD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {pack?.packageName}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: "30%",
                        padding: "3px",
                        borderRight: "1px solid #DDD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {pack?.packageDescription}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: "10%",
                        padding: "3px",
                        borderRight: "1px solid #DDD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {pack?.noOfStaff}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: "10%",
                        padding: "3px",
                        borderRight: "1px solid #DDD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {pack?.perMonthCost}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: "10%",
                        padding: "3px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {pack?.totalCostPerMonth}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
          <Box style={{ padding: "3px" }}>
            <Typography
              style={{
                fontSize: "15px",
                color: "red",
                whiteSpace: "pre-line",
              }}
            >
              {data?.ohcVM?.disclaimer || ""}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          {data?.ohcVM?.ohcTableUrl && (
            <img style={{ width: "100%" }} src={data?.ohcVM?.ohcTableUrl} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default OhcSection;
