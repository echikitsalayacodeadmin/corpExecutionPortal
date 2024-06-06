import { TextField, useIsFocusVisible } from "@mui/material";

export const CustomTextfield = (props) => {
  return (
    <TextField
      fullWidth
      placeholder={props.placeholder}
      label={useIsFocusVisible ? props.label : ""}
      size="small"
      InputLabelProps={{
        style: { color: "#127DDD", fontSize: 14 },
      }}
      sx={{
        label: {
          marginTop: 0,
          "&.Mui-focused": {
            marginTop: -1,
          },
        },
        fieldset: { border: "none" },
        input: { background: "white", borderRadius: 2 },
      }}
      InputProps={{ style: { color: "#127DDD" } }}
    />
  );
};
