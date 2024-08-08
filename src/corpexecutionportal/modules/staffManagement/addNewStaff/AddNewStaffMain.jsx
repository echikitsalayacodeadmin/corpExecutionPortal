import { Fragment, useState } from "react";
import AddNewStaffForm from "./AddNewStaffForm";

const AddNewStaffMain = ({ label }) => {
  const [formValues, setFormValues] = useState({});

  console.log({ formValues });
  return (
    <Fragment>
      <AddNewStaffForm
        label={label}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </Fragment>
  );
};

export default AddNewStaffMain;
