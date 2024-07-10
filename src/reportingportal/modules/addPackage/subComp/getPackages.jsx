import React, { Fragment, useEffect, useState } from "react";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { formatColumnName } from "../../../../assets/utils";
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
} from "@mui/material";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import { getData, updateData } from "../../../assets/reportingServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { Edit } from "@mui/icons-material";
import RenderExpandableCells from "../../../../assets/globalDataGridLayout/renderExpandableCells";
import { useSnackbar } from "notistack";

const GetPackages = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [selectedEmpType, setSelectedEmpType] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [open, setOpen] = useState(false);

  const columns =
    rows.length > 0
      ? Object.keys(rows[0]).map((key) => {
          return {
            field: key,
            headerName: formatColumnName(key),
            width: key === "id" ? 50 : 170,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
              return key === "actions" ? (
                <IconButton
                  onClick={() => {
                    setSelectedRowData(params.row);
                    setOpen(true);
                  }}
                >
                  <Edit />
                </IconButton>
              ) : (
                <RenderExpandableCells {...params} />
              );
            },
          };
        })
      : [];

  const getPackages = async () => {
    if (selectedEmpType) {
      const campCycleId =
        localStorage.getItem("CAMP_ID_REPORTING") === "null"
          ? null
          : localStorage.getItem("CAMP_ID_REPORTING");
      const url =
        BASE_URL +
        `org/getPackageDetails/${corpId}?employmentType=${selectedEmpType}&campCycleId=${
          campCycleId || ""
        }`;
      const result = await getData(url);
      if (result.error) {
        setRows([]);
        console.log(result.error);
      } else {
        const temp = result.data.map((item, index) => ({
          id: index + 1,
          packageName: item.packageName,
          bloodPackageName: item.bloodPackageName,
          xray: item.xray,
          cbc: item.cbc,
          urine: item.urine,
          fitness: item.fitness,
          eye: item.eye,
          audiometry: item.audiometry,
          pft: item.pft,
          ecg: item.ecg,
          sugar: item.sugar,
          sbilirubin: item.sbilirubin,
          testCode: item.testCode,
          stoolSample: item.stoolSample,
          employmentType: item.employmentType,
          campCycleId: item.campCycleId,
          conditions: item.conditions,
          pathPackageDetails: item.pathPackageDetails,
          testDetails: item.testDetails,
          date: item.date,
          actions: "",
        }));
        setRows(temp);
      }
    }
  };

  useEffect(() => {
    getPackages();
  }, [selectedEmpType]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedRowData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const booleanFields = Object.keys(selectedRowData).filter(
    (key) => typeof selectedRowData[key] === "boolean"
  );

  const handleUpdateEmpPackage = async () => {
    const url = BASE_URL + `org/update/packageDetails/${corpId}`;

    const result = await updateData(url, selectedRowData);
    if (result.error) {
      enqueueSnackbar(`${response.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Successfully Updated`, {
        variant: "success",
      });
      setOpen(false);
      setSelectedRowData({});
      getPackages();
    }
  };

  console.log({ selectedRowData });

  return (
    <Fragment>
      <Box sx={{ gap: 2 }}>
        <CustomAutocomplete
          options={["AHC", "ONROLL", "CONTRACTOR", "PRE_EMPLOYMENT", "CSR"]}
          value={selectedEmpType || null}
          onChange={(event, newValue, reason) => {
            setSelectedEmpType(newValue);
            if (reason === "clear") {
              setSelectedEmpType(null);
            }
          }}
          label="Select Employment Type"
          placeholder="Select Employment Type"
          required={true}
          asterickColor={"red"}
          getOptionLabel={(option) => option || null}
        />
        <CustomDataGridLayout
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
          checkboxSelection={false}
          hideFooterPagination={false}
          rowHeight={30}
          columns={columns}
          rows={rows}
          Gridheight={"65vh"}
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <Grid container spacing={2}>
            {booleanFields.map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRowData[field] || false}
                      onChange={handleCheckboxChange}
                      name={field}
                    />
                  }
                  label={field}
                />
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <CustomButtonBlue
              onClick={handleUpdateEmpPackage}
              title={"Submit"}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default GetPackages;
