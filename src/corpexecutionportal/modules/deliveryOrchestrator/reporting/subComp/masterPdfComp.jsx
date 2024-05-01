import React, { Fragment, useState } from "react";
import CustomDataGridLayout from "../../../../../assets/globalDataGridLayout/customDataGridLayout";
import { Box, Button, Modal, Portal, Typography } from "@mui/material";
import RenderExpandableCells from "../../../../../assets/globalDataGridLayout/renderExpandableCells";
import { isMobile } from "react-device-detect";

const MasterPdfComp = ({ masterPdfList = [], isAnchorSequence }) => {
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

  const columns = [
    // { field: "isCompleted", headerName: "Is Completed", width: 140 },
    // { field: "isAnchorSequence", headerName: "Is Anchor Sequence", width: 140 },
    { field: "date", headerName: "Date", width: 110 },
    { field: "time", headerName: "Time", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
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
      width: 160,
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
      width: 100,
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

  return (
    <Fragment>
      {masterPdfList.filter(
        (item) => item?.isAnchorSequence === isAnchorSequence
      )?.length > 0 ? (
        <CustomDataGridLayout
          styles={{
            width: isMobile ? null : "1230px",
            backgroundColor: "#e7f2fb",
            borderRadius: "15px",
            padding: "20px",
          }}
          Gridheight={isMobile ? "70vh" : "40vh"}
          columns={columns}
          rows={masterPdfList.filter(
            (item) => item.isAnchorSequence === isAnchorSequence
          )}
          rowHeight={30}
          getRowId={(row) => row?.id}
          checkboxSelection={false}
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
        />
      ) : (
        <Typography>No Master PDF is generated yet</Typography>
      )}
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
    </Fragment>
  );
};

export default MasterPdfComp;
