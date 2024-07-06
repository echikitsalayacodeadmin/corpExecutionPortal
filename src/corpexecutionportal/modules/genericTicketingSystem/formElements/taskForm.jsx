import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { productList } from "../../../assets/corpConstants";

const TaskForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Task:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter task..."
            value={formValues.task || ""}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                task: e.target.value,
              })
            }
          />
        </Box>
      </Stack>
    </Fragment>
  );
};

export default TaskForm;
