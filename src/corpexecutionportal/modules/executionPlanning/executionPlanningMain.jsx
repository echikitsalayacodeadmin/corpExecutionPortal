import React, { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import CustomAutocomplete from "../../../assets/customAutocomplete";

const ExecutionPlanningMain = () => {
  const [corpDatalist, setCorpDataList] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  useEffect(() => {
    fetchAllCorps(setCorpDataList, setIsLoading);
  }, []);

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Execution Planning">
        <CustomAutocomplete />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default ExecutionPlanningMain;
