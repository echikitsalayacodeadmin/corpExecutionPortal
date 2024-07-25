import { Fragment, useState } from "react";
import UpdateInvoiceForm from "./UpdateInvoiceForm";

const UpdateInvoiceMain = ({ getInvoiceList, formData, params }) => {
  const [formValues, setFormValues] = useState({
    paymentStatus: params?.row?.paymentStatus || "",
  });

  console.log({ formValues });
  return (
    <Fragment>
      <UpdateInvoiceForm
        formValues={formValues}
        setFormValues={setFormValues}
        formData={formData}
        getInvoiceList={getInvoiceList}
        params={params}
      />
    </Fragment>
  );
};

export default UpdateInvoiceMain;
