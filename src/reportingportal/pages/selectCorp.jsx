import React from "react";
import SelectCorpIndex from "../modules/selectCorp/selectCorpIndex";
import CorpSelectLayout from "../global/templates/corpSelectLayout";

const SelectCorp = () => {
  return (
    <CorpSelectLayout>
      <SelectCorpIndex />
    </CorpSelectLayout>
  );
};

export default SelectCorp;
