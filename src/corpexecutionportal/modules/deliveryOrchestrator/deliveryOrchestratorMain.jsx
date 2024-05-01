import React, { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import Dashboard from "./subComp/dashboard";

const DeliveryOrchestratorMain = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Delivery Orchestrator Dashboard">
        <Dashboard />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default DeliveryOrchestratorMain;
