import { Fragment } from "react";
import CorpRootLayout from "../global/templates/corpRootLayout";
import HomeMain from "../modules/home/homeMain";

const HomeCorp = () => {
  console.log({ contacts: process.env.NODE_ENV });
  return (
    <Fragment>
      <HomeMain />
    </Fragment>
  );
};

export default HomeCorp;
