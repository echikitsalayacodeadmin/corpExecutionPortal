import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

export const getCampList = async (corpId, setCampCycleIdList) => {
  const url = BASE_URL + `org/camp/list/${corpId}`;
  const camp = await getData(url);
  if (camp.error) {
    console.log({ errorGettingCampList: camp.error });
  } else {
    console.log({ CAMPID: camp.data });
    setCampCycleIdList(camp.data);
  }
};
