import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import { fetchAllCorps } from "../../services/salesVisitServices";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import { Box } from "@mui/material";
import { BASE_URL } from "../../../assets/constants";
import { saveData } from "../../assets/corpServices";
import { useSnackbar } from "notistack";

const ExecutionPlanningMain = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedValue, setSelectedValue] = useState(null);
  const [corpDatalist, setCorpDataList] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  useEffect(() => {
    fetchAllCorps(setCorpDataList, setIsLoading);
  }, []);

  const handleSubmit = async () => {
    const url =
      BASE_URL + `task/createtask?corpId=${selectedValue?.corpSalesId}`;
    const result = await saveData(url, "");
    if (result.data) {
      enqueueSnackbar("Successfully Sent For Task Execution", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(result?.error?.response?.data?.message, {
        variant: "error",
      });
    }
  };

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Execution Planning">
        <CustomAutocomplete
          label={"Company"}
          placeholder={"Company"}
          options={corpDatalist.filter(
            (corp, index, self) =>
              corp.corpSalesId !== null &&
              corp.corpSalesId !== "" &&
              corp.corpName !== null &&
              corp.corpName !== "" &&
              self.findIndex(
                (c) =>
                  c?.corpSalesId === corp?.corpSalesId ||
                  c?.corpName === corp?.corpName
              ) === index
          )}
          required={true}
          asterickColor={"red"}
          value={selectedValue}
          getOptionLabel={(option) => option.corpName || ""}
          onChange={(event, newValue, reason) => {
            setSelectedValue(newValue);
            if (reason === "clear") {
              setSelectedValue(null);
            }
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBlock: 3,
          }}
        >
          <CustomButtonBlue
            disabled={selectedValue ? false : true}
            title="Send For Task Execution"
            onClick={() => {
              handleSubmit();
            }}
          />
        </Box>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default ExecutionPlanningMain;
