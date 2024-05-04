import React, { Fragment } from "react";
import QuotationMain from "../modules/quotation/quotationMain";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";

const QuotationCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Quotation Dashboard">
        <QuotationMain />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default QuotationCorp;
