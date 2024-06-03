import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Portal,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { RemoveRedEye } from "@mui/icons-material";
import { BASE_URL } from "../../../../../assets/constants";
import { getData } from "../../../../assets/corpServices";
import { assignColors } from "../../../../../assets/utils";
import ImageIcon from "@mui/icons-material/Image";
import dayjs from "dayjs";

const CompanyVisitDetails = ({ data, onlyView = false }) => {
  const navigate = useNavigate();
  const [showSalesVisit, setShowSalesVisit] = useState(false);
  const handleDownload = (url) => {
    if (url !== "" || url !== null || url !== undefined) {
      window.open(url, "_blank");
    }
  };

  const _storedData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("SAVED_FILTER_VISITS_INFO")) || {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  }, []);

  useEffect(() => {
    const _showSalesVisit = _storedData?.showSalesVisit || false;
    setShowSalesVisit(_showSalesVisit);
  }, []);

  const [visitDetail, setVisitDetail] = useState([]);

  const fetchVisitDetail = async () => {
    if (data?.corpSalesId) {
      const url =
        BASE_URL + `corpSales/corp/visits?corpSalesId=${data?.corpSalesId}`;
      const result = await getData(url);
      if (result.data) {
        const temp = result.data.map((item, index) => ({
          ...item,
          color: "",
        }));
        setVisitDetail(assignColors(temp));
      } else {
        setVisitDetail([]);
      }
    }
  };

  console.log({ visitDetail });

  useEffect(() => {
    fetchVisitDetail();
  }, [data]);

  const [openPhoto, setOpenPhoto] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const savedFilter = {
      showSalesVisit,
    };
    localStorage.setItem(
      "SAVED_FILTER_VISITS_INFO",
      JSON.stringify(savedFilter)
    );
  }, [showSalesVisit]);

  return (
    <Fragment>
      <Box sx={{}}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Box
              onClick={() => {
                setShowSalesVisit(!showSalesVisit);
              }}
              sx={{
                display: "flex",
                minWidth: "300px",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "#F5F5F5",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Visit Information
              </Typography>

              <IconButton
                onClick={() => {
                  setShowSalesVisit(!showSalesVisit);
                }}
              >
                {showSalesVisit === false ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )}
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {showSalesVisit &&
          visitDetail?.length > 0 &&
          visitDetail?.map((item, index) => (
            <Grid
              key={index}
              container
              sx={{
                boxSizing: "border-box",
                background: "#FFFFFF",
                border: "0.5px solid #A6A6A6",
                borderRadius: 5,
                padding: 1,
                marginBlock: 1,
              }}
            >
              <Grid item xs={11} lg={11}>
                <Grid container sx={{ alignItems: "center" }}>
                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <Typography sx={styles.heading}>Visit Type -</Typography>
                    <Typography sx={styles.data}>
                      {item?.visitType?.replace(/_/g, " ")}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <Typography sx={styles.heading}>Visit Date -</Typography>
                    <Typography sx={styles.data}>
                      {item?.visitDate
                        ? dayjs(item?.visitDate).format("DD-MM-YYYY")
                        : ""}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <Typography sx={styles.heading}>
                      Next Visit Date -
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        color: item.color,
                      }}
                    >
                      {item?.nextVisitDate
                        ? dayjs(item?.nextVisitDate).format("DD-MM-YYYY")
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <Typography sx={styles.heading}>Visit By -</Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        color: "#127DDD",
                      }}
                    >
                      {item?.userName}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={12}
                    sx={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <Typography sx={styles.heading}>Key Highlights:</Typography>
                    <Typography sx={styles.data}>
                      {item?.interestedRemark}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} lg={1}>
                <IconButton
                  sx={{
                    backgroundColor: "#127DDD",
                    ":hover": {
                      backgroundColor: "#1f63a1",
                    },
                    ":disabled": {
                      backgroundColor: "lightgray",
                    },
                    p: 0.7,
                  }}
                  disabled={item?.photoUrl ? false : true}
                  onClick={() => {
                    setOpenPhoto(true);
                    setImageUrl(item?.photoUrl);
                  }}
                >
                  <ImageIcon
                    sx={{ color: "#FFFFFF", height: "20px", width: "20px" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          ))}

        <Portal>
          <Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={openPhoto}
            onClose={() => {
              setOpenPhoto(false);
              setImageUrl("");
            }}
          >
            <DialogContent>
              <img src={imageUrl} alt="image" width="100%" />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenPhoto(false);
                  setImageUrl("");
                }}
              >
                Close
              </Button>
              <IconButton
                sx={{
                  backgroundColor: "#127DDD",
                  ":hover": {
                    backgroundColor: "#1f63a1",
                  },
                }}
                onClick={() => {
                  handleDownload(imageUrl);
                }}
              >
                <DownloadIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
            </DialogActions>
          </Dialog>
        </Portal>

        {showSalesVisit && (
          <Box sx={{ marginTop: 2 }}>
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
        )}
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
