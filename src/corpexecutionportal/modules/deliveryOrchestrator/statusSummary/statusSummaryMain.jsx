import React, { Fragment } from "react";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import StatusSummary from "../subComp/statusSummary";

const StatusSummaryMain = () => {
  return (
    <MainPageLayoutWithBack title="Status Summary">
      <StatusSummary />
    </MainPageLayoutWithBack>
  );
};

export default StatusSummaryMain;
