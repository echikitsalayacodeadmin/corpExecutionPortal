import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import {
  ExitFullScreenIcon,
  fullScreenPlugin,
} from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";

const CustomPDFViewerMobile = ({ pdfUrl }) => {
  return (
    <Fragment>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
        <Box>
          {pdfUrl ? (
            <Box sx={{ height: "70vh", width: "100%" }}>
              <Viewer
                fileUrl={pdfUrl}
                plugins={[fullScreenPlugin, ExitFullScreenIcon]}
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

export default CustomPDFViewerMobile;
