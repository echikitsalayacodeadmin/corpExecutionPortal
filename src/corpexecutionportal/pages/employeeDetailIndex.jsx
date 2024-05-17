import { Fragment, useState } from "react";
import EmployeeDetailMain from "../modules/employeeDetail/employeeDetailMain";
import { useParams, useSearchParams } from "react-router-dom";

const EmployeeDetailIndex = () => {
  const { empid } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let [vitalsId, setVitalsId] = useState(searchParams.get("VITALS_ID"));

  return (
    <Fragment>
      <EmployeeDetailMain
        empId={empid}
        vitalsId={vitalsId}
        name={searchParams.get("NAME")}
      />
    </Fragment>
  );
};

export default EmployeeDetailIndex;
