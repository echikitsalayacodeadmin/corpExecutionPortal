import { Fragment, useState } from "react";
import AddNewShiftForm from "./AddNewShiftForm";
import UpdateShiftForm from "./UpdateShiftForm";

const UpdateShiftMain = ({ params, companyList }) => {
  const [formValues, setFormValues] = useState({ ...params?.row });

  console.log({ formValues, params });
  return (
    <Fragment>
      <UpdateShiftForm
        params={params}
        companyList={companyList}
        formValues={formValues}
        setFormValues={setFormValues}
        corpId={params.corpId}
      />
    </Fragment>
  );
};

export default UpdateShiftMain;
