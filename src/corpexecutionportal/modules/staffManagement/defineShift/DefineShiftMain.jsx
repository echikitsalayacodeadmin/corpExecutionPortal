import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import DefineShiftTableComponent from "../tableComp/DefineShiftTableComponent";
import { getCompanyList } from "../../../services/genericTicketingSystem";
import CustomSelectNew from "../../../../assets/customSelectNew";
import dayjs from "dayjs";
import { BASE_URL } from "../../../../assets/constants";
import { getData } from "../../../assets/corpServices";
import AddNewShiftMain from "../addNewShift/AddNewShiftMain";

const DefineShiftMain = () => {
  const [shiftList, setShiftList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [formValues, setFormValues] = useState({
    corpId: "872cd841-9f7a-432d-b8e9-422b780bca10",
  });

  useEffect(() => {
    getCompanyList(setCompanyList);
  }, []);

  const getAllShifts = async () => {
    const url = BASE_URL + `staff/corp/all/shifts?corpId=${formValues.corpId}`;

    const res = await getData(url);
    if (res.error) {
      setShiftList([]);
    } else {
      setShiftList(
        res.data.map((v, i) => ({
          ...v,
          //id: i + 1,
        }))
      );
    }
  };

  useEffect(() => {
    getAllShifts();
  }, [formValues]);

  console.log({ shiftList });

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={5}>
            <CustomSelectNew
              width={"100%"}
              placeholder="Company filter"
              formValues={formValues}
              setFormValues={setFormValues}
              borderRadius={3.5}
              options={companyList}
              property="corpId"
              labelProp="orgName"
              valueProp="corpId"
            />
          </Grid>
          <Grid item lg={7} display="flex" justifyContent="flex-end">
            <AddNewShiftMain
              label="Add New Shift"
              corpId={formValues.corpId}
              companyList={companyList}
              getAllShifts={getAllShifts}
            />
          </Grid>
          <Grid item lg={12} display="flex" justifyContent="center">
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {companyList.find((v) => v.corpId === formValues.corpId)
                ?.orgName || "Select Company"}
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <DefineShiftTableComponent
              data={shiftList}
              companyList={companyList}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DefineShiftMain;
