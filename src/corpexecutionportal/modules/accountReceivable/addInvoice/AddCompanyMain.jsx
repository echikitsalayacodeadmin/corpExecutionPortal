import { Fragment, useState } from "react";
import AddCompanyForm from "./AddCompanyForm";

const AddCompanyMain = ({ label, getInvoiceList, formData }) => {
  const [formValues, setFormValues] = useState({
    totalReceivedAmount: 0,
    paymentStatus: "FULL_PAYMENT_PENDING",
  });

  console.log({ formValues });
  return (
    <Fragment>
      <AddCompanyForm
        label={label}
        formValues={formValues}
        setFormValues={setFormValues}
        formData={formData}
        getInvoiceList={getInvoiceList}
      />
    </Fragment>
  );
};

export default AddCompanyMain;
