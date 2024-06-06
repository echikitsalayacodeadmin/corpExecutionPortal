import React from "react";
import UploadReportS3Main from "../modules/uploadReportsS3/uploadReportS3Main";
import CorpSelectLayout from "../global/templates/corpSelectLayout";

const UploadReportCloud = () => {
  return (
    <CorpSelectLayout>
      <UploadReportS3Main />
    </CorpSelectLayout>
  );
};

export default UploadReportCloud;
