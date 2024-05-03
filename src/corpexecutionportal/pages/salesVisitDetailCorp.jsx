import React, { Fragment } from "react";
import SalesVisitDetail from "../modules/salesVisit/detail/salesVisitDetail";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";

const SalesVisitDetailCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Sales Visit Detail">
        <SalesVisitDetail />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default SalesVisitDetailCorp;
