import { TextField } from "@mui/material";

const CustomTextField = (params) => {
  return (
    <TextField
      {...params}
      sx={{
        "& fieldset": {
          fontSize: 11,
          height: 41,
          borderRadius: 3,
        },
      }}
      InputProps={{
        style: {
          fontSize: 11,
          fontWeight: 600,
          color: "#000",
          fontFamily: "Poppins",
          fontStyle: "normal",
        },
      }}
      InputLabelProps={{
        style: {
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: 10,
          color: "#000",
          lineHeight: "normal",
          opacity: 0.8,
        },
      }}
    />
  );
};

export default CustomTextField;
