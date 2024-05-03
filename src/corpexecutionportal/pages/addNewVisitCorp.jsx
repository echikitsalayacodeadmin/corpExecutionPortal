import React, { Fragment } from "react";
import CorpSalesNewVisit from "../modules/salesVisit/addnewVisit/corpSalesNewVisit";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";

const AddNewVisitCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Add New Visit">
        <CorpSalesNewVisit />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default AddNewVisitCorp;
