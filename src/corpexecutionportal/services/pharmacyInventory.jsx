import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/corpServices";

export const fetchMedicineInventory = async (setMedicineList, setIsLoading) => {
  setIsLoading(true);
  const url = BASE_URL + `inventory/getAllProducts`;
  const result = await getData(url);
  if (result.error) {
    setIsLoading(false);
    setMedicineList([]);
  } else {
    setIsLoading(false);
    setMedicineList(
      result?.data.map((item, index) => ({ id: index, ...item }))
    );
  }
};
