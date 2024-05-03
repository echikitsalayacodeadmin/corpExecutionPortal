import React, { Fragment } from "react";
import StatusSummary from "../../subComp/statusSummary";
import MainPageLayoutWithBack from "../../../../global/templates/mainPageLayoutWithBack";

const StatusSummaryMain = () => {
  return (
    <MainPageLayoutWithBack title="Status Summary">
      <StatusSummary />
    </MainPageLayoutWithBack>
  );
};

export default StatusSummaryMain;
