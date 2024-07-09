import { Box, Grid, Typography } from "@mui/material";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import { uploadFile } from "../../../../assets/corpServices";
import { BASE_URL } from "../../../../../assets/constants";

const UploadProfilePhoto = (props) => {
  function getImageFileObject(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile.file);
    formData.append("fileName", imageFile.name);

    if (imageFile.file) {
      saveImage(formData);
    }
    console.log({ imageFile });
  }
  function runAfterImageDelete(file) {
    console.log({ file });
  }

  const saveImage = async (data) => {
    const url = BASE_URL + "doctor/profilePic/upload?docId=" + props.docId;
    const image = await uploadFile(url, data);

    if (image.error) {
      console.log("error");
    } else {
      const data = await image.data;
      console.log("success");
      props.onProfilePicImage("SUCCESS", data);
    }
  };
  return (
    <Box>
      <Grid container>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <Typography variant="body2">Upload Profile Photo</Typography>
        </Grid>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <ImageUploader
            onFileAdded={(img) => getImageFileObject(img)}
            onFileRemoved={(img) => runAfterImageDelete(img)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadProfilePhoto;
