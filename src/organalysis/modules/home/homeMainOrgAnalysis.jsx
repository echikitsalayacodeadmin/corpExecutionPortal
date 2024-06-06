import React, { Fragment, useEffect, useMemo, useState } from "react";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { fetchAllConsolidatedReport } from "../../services/homeservices";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import { BASE_URL } from "../../../assets/constants";
import MarkStatusModal from "./subComps/markStatusModal";
import PdfViewerModal from "./subComps/pdfViewerModal";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import ExportAsCSVButton from "../../../assets/exportAsCSVButton";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";

const HomeMainOrgAnalysis = ({
  corpId = localStorage.getItem("CORP_ID_ORG_ANALYSIS"),
}) => {
  const [empData, setEmpData] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  const columns = [
    { field: "empId", headerName: "Emp ID", width: 100 },

    { field: "name", headerName: "Name", width: 200 },
    {
      field: "age",
      headerName: "Age",
      align: "center",
      headerAlign: "center",
      width: 50,
    },
    {
      field: "gender",
      headerName: "Gender",
      align: "center",
      headerAlign: "center",
      width: 70,
    },

    {
      field: "mobile",
      headerName: "Mobile",
      width: 150,
    },
    {
      field: "summaryReportUrl",
      headerName: "Summary Report",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isUrl =
          params?.value !== null &&
          typeof params?.value === "string" &&
          params?.value.match(/^https?:\/\/\S+/);
        return isUrl ? (
          <Button
            onClick={() => {
              handleModal();
              setPdfUrl(params?.value);
            }}
          >
            View File
          </Button>
        ) : (
          <Typography>No File</Typography>
        );
      },
    },
    {
      field: "healthStatusInternal",
      headerName: "Health Status",
      width: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "healthStatusRemarks",
      headerName: "Health Status Remark",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <RenderExpandableCells {...params} />,
    },
    {
      field: "mark Status",
      headerName: "Mark Health Status",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isSummaryReportExist = params.row.summaryReportUrl ? true : false;
        return isSummaryReportExist ? (
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              p: "3px",
              borderRadius: "3px",
              m: 0,
            }}
            onClick={() => {
              handleOpenModal();
              setEmpData(params.row);
            }}
          >
            <Typography
              sx={{ fontSize: "12px", color: "#FFF", fontWeight: "400" }}
            >
              Mark Status
            </Typography>
          </Button>
        ) : null;
      },
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const [searchedEmployee, setSearchedEmployee] = useState(null);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchAllConsolidatedReport(corpId, setIsLoading, setMasterData);
  }, [openModal]);

  const filterHealthStatusValue = [
    { value: "FIT", label: "FIT" },
    { value: "UNFIT", label: "UNFIT" },
  ];
  const [selectedHealthStatus, setSelectedHealthStaus] = React.useState({
    value: "",
    label: "",
  });

  const handleSelectHealthStatus = (event, newValue, reason) => {
    setSelectedHealthStaus(newValue);

    if (reason === "clear") {
      setSelectedHealthStaus({
        value: "",
        label: "",
      });
    }
  };

  const filteredData = useMemo(() => {
    return masterData?.filter(
      (item) =>
        (searchedEmployee !== null
          ? item?.name === searchedEmployee?.name &&
            item?.empId === searchedEmployee?.empId
          : true) &&
        (selectedHealthStatus.value === ""
          ? true
          : item?.healthStatusInternal === selectedHealthStatus?.value)
    );
  }, [masterData, selectedHealthStatus, searchedEmployee]);

  return (
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <Paper
          sx={{
            borderRadius: 5,
            paddingInline: 1,
            boxShadow: 3,
            height: isMobile ? "100%" : "87vh",
            paddingBlock: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <CustomAutocomplete
                options={masterData}
                label="Search Employee"
                placeholder="Search Employee"
                value={searchedEmployee}
                getOptionLabel={(employee) =>
                  employee?.empId + " " + employee?.name
                }
                onChange={(event, newValue, reason) => {
                  setSearchedEmployee(newValue);

                  if (reason === "clear") {
                    setSearchedEmployee(null);
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomAutocomplete
                options={filterHealthStatusValue}
                value={selectedHealthStatus}
                onChange={handleSelectHealthStatus}
                placeholder={"Select Health Status Value"}
                label={"Select Health Status Value"}
              />
            </Grid>
          </Grid>
          <BrowserView>
            <CustomDataGridLayout
              Gridheight={"80vh"}
              hideFooterPagination={false}
              checkboxSelection={false}
              rows={filteredData}
              columns={columns}
              rowHeight={30}
              getRowId={(row) => row?.empId}
              disableSelectionOnClick={true}
              disableRowSelectionOnClick={true}
            />
          </BrowserView>
          <MobileView>
            <Box sx={{ marginTop: 3 }}>
              <ExportAsCSVButton jsonData={filteredData} />
              {filteredData?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: "10px",
                    borderRadius: "15px",
                    backgroundColor: "#FFF",
                    boxShadow: 2,
                    border: "1px solid #000",
                    marginBlock: 2,
                  }}
                >
                  <Grid container>
                    <Grid item xs={7}>
                      <Typography>Emp Id: {item?.empId}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography>Age : {item?.age}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography sx={{ textTransform: "capitalize" }}>
                        Name : {item.name?.toLowerCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ textTransform: "capitalize" }}>
                        Mobile : {item.mobile?.toLowerCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ textTransform: "capitalize" }}>
                        Gender : {item.gender?.toLowerCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        Health Status : {item.healthStatusInternal}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        Remark : {item.healthStatusRemarks}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {item.summaryReportUrl !== null ? (
                        <Button
                          variant="contained"
                          sx={{
                            textTransform: "capitalize",
                            borderRadius: "10px",
                          }}
                          onClick={() => {
                            window.open(item.summaryReportUrl, "_blank");
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#FFF",
                              fontWeight: "400",
                            }}
                          >
                            View File
                          </Typography>
                        </Button>
                      ) : null}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {item.summaryReportUrl !== null ? (
                        <Button
                          variant="contained"
                          sx={{
                            textTransform: "capitalize",
                            borderRadius: "10px",
                          }}
                          onClick={() => {
                            handleOpenModal();
                            setEmpData(item);
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#FFF",
                              fontWeight: "400",
                            }}
                          >
                            Mark Status
                          </Typography>
                        </Button>
                      ) : null}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </MobileView>
        </Paper>
      </Box>

      <MarkStatusModal
        corpId={corpId}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        data={empData}
      />
      <PdfViewerModal pdfUrl={pdfUrl} open={open} handleClose={handleModal} />
    </Fragment>
  );
};

export default HomeMainOrgAnalysis;
