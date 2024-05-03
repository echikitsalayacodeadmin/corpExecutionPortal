import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/corpServices";

export const fetchAllCorps = async (setCorpDataList, setIsLoading) => {
  setIsLoading(true);
  const url = BASE_URL + "corpSales/all/corps";
  const result = await getData(url);
  if (result.data) {
    setIsLoading(false);
    setCorpDataList(result.data);
  } else {
    setIsLoading(false);
    setCorpDataList([]);
  }
};

export const fetchCorpDetails = async (
  setCorpDetail,
  setIsLoading,
  corpSalesId,
  removeFields,
  field,
  emptyArray,
  emptyString
) => {
  const url = BASE_URL + "corpSales/" + corpSalesId;
  const result = await getData(url);
  if (result?.data) {
    setIsLoading(false);
    let modifiedData = "";
    if (removeFields === "true" && field && (emptyArray || emptyString)) {
      modifiedData = {
        ...result.data,
        [field]: emptyArray || emptyString,
      };
      setCorpDetail(modifiedData);
    } else {
      setCorpDetail(result?.data);
    }
  } else {
    setIsLoading(false);
    setCorpDetail("");
  }
};
