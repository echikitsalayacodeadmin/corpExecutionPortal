import React, { Fragment, useEffect, useState } from "react";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { formatColumnName } from "../../../../assets/utils";
import { Box } from "@mui/material";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import { getData } from "../../../assets/reportingServices";
import { BASE_URL } from "../../../../assets/constants";

const GetPackages = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [rows, setRows] = useState([]);
  const [selectedEmpType, setSelectedEmpType] = useState(null);
  const columns =
    rows.length > 0
      ? Object.keys(rows[0]).map((key) => {
          return {
            field: key,
            headerName: formatColumnName(key),
            width: 170,
            align: "left",
            headerAlign: "left",
          };
        })
      : [];

  const getPackages = async () => {
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
      setRows(result.data);
    }
  };

  useEffect(() => {
    getPackages();
  }, [selectedEmpType]);
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
    </Fragment>
  );
};

export default GetPackages;
