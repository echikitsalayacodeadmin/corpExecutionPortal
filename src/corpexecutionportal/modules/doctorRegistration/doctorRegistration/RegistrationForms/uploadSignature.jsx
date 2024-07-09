import { Box, Grid, Typography } from "@mui/material";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import { BASE_URL } from "../../../../../assets/constants";
import { uploadFile } from "../../../../assets/corpServices";

const UploadSignature = (props) => {
  function getImageFileObject(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile.file);
    formData.append("fileName", imageFile.name);
    console.log({ imageFile });

    if (imageFile.file) {
      saveImage(formData);
    }
  }
  function runAfterImageDelete(file) {
    console.log({ file });
  }

  const saveImage = async (data) => {
    const url =
      BASE_URL + "doctor/profileSignature/upload?docId=" + props.docId;
    const image = await uploadFile(url, data);

    if (image.error) {
      console.log("error");
    } else {
      const data = await image.data;
      console.log("success");
      props.onSignatureUpdate("SUCCESS", data);
    }
  };
  return (
    <Box>
      <Grid container>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <Typography variant="body2">Upload Signature</Typography>
        </Grid>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <ImageUploader
            style={{ height: 10, width: 10 }}
            onFileAdded={(img) => getImageFileObject(img)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadSignature;
