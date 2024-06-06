import React from "react";
import CorpSelectLayoutOA from "../global/templates/corpSelectLayoutOA";
import SelectCorpIndexOrgAnalysis from "../modules/selectCorp/selectCorpIndexOrgAnalysis";

const SelectCorpOrgAnalysis = () => {
  return (
    <CorpSelectLayoutOA>
      <SelectCorpIndexOrgAnalysis />
    </CorpSelectLayoutOA>
  );
};

export default SelectCorpOrgAnalysis;
