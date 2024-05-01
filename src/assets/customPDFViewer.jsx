import { Box, Typography } from "@mui/material";
import { Fragment } from "react";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const CustomPDFViewer = ({ pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Fragment>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
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
      </Worker>
    </Fragment>
  );
};

export default CustomPDFViewer;
