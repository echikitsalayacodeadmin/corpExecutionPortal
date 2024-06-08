import React, { Fragment } from "react";
import MainPageLayoutWithBack from "../global/templates/mainPageLayoutWithBack";
import CalendarInfoMain from "../modules/engagement/calendarInfo/calendarInfoMain";

const CalenderInfoCorp = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Awareness Session Calender Info">
        <CalendarInfoMain />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default CalenderInfoCorp;
