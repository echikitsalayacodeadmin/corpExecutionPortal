import { Fragment, useState } from "react";
import UpdateShiftForm from "./UpdateShiftForm";
import dayjs from "dayjs";
import { getHourAndMinuteFromTime } from "../../../../assets/utils";

const UpdateShiftMain = ({ params, companyList }) => {
  const [formValues, setFormValues] = useState({
    corpId: params?.row?.corpId,
    id: params?.row?.id,
    isActive: params?.row?.isActive,
    shiftEndTime: dayjs(getHourAndMinuteFromTime(params?.row?.shiftEndTime)),
    shiftName: params?.row?.shiftName,
    shiftStartTime: dayjs(
      getHourAndMinuteFromTime(params?.row?.shiftStartTime)
    ),
    staffRole: params?.row?.staffRole,
  });

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
