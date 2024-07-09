import React, { Fragment } from "react";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";
import DoctorRegistrationMain from "../modules/doctorRegistration/doctorRegistrationMain";

const DoctorRegistionInClinics = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Doctor Registration">
        <DoctorRegistrationMain />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default DoctorRegistionInClinics;
