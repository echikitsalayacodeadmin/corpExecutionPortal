import { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import StaffManagementTabsMain from "./staffManagementTabs/StaffManagementTabsMain";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

const StaffManagementMain = () => {
  dayjs.extend(objectSupport);
  // console.log({ dayjs: dayjs(getHourAndMinuteFromTime("15:30:30")) });
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Staff Management">
        <StaffManagementTabsMain />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default StaffManagementMain;
