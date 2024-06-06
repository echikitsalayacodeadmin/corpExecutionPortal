import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCorpKamList,
  fetchKamList,
} from "../../services/assignKamServices";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { updateData } from "../../assets/reportingServices";
import { BASE_URL } from "../../../assets/constants";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";

const AssignKamMain = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [corpKamList, setCorpKamList] = useState([]);
  const [kamList, setKAMList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCorpKamList(setIsLoading, setCorpKamList);
    fetchKamList(setIsLoading, setKAMList);
  }, []);

  const [selectedCorp, setSelectedCorp] = useState(null);
  const [selectedKAMs, setSelectedKAMs] = useState(null);

  const handleAssignKam = async (corpId) => {
    const selectedKAM = selectedKAMs?.[corpId];
    if (!selectedKAM) {
      enqueueSnackbar("Please select a KAM for this corporation", {
        variant: "error",
      });
      return;
    }

    const url =
      BASE_URL + `org/kam/assign?corpId=${corpId}&kamId=${selectedKAM?.id}`;
    const result = await updateData(url, "");
    if (result.data) {
      enqueueSnackbar("Successfully Assigned!", {
        variant: "success",
      });
      fetchCorpKamList(setIsLoading, setCorpKamList);
      setSelectedKAMs(null);
    } else {
      enqueueSnackbar("An error occurred", {
        variant: "error",
      });
    }
  };

  const handleKAMSelection = (corpId, selectedKAM) => {
    setSelectedKAMs((prevState) => ({
      ...prevState,
      [corpId]: selectedKAM,
    }));
  };

  const columns = [
    {
      field: "orgName",
      headerName: "Corp Name",
      width: 240,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => <RenderExpandableCells {...params} />,
    },
    { field: "name", headerName: "KAM Name", width: 170 },
    {
      field: "email",
      headerName: "KAM Email",
      width: 200,
      renderCell: (params) => <RenderExpandableCells {...params} />,
    },
    {
      field: "mobile",
      headerName: "KAM Mobile",
      width: 150,
    },
    {
      field: "selectKam",
      headerName: "Change KAM",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const corpId = params.row.orgId;
        return (
          <CustomAutocomplete
            styles={{ p: 0, m: 0 }}
            placeholder="Select KAM"
            label="Select KAM"
            options={kamList}
            getOptionLabel={(option) => option?.name}
            value={selectedKAMs?.[corpId] || null}
            onChange={(event, newValue) => {
              handleKAMSelection(corpId, newValue);
            }}
            required={true}
            asterickColor="red"
          />
        );
      },
    },
    {
      field: "assignKam",
      headerName: "Assign KAM",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const corpId = params.row.orgId;
        return (
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              p: "3px",
              borderRadius: "3px",
              m: 0,
            }}
            onClick={() => handleAssignKam(corpId)}
          >
            <Typography
              sx={{ fontSize: "12px", color: "#FFF", fontWeight: "400" }}
            >
              Save
            </Typography>
          </Button>
        );
      },
    },
  ];

  const filteredCorpKam = corpKamList.filter((item) =>
    selectedCorp?.orgName ? item?.orgName === selectedCorp?.orgName : true
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <CustomAutocomplete
            options={corpKamList}
            label={"Search Corp"}
            placeholder={"Search Corp"}
            value={selectedCorp}
            onChange={(event, newValue, reason) => {
              setSelectedCorp(newValue);

              if (reason === "clear") {
                setSelectedCorp(null);
              }
            }}
            getOptionLabel={(option) => option?.orgName}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <CustomDataGridLayout
            columns={columns}
            rows={filteredCorpKam}
            rowHeight={60}
            Gridheight={"100%"}
            getRowId={(row) => row?.orgId}
            checkboxSelection={false}
            disableRowSelectionOnClick={true}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AssignKamMain;
