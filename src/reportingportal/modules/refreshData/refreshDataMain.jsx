import {
  Box,
  Grid,
  IconButton,
  Modal,
  Paper,
  Portal,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext, useState } from "react";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import PermissionModal from "./subComp/permissionModal";
import { ReportingContext } from "../../global/context/context";
import CloseIcon from "@mui/icons-material/Close";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import ParseTriggerModal from "./subComp/parseTriggerModal";
import MarkCampCompleted from "./subComp/markCampCompleted";

const RefreshDataMain = () => {
  const { setOpenDialog, openDialog } = useContext(ReportingContext);
  const [isRefreshHeader, setIsRefreshHeader] = useState(false);

  const [openTrigger, setOpenTrigger] = useState(false);
  const handleOpenTrigger = () => {
    setOpenTrigger(true);
  };
  const handleCloseTrigger = () => {
    setOpenTrigger(false);
  };

  const [openIsCompletedModal, setOpenIsCompletedModal] = useState(false);
  const handleCloseIsCompletedModal = () => {
    setOpenIsCompletedModal(false);
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
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <CustomButtonBlue
                onClick={() => {
                  setOpenDialog(!openDialog);
                  setIsRefreshHeader(true);
                }}
                title="Refresh Headers"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <CustomButtonBlue
                onClick={() => {
                  setOpenDialog(!openDialog);
                  setIsRefreshHeader(false);
                }}
                title="Original Headers"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <CustomButtonBlue
                onClick={() => {
                  handleOpenTrigger();
                }}
                title="Parse Trigger"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <CustomButtonBlue
                onClick={() => {
                  setOpenIsCompletedModal(true);
                }}
                title="Mark Camp Completed"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <PermissionModal isRefreshHeader={isRefreshHeader} />
      <ParseTriggerModal open={openTrigger} handleClose={handleCloseTrigger} />
      <MarkCampCompleted
        open={openIsCompletedModal}
        handleClose={handleCloseIsCompletedModal}
      />
    </Fragment>
  );
};

export default RefreshDataMain;
