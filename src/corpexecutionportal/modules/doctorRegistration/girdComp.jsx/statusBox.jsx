import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Fragment } from "react";
import TimeClock from "../../../../assets/images/doctorRegistration/TimeClock.png";
import OrangeClock from "../../../../assets/images/doctorRegistration/OrangeClock.png";
import BlueClock from "../../../../assets/images/doctorRegistration/BlueClock.png";
import RedClock from "../../../../assets/images/doctorRegistration/RedClock.png";
import LocationIcon from "../../../../assets/images/doctorRegistration/LocationIcon.png";
import LocationOrangeIcon from "../../../../assets/images/doctorRegistration/LocationOrangeIcon.png";
import LocationBlueIcon from "../../../../assets/images/doctorRegistration/LocationBlueIcon.png";
import LocationRedIcon from "../../../../assets/images/doctorRegistration/LocationRedIcon.png";
import PatientIcon from "../../../../assets/images/doctorRegistration/PatientIcon.png";
import PatientBlueIcon from "../../../../assets/images/doctorRegistration/PatientBlueIcon.png";
import PatientRedIcon from "../../../../assets/images/doctorRegistration/PatientRedIcon.png";
import PatientOrangeIcon from "../../../../assets/images/doctorRegistration/PatientOrangeIcon.png";

const StatusBox = ({ title }) => {
  return (
    <Fragment>
      {title.appointmentStatus === "LIVE" ? (
        <Box
          sx={{
            backgroundColor: "#D6FFD6",
            border: "0.5px solid #20945C",
            borderRadius: "5px",
            padding: "8px",
            marginBlock: "5px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={LocationIcon}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#20945C",
                }}
              >
                {title.clinicName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={TimeClock}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#20945C",
                }}
              >
                {title.time}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={PatientIcon}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#20945C",
                }}
              >
                {title.patientId}, {title.patientName}
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  backgroundColor: "#20945C",
                  borderRadius: "5px",
                  width: "80px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "13px",
                    lineHeight: "15px",
                    color: "#FFFFFF",
                    textAlign: "center",
                    paddingBlock: "2px",
                  }}
                >
                  Live
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
      {title.appointmentStatus === "UPCOMING" ? (
        <Box
          sx={{
            backgroundColor: "#FFF5DF",
            border: "0.5px solid #EDA600",
            borderRadius: "5px",
            padding: "8px",
            marginBlock: "5px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={LocationOrangeIcon}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#AB6700",
                }}
              >
                {title.clinicName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={OrangeClock}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#AB6700",
                }}
              >
                {title.time}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={PatientOrangeIcon}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#AB6700",
                }}
              >
                {title.patientId}, {title.patientName}
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#EDA600",
                borderRadius: "5px",
                width: "80px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "13px",
                  lineHeight: "15px",
                  color: "#FFFFFF",
                  textAlign: "center",
                  paddingBlock: "2px",
                }}
              >
                Upcoming
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
      {title.appointmentStatus === "ATTENDED" ? (
        <Box
          sx={{
            backgroundColor: "#EEF7FF",
            border: "0.5px solid #127DDD",
            borderRadius: "5px",
            padding: "8px",
            marginBlock: "5px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={LocationBlueIcon}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#127DDD",
                }}
              >
                {title.clinicName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={BlueClock}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#127DDD",
                }}
              >
                {title.time}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={PatientBlueIcon}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#127DDD",
                }}
              >
                {title.patientId}, {title.patientName}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#127DDD",
                borderRadius: "5px",
                width: "80px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "13px",
                  lineHeight: "15px",
                  color: "#FFFFFF",
                  paddingBlock: "2px",
                  textAlign: "center",
                }}
              >
                Attended
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
      {title.appointmentStatus === "CANCELLED" ? (
        <Box
          sx={{
            backgroundColor: "#FFE6E6",
            border: "0.5px solid #F80000",
            borderRadius: "5px",
            padding: "8px",
            marginBlock: "5px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={LocationRedIcon}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#F80000",
                }}
              >
                {title.clinicName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={RedClock}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#F80000",
                }}
              >
                {title.time}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={PatientRedIcon}
                width={15}
                height={15}
                style={{ marginRight: "5px" }}
              />
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  textAlign: "left",
                  color: "#F80000",
                }}
              >
                {title.patientId}, {title.patientName}
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#F80000",
                borderRadius: "5px",
                width: "80px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "13px",
                  lineHeight: "15px",
                  color: "#FFFFFF",
                  textAlign: "center",
                  paddingBlock: "2px",
                }}
              >
                Cancelled
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Fragment>
  );
};

export default StatusBox;
