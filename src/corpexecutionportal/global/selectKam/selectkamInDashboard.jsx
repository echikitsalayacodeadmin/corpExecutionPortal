import React, { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/corpServices";
import CustomAutocomplete from "../../../assets/customAutocomplete";

const SelectkamInDashboard = ({
  selectedUserName,
  setSelectedUserName,
  userId,
  setUserId,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [kamList, setKamList] = useState([]);
  const fetchData = async () => {
    const url = BASE_URL + `patient/role?role=CORPSALES_USER`;
    const result = await getData(url);

    if (result?.data) {
      setKamList(result?.data);
    } else {
      setKamList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <CustomAutocomplete
        label={"Associates"}
        placeholder={"Associates"}
        value={selectedValue}
        options={kamList.filter((item) => item.name)}
        getOptionLabel={(option) => option.name || ""}
        onChange={(event, newValue, reason) => {
          if (
            !newValue ||
            !kamList.some((option) => option.name === newValue.name)
          ) {
            setSelectedValue(null); // or set to any default value
            setSelectedUserName("");
            setUserId("");
          } else {
            setSelectedValue(newValue);
            setSelectedUserName(newValue.name);
            setUserId(newValue.id);
          }
          if (reason === "clear") {
            setUserId("");
            setSelectedUserName("");
            setSelectedValue(null);
          }
        }}
      />
    </Fragment>
  );
};

export default SelectkamInDashboard;
