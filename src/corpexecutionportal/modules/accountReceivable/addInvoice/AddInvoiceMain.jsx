import { Fragment, useState } from "react";
import AddInvoiceForm from "./AddInvoiceForm";

const AddInvoiceMain = ({ label, getInvoiceList, formData, corpId }) => {
  const [formValues, setFormValues] = useState({
    company: { corpId: corpId },
    totalReceivedAmount: 0,
    paymentStatus: "FULL_PAYMENT_PENDING",
  });

  console.log({ formValues });
  return (
    <Fragment>
      <AddInvoiceForm
        label={label}
        formValues={formValues}
        setFormValues={setFormValues}
        formData={formData}
        getInvoiceList={getInvoiceList}
        corpId={corpId}
      />
    </Fragment>
  );
};

export default AddInvoiceMain;
