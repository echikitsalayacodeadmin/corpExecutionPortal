import React from "react";
import CorpSelectLayout from "../global/templates/corpSelectLayout";
import HealthRegisterMain from "../modules/healthRegister/healthRegisterMain";

const HealthRegisterIndex = () => {
  return (
    <CorpSelectLayout>
      <HealthRegisterMain />
    </CorpSelectLayout>
  );
};

export default HealthRegisterIndex;
