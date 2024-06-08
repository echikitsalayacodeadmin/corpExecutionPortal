import React, { Fragment } from "react";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";
import SessionInfoMain from "../modules/engagement/sessionInfo/sessionInfoMain";

const SessionInfoCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Awareness Session Info">
        <SessionInfoMain />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default SessionInfoCorp;
