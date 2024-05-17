import { Fragment, useState } from "react";
import MainPageLayout from "../../global/templates/mainPageLayout";
import QRReaderMain from "./comps/qrReaderMain";
import { Box } from "@mui/material";
const AnalysisMain = () => {
  return (
    <Fragment>
      <MainPageLayout title="Analysis">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRReaderMain />
        </Box>
      </MainPageLayout>
    </Fragment>
  );
};

export default AnalysisMain;
