import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ImageList,
  ImageListItem,
  Portal,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import useWindowDimensions from "../../../../assets/customHooks/customhooks";

const Attachment = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(null);
  };

  const { height, width } = useWindowDimensions();

  return (
    <Fragment>
      <Stack direction="column" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Attachment:</Typography>
        <Box>
          {data?.attachmentDetails && data?.attachmentDetails.length > 0 && (
            <ImageList
              sx={{ width: "100%", height: 110 }}
              cols={6}
              rowHeight={100}
            >
              {data?.attachmentDetails.map((item, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    p: 0.1,
                    cursor: "pointer",
                    height: 100,
                    width: 200,
                    border: 1,
                    borderColor: "gray",
                    borderRadius: 3,
                  }}
                  onClick={() => {
                    setOpen(true);
                    setSelectedValue(item.attachmentUrl);
                  }}
                >
                  <img
                    srcSet={`${item.attachmentUrl}`}
                    src={`${item.attachmentUrl}`}
                    alt={item.name}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      height: 88,
                      width: "100%",
                      borderRadius: 10,
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
      </Stack>

      <Portal>
        <Dialog
          fullWidth={true}
          maxWidth={false}
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <img
              src={selectedValue}
              alt="image"
              width="100%"
              style={{
                objectFit: "contain",
                height: height - 200,
                width: "100%",
                borderRadius: 10,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default Attachment;
