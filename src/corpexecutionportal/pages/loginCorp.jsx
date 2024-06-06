import { Fragment } from "react";
import CorpRootLayout from "../global/templates/corpRootLayout";
import LoginIndex from "../modules/login/loginIndex";
import LandingIndexDynamic from "../../landing/landingIndexDynamic";

const LoginCorp = () => {
  return (
    <Fragment>
      <LandingIndexDynamic>
        <LoginIndex />
      </LandingIndexDynamic>
    </Fragment>
  );
};

export default LoginCorp;
