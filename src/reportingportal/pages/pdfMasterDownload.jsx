import React from "react";
import CorpSelectLayout from "../global/templates/corpSelectLayout";
import MasterPdfGet from "../modules/masterPdf/masterPdfGet";

const PdfMasterDownload = () => {
  return (
    <CorpSelectLayout>
      <MasterPdfGet />
    </CorpSelectLayout>
  );
};

export default PdfMasterDownload;
