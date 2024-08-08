import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { getData } from "../../../assets/corpServices";

export const getAttendanceDetailsByDateAndCorpId = async (
  corpId,
  filterDate,
  setAttendanceDetails
) => {
  const url =
    BASE_URL +
    `staff/corp/attendance?filterDate=${filterDate}&corpId=${corpId}`;
  const response = await getData(url);

  if (response.error) {
    setAttendanceDetails([]);
    enqueueSnackbar("Failed to retrieve data!", {
      variant: "error",
    });
  } else {
    setAttendanceDetails(response.data.map((v, i) => ({ id: i + 1, ...v })));
  }
};
