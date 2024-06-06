import { Fragment } from "react";
import OrgAnalysisRootLayout from "../global/templates/orgAnalysisRootLayout";
import LoginIndexOrgAnalysis from "../modules/login/loginIndexOrgAnalysis";
import LandingIndexDynamic from "../../landing/landingIndexDynamic";

const LoginOrgAnalysis = () => {
  return (
    <Fragment>
      <LandingIndexDynamic>
        <LoginIndexOrgAnalysis />
      </LandingIndexDynamic>
    </Fragment>
  );
};

export default LoginOrgAnalysis;
