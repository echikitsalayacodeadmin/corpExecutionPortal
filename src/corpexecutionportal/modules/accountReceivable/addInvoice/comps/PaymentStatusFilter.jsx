import { Fragment } from "react";
import CustomSelect from "./customSelect";
import { PaymentStatusList } from "../../../../assets/corpConstants";

const PaymentStatusFilter = ({
  formValues,
  setFormValues,
  label,
  placeholder,
}) => {
  return (
    <Fragment>
      <CustomSelect
        value={formValues}
        setvalue={setFormValues}
        options={PaymentStatusList}
        label={label}
        placeholder="Status"
        // disabled={true}
      />
    </Fragment>
  );
};

export default PaymentStatusFilter;
