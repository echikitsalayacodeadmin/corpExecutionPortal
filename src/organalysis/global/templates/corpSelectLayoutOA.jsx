import React, { Fragment, useContext } from "react";
import { CorpNameContext } from "../context/context";
import SelectCorpOrgAnalysis from "../../pages/selectCorpOrgAnalysis";
import SelectCorpIndexOrgAnalysis from "../../modules/selectCorp/selectCorpIndexOrgAnalysis";

const CorpSelectLayoutOA = ({ children }) => {
  const { corpId } = useContext(CorpNameContext);

  if (!corpId) {
    return (
      <Fragment>
        <SelectCorpIndexOrgAnalysis />
      </Fragment>
    );
  }
  return <Fragment>{children}</Fragment>;
};

export default CorpSelectLayoutOA;
