import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData, updateData } from "../../assets/reportingServices";
import { CustomTypographyBold } from "../../../assets/customTypography";
import MainPageLayout from "../../global/templates/mainPageLayout";
import { IOSSwitch } from "../../../assets/customSwitch";

const ManagePermissionsIndex = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [permissionList, setPermissionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const _getCorpPermissions = async () => {
    const url =
      BASE_URL +
      `org/config/items?corpId=${corpId}&orgConfigType=UI_LINE_ITEMS`;

    const response = await getData(url);

    if (response.error) {
      console.log({ error: response.error });
      setPermissionList([]);
    } else {
      setIsLoading(false);
      const permissions = response.data?.permissions;
      setPermissionList(permissions?.parentRoles);
    }
  };

  useEffect(() => {
    _getCorpPermissions();
  }, []);

  console.log({ permissionList });

  const _updatePermissions = async (e) => {
    e.preventDefault();
    const url = BASE_URL + `org/config/RoleItems?corpId=${corpId}`;

    let payload = [];
    const tempList = permissionList?.map((val) => {
      payload.push({
        isActive: val.isActive,
        id: val.id,
        name: val.name,
        display: val.display,
        access: val.access,
        level: val.level,
        accessId: val.accessId,
        parentId: val.parentId,
        corpId: val.corpId,
        name_Id: val.nameId,
        sequence: val.sequence,
      });

      val?.childRoles?.map((cval) => {
        payload.push({
          isActive: cval.isActive,
          id: cval.id,
          name: cval.name,
          display: cval.display,
          access: cval.access,
          level: cval.level,
          accessId: cval.accessId,
          parentId: cval.parentId,
          corpId: cval.corpId,
          name_Id: cval.nameId,
          sequence: cval.sequence,
        });

        cval?.childRoles?.map((ccval) => {
          payload.push({
            isActive: ccval.isActive,
            id: ccval.id,
            name: ccval.name,
            display: ccval.display,
            access: ccval.access,
            level: ccval.level,
            accessId: ccval.accessId,
            parentId: ccval.parentId,
            corpId: ccval.corpId,
            name_Id: ccval.nameId,
            sequence: ccval.sequence,
          });
        });
      });
    });

    console.log({ payload });
    const response = await updateData(url, payload);

    if (response.error) {
      console.log({ failed: response.error });
      setSeverity("error");
      setMessage("Failed to save.");
      setOpenNotice(true);
    } else {
      console.log({ sucess: response?.data });
      setSeverity("success");
      setMessage("Successfully saved.");
      setOpenNotice(true);
    }
  };

  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");
  const [openNotice, setOpenNotice] = useState(false);

  const handleCloseNotice = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNotice(false);
  };

  if (isLoading) {
    return (
      <Fragment>
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <MainPageLayout title="Manage Permissions">
        <Snackbar
          open={openNotice}
          autoHideDuration={6000}
          onClose={handleCloseNotice}
        >
          <Alert
            onClose={handleCloseNotice}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <form onSubmit={_updatePermissions}>
          <Container maxWidth={"md"}>
            <Box
              sx={{
                boxSizing: "border-box",
                background: "#F5F5F5",
                border: "0.5px solid #A6A6A6",
                borderRadius: 5,
                minHeight: "40vh",
                p: 2,
                mb: 15,
                mt: 5,
              }}
            >
              <Grid container>
                {permissionList.map((pitem, pindex) => (
                  <Grid item lg={12} md={12} sm={12} xs={12} key={pindex}>
                    <Grid container>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Stack
                          direction="row"
                          spacing={3}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <CustomTypographyBold>
                            {pitem?.name}
                          </CustomTypographyBold>

                          <FormControlLabel
                            control={
                              <IOSSwitch
                                sx={{ m: 2 }}
                                checked={pitem["access"] || false}
                                onChange={(e) => {
                                  let newFormValues = [...permissionList];
                                  pitem["access"] = e.target.checked;
                                  setPermissionList(newFormValues);
                                }}
                              />
                            }
                            label=""
                          />
                        </Stack>
                      </Grid>

                      {pitem?.childRoles?.map((citem, cindex) => (
                        <Grid item lg={12} md={12} sm={12} xs={12} key={cindex}>
                          <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Stack
                                sx={{ ml: { lg: 10, xs: 0 } }}
                                direction="row"
                                spacing={3}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <CustomTypographyBold>
                                  {citem?.name}
                                </CustomTypographyBold>

                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      sx={{ m: 2 }}
                                      checked={citem["access"] || false}
                                      onChange={(e) => {
                                        let newFormValues = [...permissionList];
                                        citem["access"] = e.target.checked;
                                        setPermissionList(newFormValues);
                                      }}
                                    />
                                  }
                                  label=""
                                />
                              </Stack>
                            </Grid>

                            {citem?.childRoles?.map((pageItems, pageIndex) => (
                              <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                key={pageIndex}
                              >
                                <Grid container>
                                  <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Stack
                                      sx={{ ml: { lg: 20, xs: 0 } }}
                                      direction="row"
                                      spacing={3}
                                      display="flex"
                                      justifyContent="space-between"
                                      alignItems="center"
                                    >
                                      <CustomTypographyBold>
                                        {pageItems?.name}
                                      </CustomTypographyBold>

                                      <FormControlLabel
                                        control={
                                          <IOSSwitch
                                            sx={{ m: 2 }}
                                            checked={
                                              pageItems["access"] || false
                                            }
                                            onChange={(e) => {
                                              let newFormValues = [
                                                ...permissionList,
                                              ];
                                              pageItems["access"] =
                                                e.target.checked;
                                              setPermissionList(newFormValues);
                                            }}
                                          />
                                        }
                                        label=""
                                      />
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}

                <Grid item lg={12} md={12} sm={12} xs={12}></Grid>
              </Grid>
            </Box>
          </Container>
          <AppBar
            position="fixed"
            color="inherit"
            sx={{
              top: "auto",
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Toolbar>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Toolbar>
          </AppBar>
        </form>
      </MainPageLayout>
    </Fragment>
  );
};

export default ManagePermissionsIndex;
