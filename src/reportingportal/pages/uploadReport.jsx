import React from "react";
import ReportingRootLayout from "../global/templates/reportingRootLayout";
import { Outlet, useLocation } from "react-router-dom";
import CorpSelectLayout from "../global/templates/corpSelectLayout";
import UploadReportMain from "../modules/uploadReport/uploadReportMain";

const UploadReport = () => {
  return (
    <CorpSelectLayout>
      <Outlet />
    </CorpSelectLayout>
  );
};

export default UploadReport;
