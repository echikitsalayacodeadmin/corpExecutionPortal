import React from "react";
import CorpSelectLayout from "../global/templates/corpSelectLayout";
import VitalErrorDataMainTab from "../modules/vitalsDataError/vitalErrorDataMainTab";

const VitalsErrorDataReporting = () => {
  return (
    <CorpSelectLayout>
      <VitalErrorDataMainTab />
    </CorpSelectLayout>
  );
};

export default VitalsErrorDataReporting;
