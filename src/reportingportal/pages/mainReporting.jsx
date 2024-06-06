import CorpSelectLayout from "../global/templates/corpSelectLayout";
import ReportingRootLayout from "../global/templates/reportingRootLayout";
import HomeIndex from "../modules/home/homeIndex";

const MainReporting = () => {
  console.log({ contacts: process.env.NODE_ENV });
  return (
    <CorpSelectLayout>
      <HomeIndex />
    </CorpSelectLayout>
  );
};

export default MainReporting;
