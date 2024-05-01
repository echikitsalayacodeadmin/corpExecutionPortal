import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Box, Button } from "@mui/material";
import { Fragment } from "react";
import { useFileUpload } from "use-file-upload";
import imageCompression from "browser-image-compression";
import { uploadData } from "../campportal/assets/campServices";
import { useSnackbar } from "notistack";

const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

const UploadDocuments = ({
  title = "Upload from system",
  url,
  handleClose,
  formValues,
  setFormValues,
  property,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitNew = async (name, size, source, file) => {
    console.log("originalFile instanceof Blob", file); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    if (validImageTypes.includes(file?.type)) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        console.log("compressedFile instanceof Blob", compressedFile); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        var newfile = new File([compressedFile], name, {
          type: file?.type,
        });

        console.log({ newfile });
        const formData = new FormData();
        formData.append("file", newfile);
        uploadFile(formData);
      } catch (error) {
        console.log({ error321: error });
      }
    } else {
      const formData = new FormData();
      formData.append("file", file);
      uploadFile(formData);
    }
  };

  const uploadFile = async (formData) => {
    const response = await uploadData(url, formData);

    if (response?.error) {
      console.log(error);
      enqueueSnackbar("Failed to upload!", {
        variant: "error",
      });
    } else {
      let newFormValues = { ...formValues };
      newFormValues[property] = response.data[property];
      newFormValues["vaccines"] = response.data["vaccines"];
      setFormValues(newFormValues);
      enqueueSnackbar("Uploaded successfully.", {
        variant: "success",
      });
      console.log({ formData_upload_2: response.data });
      handleClose();
    }
  };
  const [files, selectFiles] = useFileUpload();
  return (
    <Fragment>
      <Box sx={{ display: { lg: "flex", xs: "none" } }}>
        <Button
          size="small"
          sx={{
            py: 0.5,
            px: 1,
            height: { lg: 30, xs: 20 },
            fontSize: { lg: 14, xs: 7 },
          }}
          onClick={() =>
            selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
              handleSubmitNew(name, size, source, file);
              console.log("Files Selected", {
                name,
                size,
                source,
                file,
              });
            })
          }
          variant="contained"
          startIcon={<AttachFileIcon sx={{ color: "#fff" }} />}
        >
          {title}
        </Button>
      </Box>
      <Box sx={{ display: { lg: "none", xs: "flex" }, flex: 1 }}>
        <Button
          size="small"
          fullWidth
          // sx={{
          //   py: 0.5,
          //   px: 1,
          //   height: { lg: 30, xs: 20 },
          //   fontSize: { lg: 14, xs: 7 },
          // }}
          onClick={() =>
            selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
              handleSubmitNew(name, size, source, file);
              console.log("Files Selected", {
                name,
                size,
                source,
                file,
              });
            })
          }
          variant="contained"
          startIcon={<AttachFileIcon sx={{ color: "#fff" }} />}
        >
          {title}
        </Button>
      </Box>
    </Fragment>
  );
};
export default UploadDocuments;
