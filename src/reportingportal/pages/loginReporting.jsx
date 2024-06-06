import { Fragment } from "react";
import ReportingRootLayout from "../global/templates/reportingRootLayout";
import LoginIndexReporting from "../modules/login/loginIndexReporting";
import LandingIndexDynamic from "../../landing/landingIndexDynamic";

const LoginReporting = () => {
  return (
    <Fragment>
      <LandingIndexDynamic>
        <LoginIndexReporting />
      </LandingIndexDynamic>
    </Fragment>
  );
};

export default LoginReporting;
