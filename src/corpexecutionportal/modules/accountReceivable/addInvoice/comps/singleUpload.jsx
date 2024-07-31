import { Box, Button, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useFileUpload } from "use-file-upload";
import {
  getFileNameWithExt,
  getUrlExtension,
} from "../../../../../assets/utils";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const SingleUpload = ({ title, formData }) => {
  const [file, selectFile] = useFileUpload();

  const handleSubmitNew = (name, size, source, file) => {
    formData.append("file", file);
    formData.append("fileName", name);
  };

  return (
    <Fragment>
      <Button
        size="small"
        sx={{
          fontSize: "13px",
          lineHeight: "15px",
          color: "#FFFFFF",
          borderRadius: 10,
        }}
        variant="contained"
        startIcon={<AttachFileIcon style={{ color: "#FFFFFF" }} />}
        onClick={() =>
          selectFile({ accept: "*" }, ({ name, size, source, file }) => {
            handleSubmitNew(name, size, source, file);
            console.log("Files Selected", {
              name,
              size,
              source,
              file,
            });
          })
        }
      >
        {title}
      </Button>

      {file ? (
        <Box component={Stack}>
          {getFileNameWithExt(file.name) === "pdf" ? (
            <PictureAsPdfIcon fontSize="large" />
          ) : (
            <img src={file.source} alt="preview" height={50} width={50} />
          )}

          <Typography variant="caption"> Name: {file.name} </Typography>
          <Typography variant="caption"> Size: {file.size} </Typography>
        </Box>
      ) : (
        <span>No file selected</span>
      )}
    </Fragment>
  );
};

export default SingleUpload;
