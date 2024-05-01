import { Stack, TextField } from "@mui/material";
import { CustomTypography } from "./customTypography";
import { Fragment } from "react";
import CustomMaskedInput from "./maskedInput";

export const TextFieldItem = ({
  title,
  property,
  formValues,
  setFormValues,
}) => {
  return (
    <Stack>
      <CustomTypography>{title}</CustomTypography>

      {property === "bp" ? (
        <Fragment>
          <CustomMaskedInput
            title={title}
            property={property}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </Fragment>
      ) : (
        <TextField
          size="small"
          variant="outlined"
          value={formValues[property] || ""}
          onChange={(e) => {
            let newFormValues = { ...formValues };
            newFormValues[property] = e.target.value;
            setFormValues(newFormValues);
          }}
        />
      )}
    </Stack>
  );
};
