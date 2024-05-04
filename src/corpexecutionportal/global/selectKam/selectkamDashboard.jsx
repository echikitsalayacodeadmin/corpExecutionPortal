import React, { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/corpServices";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Autocomplete, Checkbox, IconButton, TextField } from "@mui/material";
import CustomAutocomplete from "../../../assets/customAutocomplete";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectkamDashboard = ({
  selectedUserName,
  setSelectedUserName,
  userId,
  setUserId,
}) => {
  const [kamList, setKamList] = useState([]);
  const fetchData = async () => {
    const url =
      "https://apibackend.uno.care/api/patient/role?role=CORPSALES_USER";
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
        label={"Select Associates"}
        placeholder={"Select Associates"}
        value={selectedUserName}
        getOptionLabel={(option) => option.name}
        options={kamList.map((user) => user.name)} // Removed redundant null check
        onChange={(event, value, reason) => {
          console.log("Selected User:", value);
          setSelectedUserName(value);
          const selectedUser = kamList.find((user) => user.name === value); // Changed userList to kamList
          if (selectedUser) {
            setUserId(selectedUser.id);
          } else {
            setUserId("");
          }
          if (reason === "clear" || value === null) {
            // Added check for value being null
            setUserId("");
            setSelectedUserName("");
          }
        }}
      />
    </Fragment>
  );
};

export default SelectkamDashboard;
