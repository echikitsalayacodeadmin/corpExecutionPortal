import React, { Fragment } from "react";
// import RegisterCorpMain from "../modules/salesVisits/subpages/registerCorpMain";
import CorpSalesRegistration from "../modules/salesVisit/registration/corpSalesRegistration";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";

const RegisterCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Registration">
        <CorpSalesRegistration />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default RegisterCorp;
