import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { getCompanyList } from "../../../services/genericTicketingSystem";

const ChooseCompanyForm = ({ formValues, setFormValues }) => {
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    getCompanyList(setCompanyList);
  }, []);

  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Select Company:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              size="small"
              fullWidth
              value={formValues.company}
              label=""
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  company: e.target.value,
                })
              }
            >
              <MenuItem disabled value="">
                <em>Select Company...</em>
              </MenuItem>
              {companyList.map((value, index) => (
                <MenuItem value={value} key={index}>
                  {value.orgName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Fragment>
  );
};

export default ChooseCompanyForm;
