import { Fragment, useState } from "react";
import UpdateInvoiceForm from "./UpdateInvoiceForm";
import dayjs from "dayjs";

const UpdateInvoiceMain = ({ getInvoiceList, formData, params }) => {
  const [formValues, setFormValues] = useState({
    invoiceId: params?.row?.id,
    invoiceUrl: params?.row?.invoiceUrl || "",
    inVoiceDate: params?.row?.invoiceDate
      ? dayjs(params?.row?.invoiceDate)
      : "",
    serviceDetails: params?.row?.serviceDetails || "",
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
