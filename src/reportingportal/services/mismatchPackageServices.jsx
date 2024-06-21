import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

export const fetchMismatchPackages = async (
  corpId,
  setMismatchPackageList,
  setIsLoading
) => {
  setIsLoading(true);
  const url = BASE_URL + `org/getPackageMismatchDetails/${corpId}`;
  const result = await getData(url);
  if (result.error) {
    setMismatchPackageList([]);
    setIsLoading(false);
  } else {
    const temp = result.data
      .filter((item) => item.empId)
      .map((item, index) => ({
        ...item,
        packageName: item.packageName || "",
      }));
    setMismatchPackageList(temp);
    setIsLoading(false);
  }
};
