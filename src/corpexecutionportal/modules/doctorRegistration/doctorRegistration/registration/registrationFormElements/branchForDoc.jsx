import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { BASE_URL } from "../../../../../../assets/constants";
import { getData } from "../../../../../assets/corpServices";

const BranchForDoc = ({ branchId, setBranchId }) => {
  const [branchList, setBranchList] = useState([]);

  const fetchBranchList = async () => {
    const url = BASE_URL + "branch/all";

    const branches = await getData(url);

    if (branches.error) {
      console.log("error");
    } else {
      console.log("succes");
      setBranchList(branches.data);
    }
  };

  useEffect(() => {
    fetchBranchList();
  }, []);

  console.log({ branchList: branchList });
  return (
    <Fragment>
      <Box>
        <FormControl fullWidth size="small">
          <InputLabel id="branch-id-label">Branch*:</InputLabel>
          <Select
            labelId="branch-id"
            id="branch-id"
            value={branchId}
            label="Branch*:"
            onChange={(e) => {
              setBranchId(e.target.value);
            }}
          >
            {branchList.map((option) => (
              <MenuItem key={option.branchId} value={option.branchId}>
                {option.branchName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Fragment>
  );
};

export default BranchForDoc;
