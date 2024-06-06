import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Portal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatColumnName, getColumnWidth } from "../../../../assets/utils";
import RenderExpandableCells from "../../../../assets/globalDataGridLayout/renderExpandableCells";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import ViewReportModal from "./viewReportModal";

const DetailedUploadedFileViewModal = ({
  onClose,
  open,
  masterData,
  selectedField,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  const handleViewFile = (url) => {
    setOpenModal(true);
    setFileUrl(url);
    setFileType(getFileType(url));
  };

  const columns =
    masterData?.length > 0
      ? Object.keys(masterData[0])
          ?.filter((key) => !["isActive", "id", "corpId"].includes(key))
          .map((key) => ({
            field: key,
            headerName: formatColumnName(key),
            width: getColumnWidth(key),
            align: ["empName", "nameInReport", "fileName"].includes(key)
              ? "left"
              : "center",
            headerAlign: ["empName", "nameInReport", "fileName"].includes(key)
              ? "left"
              : "center",
            renderCell: (params) => {
              const isUrl =
                typeof params.value === "string" &&
                params.value.match(/^https?:\/\/\S+/);
              return isUrl ? (
                <Button onClick={() => handleViewFile(params.value)}>
                  View
                </Button>
              ) : typeof params.value === "boolean" && params.value !== null ? (
                <Typography
                  sx={{ fontSize: "15px", textTransform: "capitalize" }}
                >
                  {params.value ? "Yes" : "No"}
                </Typography>
              ) : (
                <RenderExpandableCells {...params} />
              );
            },
          }))
      : [];

  const dialogTitleStyles = {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "17px",
    lineHeight: "15px",
    color: "#000000",
    marginTop: "-25px",
    marginBottom: "10px",
  };

  return (
    <div>
      <Portal>
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography gutterBottom sx={dialogTitleStyles}>
              {selectedField} FILES
            </Typography>
          </DialogTitle>
          <DialogContent>
            <CustomDataGridLayout
              disableRowSelectionOnClick
              disableSelectionOnClick
              checkboxSelection={false}
              hideFooterPagination={false}
              rows={masterData?.filter(
                (item) =>
                  item.orgReportUploadStatus === selectedField ||
                  item.matching === selectedField
              )}
              rowHeight={30}
              columns={columns}
              Gridheight="70vh"
            />
          </DialogContent>
        </Dialog>
      </Portal>
      <ViewReportModal
        open={openModal}
        handleCloseModal={() => setOpenModal(false)}
        fileType={fileType}
        fileUrl={fileUrl}
      />
    </div>
  );
};

export default DetailedUploadedFileViewModal;
