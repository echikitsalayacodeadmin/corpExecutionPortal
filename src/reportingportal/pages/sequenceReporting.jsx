import React from "react";
import SequenceReportingIndex from "../modules/sequence/sequenceReportingIndex";
import CorpSelectLayout from "../global/templates/corpSelectLayout";

const SequenceReporting = () => {
  return (
    <CorpSelectLayout>
      <SequenceReportingIndex />
    </CorpSelectLayout>
  );
};

export default SequenceReporting;
