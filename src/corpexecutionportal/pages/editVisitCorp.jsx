import React, { Fragment } from "react";
import EditCorpSummary from "../modules/salesVisit/editVisit/editCorpSummary";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";

const EditVisitCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Edit Visit">
        <EditCorpSummary />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default EditVisitCorp;
