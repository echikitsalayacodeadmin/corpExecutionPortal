import {
  Box,
  Grid,
  IconButton,
  Modal,
  Portal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomAutocomplete from "../../../../assets/customAutocomplete";

const MarkStatusModal = ({ open, handleClose, handleMarkStatus }) => {
  return (
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
            backgroundColor: "rgba(187, 187, 187, 0.4)",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: "15px",
            width: "340px",
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => handleClose()}>
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
            Mark Status!
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <CustomAutocomplete
                options={[]}
                value={null}
                onChange={() => {}}
                placeholder="Select Status"
                label="Select Status"
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CustomButtonBlue
                title={"Save"}
                onClick={() => handleMarkStatus()}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Portal>
  );
};

export default MarkStatusModal;
