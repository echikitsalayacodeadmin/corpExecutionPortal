import { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import StaffManagementTabsMain from "./staffManagementTabs/StaffManagementTabsMain";

const StaffManagementMain = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Staff Management">
        <StaffManagementTabsMain />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default StaffManagementMain;
