import { BASE_URL } from "../../assets/constants";
import { saveData } from "../assets/reportingServices";

export const handleRefreshColumns = async (corpId, enqueueSnackbar, state) => {
  const url =
    BASE_URL +
    `org/nullFieldsTracker/refreshStatus?corpId=${corpId}&nullColumnsPresent=${state}`;
  const response = await saveData(url, "");
  if (response.data) {
    enqueueSnackbar(
      `Successfully ${
        state ? "Changed Columns to Original State" : "Refreshed"
      } Please check in Client Side`,
      {
        variant: "success",
      }
    );
  } else {
    console.log({ ERROR: response.error });
    enqueueSnackbar("An error occured", {
      variant: "error",
    });
  }
};
