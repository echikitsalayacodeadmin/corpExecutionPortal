import React, { Fragment, useEffect, useState } from "react";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { getData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";

const LocationList = ({ setSelectedLocation, fetch }) => {
  const [value, setValue] = useState("");
  const [regionList, setRegionList] = useState([]);

  const fetchRegionList = async () => {
    const url = BASE_URL + "corpSales/locations/all";
    const result = await getData(url);
    if (result?.data) {
      setRegionList(result?.data);
    } else {
      setRegionList([]);
    }
  };

  useEffect(() => {
    fetchRegionList();
  }, [fetch]);

  return (
    <Fragment>
      <CustomAutocomplete
        label="Location List"
        options={regionList}
        value={value}
        placeholder="Select Location"
        getOptionLabel={(option) => option || ""}
        onChange={(event, newValue, reason) => {
          setValue(newValue);
          setSelectedLocation(newValue);
          if (reason === "clear") {
            setValue("");
            setSelectedLocation("");
          }
        }}
      />
    </Fragment>
  );
};

export default LocationList;
