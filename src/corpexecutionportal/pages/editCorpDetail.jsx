import React, { Fragment } from "react";
import EditCorpSummary from "../modules/salesVisit/editCorp/editCorpSummary";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";

const EditCorpDetail = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Edit Company Info">
        <EditCorpSummary />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default EditCorpDetail;
