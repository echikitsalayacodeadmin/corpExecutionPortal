import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";

const CompanyVisitDetails = ({ data, onlyView = false }) => {
  const navigate = useNavigate();
  const [showSalesVisit, setShowSalesVisit] = useState(false);
  const handleDownload = (url) => {
    if (url !== "" || url !== null || url !== undefined) {
      window.open(url, "_blank");
    }
  };
  return (
    <Fragment>
      <Box sx={{ marginBlock: 2 }}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                minWidth: "300px",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  height: "40px",
                  minWidth: "150px",
                  border: "1px solid #000",
                  borderRadius: "15px",
                  backgroundColor: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                <Typography>Sales Visits</Typography>
              </Box>
              <IconButton
                sx={{
                  height: "40px",
                  marginRight: "15px",
                  backgroundColor: "#127DDD",
                  ":hover": {
                    backgroundColor: "#1f63a1",
                  },
                }}
                onClick={() => {
                  setShowSalesVisit(!showSalesVisit);
                }}
              >
                {showSalesVisit === false ? (
                  <ExpandMoreIcon style={{ color: "#FFF" }} />
                ) : (
                  <ExpandLessIcon style={{ color: "#FFF" }} />
                )}
              </IconButton>
              {onlyView === true ? null : (
                <CustomButtonBlue
                  title="Add New Visit"
                  onClick={() => {
                    navigate(`/corp/addnewvisit/${data.corpSalesId}`);
                  }}
                  styles={{ width: "150px", height: "40px" }}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        {showSalesVisit &&
          data?.corpSalesVisitEntities?.length > 0 &&
          data?.corpSalesVisitEntities?.map((item, index) => (
            <Grid
              key={index}
              container
              sx={{
                boxSizing: "border-box",
                background: "#FFFFFF",
                border: "0.5px solid #A6A6A6",
                borderRadius: 5,
                padding: 1,
                marginBlock: 2,
                alignItems: "center",
              }}
            >
              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography sx={styles.heading}>Interested -</Typography>
                <Typography sx={styles.data}>
                  {item?.interested === true
                    ? "Yes"
                    : item?.interested === false
                    ? "No"
                    : ""}
                </Typography>
              </Grid>

              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography sx={styles.heading}>
                  Another Visit Required -
                </Typography>
                <Typography sx={styles.data}>
                  {item?.anotherVisitRequired === true
                    ? "Yes"
                    : item?.anotherVisitRequired === false
                    ? "No"
                    : null}
                </Typography>
              </Grid>
              {/* )} */}

              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography sx={styles.heading}>Visit Type -</Typography>
                <Typography sx={styles.data}>
                  {item?.visitType?.replace(/_/g, " ")}
                </Typography>
              </Grid>

              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography sx={styles.heading}>Last Visit Date -</Typography>
                <Typography sx={styles.data}>{item?.visitDate}</Typography>
              </Grid>

              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography sx={styles.heading}>Next Visit Date -</Typography>
                <Typography sx={styles.data}>{item?.nextVisitDate}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                <Typography sx={styles.heading}>Remark:</Typography>
                <Typography sx={styles.data}>
                  {item?.interestedRemark}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}
              >
                <CustomButtonBlue
                  startIcon={<DownloadIcon />}
                  disabled={item?.photoUrl ? false : true}
                  title="Photo"
                  onClick={() => {
                    handleDownload(item?.photoUrl);
                  }}
                />
              </Grid>
            </Grid>
          ))}
      </Box>
    </Fragment>
  );
};

const styles = {
  heading: {
    color: "#6B6B6B",
    fontWeight: "bold",
    marginRight: "10px",
  },
  data: {
    color: "#127DDD",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
};

export default CompanyVisitDetails;
