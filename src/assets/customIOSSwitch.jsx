import { FormControlLabel, Stack } from "@mui/material";
import { CustomTypography } from "./customTypography";
import { IOSSwitch } from "./customSwitch";

export const CustomIOSSwitch = ({
  title,
  property,
  formValues,
  setFormValues,
}) => {
  return (
    <Stack>
      <CustomTypography>{title}</CustomTypography>
      <FormControlLabel
        control={
          <IOSSwitch
            sx={{ m: 2 }}
            checked={formValues[property] || false}
            onChange={(e) => {
              let newFormValues = { ...formValues };
              newFormValues[property] = e.target.checked;
              setFormValues(newFormValues);
            }}
          />
        }
        label=""
      />
    </Stack>
  );
};
