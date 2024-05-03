import React, { Fragment } from "react";
import SalesVisitDashboard from "../modules/salesVisit/dashboard/salesVisitDashboard";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";

const SalesVisitCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Sales Visit Dashboard">
        <SalesVisitDashboard />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default SalesVisitCorp;
