import React, { useState } from "react";
import { Fragment } from "react";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import UserIcon from "../../../../assets/images/doctorRegistration/UserIcon.png";
import ThreedotIcon from "../../../../assets/images/doctorRegistration/ThreedotIcon.png";
import StatusBox from "./statusBox";

const GridComp = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleViewMore = (item) => {
    setSelectedDoctor(item);
    setShowMore(true);
  };
  const handleClose = () => {
    setShowMore(false);
  };
  return (
    <Fragment>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        {data?.map((item, index) => (
          <Grid lg={2.7} xs={12} item key={index}>
            <Grid
              lg={12}
              xs={12}
              item
              sx={{
                width: "100%",

                backgroundColor: "#FFFFFF",
                border: "0.5px solid #D9D9D9",
                borderRadius: "15px",
                padding: "15px",
                maxHeight: "360px",
                marginBlock: "10px",
              }}
            >
              <Box sx={{ minHeight: "255px" }}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Grid item sx={{ display: "flex" }}>
                      <Box
                        component="img"
                        src={UserIcon}
                        width={45}
                        height={45}
                      />
                      <Box sx={{ paddingInline: "15px" }}>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "19px",
                            color: "#383838",
                            marginBottom: "5px",
                          }}
                        >
                          {item.doctorName}
                          {/* Ram Sharma */}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "300",
                            fontSize: "14px",
                            lineHeight: "16px",
                            color: "#383838",
                          }}
                        >
                          {item.specialization}
                          {/* Orthopedist */}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box
                        component="img"
                        src={ThreedotIcon}
                        width={24}
                        height={24}
                        style={{ marginTop: "10px" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: "300",
                      fontSize: "16px",
                      lineHeight: "19px",
                      color: "#777777",
                    }}
                  >
                    Clinics
                  </Typography>
                </Grid>

                {item?.list
                  ?.slice(0, showMore ? item?.list?.length : 3)
                  .map((d, i) => (
                    <StatusBox title={d} key={i} />
                  ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: "15px",
                }}
              >
                <Button
                  onClick={() => handleViewMore(item)}
                  sx={{
                    background: "#FFFFFF",
                    border: "0.5px solid #8A8A8A",
                    borderRadius: "10px",
                    paddingInline: "15px",
                    textTransform: "none",
                    color: "#8A8A8A",
                  }}
                >
                  View More
                </Button>
              </Box>
            </Grid>
            {selectedDoctor && (
              <Modal
                open={showMore}
                onClose={handleClose}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "& .MuiBackdrop-root": {
                    backgroundColor: "rgba(187, 187, 187, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "289px",
                    backgroundColor: "#FFFFFF",
                    border: "0.5px solid #D9D9D9",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <Box
                    sx={{
                      height: "400px",
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    {selectedDoctor?.list?.map((d, i) => (
                      <StatusBox title={d} key={i} />
                    ))}
                  </Box>
                </Box>
              </Modal>
            )}
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default GridComp;
