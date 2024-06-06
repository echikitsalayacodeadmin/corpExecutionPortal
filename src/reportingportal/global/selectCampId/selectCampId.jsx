import { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/reportingServices";
import CustomSelect from "../../../assets/customSelect";

const SelectCampId = ({
  selectedCampId,
  setSelectedCampId,
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [listOfCampId, setListOfCampId] = useState([]);
  const fetchListOfCamp = async () => {
    const url = BASE_URL + "org/camp/list/" + corpId;
    const result = await getData(url);
    if (result.error) {
      setListOfCampId([]);
      setSelectedCampId("null");
    } else {
      const temp = result?.data?.map((item, index) => ({
        label: item?.displayName,
        value: item?.id,
      }));
      setListOfCampId(temp);
      setSelectedCampId(result.data?.[0]?.id || "null");
    }
  };

  useEffect(() => {
    fetchListOfCamp();
  }, []);
  return (
    <Fragment>
      {listOfCampId.length !== 0 && (
        <CustomSelect
          disabled={listOfCampId.length === 0 ? true : false}
          width={120}
          value={selectedCampId}
          setvalue={setSelectedCampId}
          options={listOfCampId}
          label="Select Camp"
        />
      )}
    </Fragment>
  );
};

export default SelectCampId;
