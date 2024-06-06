import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

export const fetchForm21Data = async (corpId, setIsLoading, setForm21Data) => {
  setIsLoading(true);
  const url = BASE_URL + `org/form21?corpId=${corpId}`;
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);
    const temp = response?.data?.map((item, index) => ({
      sno: index + 1,
      ...item,
    }));
    setForm21Data(temp);
  } else {
    setIsLoading(false);
    setForm21Data([]);
  }
};
