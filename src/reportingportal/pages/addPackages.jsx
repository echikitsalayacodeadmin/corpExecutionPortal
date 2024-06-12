import React, { Fragment, useState } from "react";
import AddPackageMain from "../modules/addPackage/addPackageMain";
import CorpSelectLayout from "../global/templates/corpSelectLayout";
import { BASE_URL } from "../../assets/constants";

const AddPackages = () => {
  return (
    <CorpSelectLayout>
      <AddPackageMain />
    </CorpSelectLayout>
  );
};

export default AddPackages;
