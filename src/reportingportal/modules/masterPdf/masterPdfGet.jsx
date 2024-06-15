import React, { Fragment, useEffect, useState } from "react";
import { getData, saveData } from "../../assets/reportingServices";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Paper,
  Portal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { BASE_URL } from "../../../assets/constants";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";
import { sortDataByDateTime } from "../../../assets/utils";
import { useSnackbar } from "notistack";
import CustomButtonWhite from "../../../assets/customButtonWhite";
import CloseIcon from "@mui/icons-material/Close";
import CustomButtonBlue from "../../../assets/customButtonBlue";

const MasterPdfGet = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [summaryPdf, setSummaryPdf] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [reportList, setReportList] = useState([]);
  const [openReportList, setOpenReportList] = useState(false);
  const handleOpenReportList = () => {
    setOpenReportList(true);
  };
  const handleCloseReportList = () => {
    setOpenReportList(false);
  };

  const [openMarkStatus, setOpenMarkStatus] = useState(false);
  const [selectedPdfId, setSelectedPdfId] = useState("");
  const handleCloseMarkStatus = () => {
    setOpenMarkStatus(false);
  };

  const columns = [
    {
      field: "markCompleted",
      headerName: "Mark Completed",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        console.log({ id: params });
        return (
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              p: "3px",
              borderRadius: "3px",
              m: 0,
            }}
            onClick={() => {
              setOpenMarkStatus(true);
              setSelectedPdfId(params?.row?.id);
            }}
          >
            <Typography
              sx={{ fontSize: "12px", color: "#FFF", fontWeight: "400" }}
            >
              Mark Complete
            </Typography>
          </Button>
        );
      },
    },
    { field: "isCompleted", headerName: "Is Completed", width: 140 },
    { field: "isAnchorSequence", headerName: "Is Anchor Sequence", width: 140 },
    { field: "date", headerName: "Date", width: 140 },
    { field: "time", headerName: "Time", width: 140 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "reportName",
      headerName: "Report Name",
      width: 270,
      renderCell: (params) => {
        const isClickable = params?.value && params?.row?.reportURL;
        return (
          <Typography
            sx={{
              fontSize: "14px",
              cursor: isClickable ? "pointer" : "auto",
              color: isClickable ? "#127DDD" : null,
            }}
            onClick={() => {
              if (params?.row?.reportURL !== null) {
                window.open(params?.row?.reportURL, "_blank");
              }
            }}
          >
            {params?.value}
          </Typography>
        );
      },
    },
    {
      field: "empIds",
      headerName: "Employee Ids",
      width: 140,
      renderCell: (params) => <RenderExpandableCells {...params} />,
    },
    {
      field: "empIdsCount",
      headerName: "Employee Ids Count",
      width: 200,
    },
    {
      field: "masterPdfSummary",
      headerName: "Master Pdf Summary",
      width: 170,
      renderCell: (params) => (
        <div>
          {params?.value && Object.keys(params?.value).length > 0 && (
            <Button
              onClick={() => {
                handleClickOpen(params.value);
                setSummaryPdf(params.value);
              }}
            >
              View
            </Button>
          )}
        </div>
      ),
    },
    {
      field: "fileTypeList",
      headerName: "File Type List",
      width: 1300,
      renderCell: (params) => {
        console.log({ LISTOFREPORTS: params.value, row: params.row });
        return (
          <div>
            {params?.value && params?.value?.length > 0 && (
              <Button
                onClick={() => {
                  handleOpenReportList();
                  setReportList(params?.value);
                }}
              >
                Total Report File: {params?.value?.length}
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const [masterPdfList, setMasterPdfList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMasterPdfList = async () => {
    setIsLoading(true);
    const url = BASE_URL + `org/reporting/masterPdf?corpId=${corpId}`;
    const response = await getData(url);
    if (response.data) {
      setIsLoading(false);
      console.log({ SUCCESS: response.data });
      let temp = response?.data?.map((item, index) => ({
        ...item,
        // id: index + 1,
        index: index + 1,
      }));
      setMasterPdfList(sortDataByDateTime(temp));
    } else {
      setIsLoading(false);
      console.log({ ERROR: response.error });
      setMasterPdfList([]);
    }
  };

  useEffect(() => {
    fetchMasterPdfList();
  }, [openMarkStatus]);

  const [isCompleted, setIsCompleted] = useState("");

  const handleChange = (event) => {
    setIsCompleted(event.target.value);
  };

  const handleMarkPDFComplete = async (boolean) => {
    setIsLoading(true);
    const url =
      BASE_URL +
      `org/reporting/masterPdf/status?id=${selectedPdfId}&isCompleted=${boolean}`;
    const response = await saveData(url);
    if (response.data) {
      setIsLoading(false);
      console.log({ SUCCESS: response.data });
      enqueueSnackbar("Successfully Marked", {
        variant: "success",
      });

      handleCloseMarkStatus();
    } else {
      setIsLoading(false);
      console.log({ ERROR: response.error });
      enqueueSnackbar(result?.error?.response?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <Paper
          sx={{
            borderRadius: 5,
            paddingInline: 3,
            boxShadow: 3,
            height: "78vh",
            paddingBlock: "10px",
          }}
        >
          <IconButton onClick={fetchMasterPdfList}>
            <RefreshIcon />
          </IconButton>
          <CustomDataGridLayout
            columns={columns}
            rows={masterPdfList}
            rowHeight={30}
            getRowId={(row) => row?.id}
            disableSelectionOnClick={true}
            disableRowSelectionOnClick={true}
          />
        </Paper>
      </Box>
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={() => handleClose()}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(187, 187, 187, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              padding: "15px",
              width: "365px",
              minHeight: "120px",
            }}
          >
            <Typography variant="h6">Master PDF Summary</Typography>
            <Box>
              {summaryPdf !== null &&
                Object.entries(summaryPdf).map(([key, value], index) => (
                  <Typography sx={{ fontSize: "15px" }} key={key}>
                    {index + 1 + ") "}
                    {/* {"=> "} */}
                    {key?.replace(/([A-Z])/g, " $1")?.toUpperCase()}: {value}
                  </Typography>
                ))}
            </Box>
          </Box>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openReportList}
          onClose={() => handleCloseReportList()}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(187, 187, 187, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              padding: "15px",
              width: "365px",
              minHeight: "120px",
            }}
          >
            <Typography variant="h6">LIST OF REPORTS</Typography>
            <Box>
              {reportList.map((item, index) => (
                <Typography sx={{ fontSize: "15px" }} key={index}>{`${
                  index + 1
                }) ${item}`}</Typography>
              ))}
            </Box>
          </Box>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openMarkStatus}
          onClose={() => handleCloseMarkStatus()}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(187, 187, 187, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              padding: "15px",
              width: "325px",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => handleCloseMarkStatus()}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "15px",
                color: "#000000",
                marginTop: "-25px",
                marginBottom: "10px",
              }}
            >
              Mark PDF Status Completed Or Not
            </Typography>

            <Grid
              container
              sx={{ justifyContent: "space-between" }}
              spacing={2}
            >
              <Grid item xs={12} lg={12}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={isCompleted}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Completed"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="Not Completed"
                  />
                </RadioGroup>
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CustomButtonBlue
                  disabled={isCompleted === "" ? true : false}
                  onClick={() =>
                    handleMarkPDFComplete(
                      isCompleted === "Yes"
                        ? true
                        : isCompleted === "No"
                        ? false
                        : ""
                    )
                  }
                  title={"Mark"}
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default MasterPdfGet;
