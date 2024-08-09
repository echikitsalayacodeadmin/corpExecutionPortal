import { Fragment, useState } from "react";
import AddNewShiftForm from "./AddNewShiftForm";

const AddNewShiftMain = ({ label, corpId, companyList, getAllShifts }) => {
  const [formValues, setFormValues] = useState({ staffRole: "OHC_STAFF" });

  console.log({ formValues });
  return (
    <Fragment>
      <AddNewShiftForm
        label={label}
        formValues={formValues}
        setFormValues={setFormValues}
        corpId={corpId}
        companyList={companyList}
        getAllShifts={getAllShifts}
      />
    </Fragment>
  );
};

export default AddNewShiftMain;
