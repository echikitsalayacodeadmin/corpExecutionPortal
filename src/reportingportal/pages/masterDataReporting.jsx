import React from "react";
import ReportingRootLayout from "../global/templates/reportingRootLayout";
import HomeMain from "../modules/home/subComps/homeMain";
import CorpSelectLayout from "../global/templates/corpSelectLayout";

const MasterDataReporting = () => {
  return (
    <CorpSelectLayout>
      <HomeMain />
    </CorpSelectLayout>
  );
};

export default MasterDataReporting;
