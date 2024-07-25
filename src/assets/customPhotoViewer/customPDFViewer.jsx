import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const CustomPDFViewer = ({ pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Fragment>
      <Box>
        {pdfUrl ? (
          <Box sx={{ height: "70vh", width: "100%" }}>
            <Viewer
              fileUrl={pdfUrl}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={2}
            />
          </Box>
        ) : (
          <Box
            sx={{
              height: "60vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>No Pdfs...</Typography>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default CustomPDFViewer;
