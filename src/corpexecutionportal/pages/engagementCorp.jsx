import React, { Fragment } from "react";
import EngagementMain from "../modules/engagement/engagementMain";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";

const EngagementCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Engagement Team Actionables">
        <EngagementMain />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default EngagementCorp;
