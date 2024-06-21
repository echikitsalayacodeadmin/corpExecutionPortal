import React from "react";
import { Fragment } from "react";
import MismatchPackage from "../modules/mismatchPackage/mismatchPackage";
import CorpSelectLayout from "../global/templates/corpSelectLayout";

const MismatchPackageIndex = () => {
  return (
    <CorpSelectLayout>
      <MismatchPackage />
    </CorpSelectLayout>
  );
};

export default MismatchPackageIndex;
