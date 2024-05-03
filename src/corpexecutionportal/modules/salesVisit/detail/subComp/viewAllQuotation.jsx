import { Box, Grid, IconButton, Portal, Modal } from "@mui/material";
import React, { Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTypographyBold } from "../../../../../assets/customTypography";
import CustomDataGridLayout from "../../../../../assets/globalDataGridLayout/customDataGridLayout";

const ViewAllQuotation = ({ selectedRow, openModal, setOpenModal }) => {
  const columns = [
    {
      field: "Versions",
      headerName: "Versions",
      width: 200,
      editable: true,
    },
    {
      field: "sentOn",
      headerName: "Sent On",
      width: 200,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 200,
      editable: true,
    },
  ];
  return (
    <Fragment>
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openModal}
          onClose={() => setOpenModal(false)}
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
              width: "90%",
              minHeight: "70vh",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ textAlign: "center", marginTop: "-30px" }}>
              <CustomTypographyBold>
                {selectedRow?.testName}
              </CustomTypographyBold>
            </Box>

            <Grid
              container
              sx={{ justifyContent: "space-between" }}
              spacing={2}
            >
              <Grid item xs={12} lg={12}>
                <CustomDataGridLayout
                  rows={[]}
                  columns={columns}
                  disableRowSelectionOnClick={true}
                  disableSelectionOnClick={true}
                  checkboxSelection={true}
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default ViewAllQuotation;
