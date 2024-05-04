import React, { Fragment, useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/corpServices";
import CustomAutocomplete from "../../../assets/customAutocomplete";

const SelectUser = ({
  selectedUserName,
  setSelectedUserName,
  userId,
  setUserId,
}) => {
  const [userList, setUserList] = useState([]);
  const fetchData = async (_status) => {
    const url = BASE_URL + "corpSales/users";
    const result = await getData(url);
    if (result?.data) {
      setUserList(result?.data);
    } else {
      setUserList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Fragment>
      <CustomAutocomplete
        label={"Select User"}
        placeholder={"Select User"}
        value={selectedUserName}
        getOptionLabel={(option) => option}
        options={userList
          ?.filter((item) => item.name !== null)
          ?.map((user) => user?.name)}
        onChange={(event, value, reason) => {
          console.log("Selected User:", value);
          setSelectedUserName(value);
          const selectedUser = userList?.find((user) => user?.name === value);
          if (selectedUser) {
            setUserId(selectedUser.id);
          } else {
            setUserId("");
          }
          if (reason === "clear") {
            setUserId("");
            setSelectedUserName("");
          }
        }}
      />
    </Fragment>
  );
};

export default SelectUser;
