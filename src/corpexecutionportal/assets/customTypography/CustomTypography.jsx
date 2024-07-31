import { Typography } from "@mui/material";

export const CustomTypographyTableCell = ({ children, color = "#000" }) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 12,
        lineHeightt: "normal",
        color: color,
        textTransform: "capitalize",
      }}
    >
      {children}
    </Typography>
  );
};
export const CustomTypographyTableHeader = ({ title, color = "#000" }) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "14px",
        lineHeightt: "normal",
        color: color,
        textTransform: "capitalize",
        //opacity: 0.6,
      }}
    >
      {title}
    </Typography>
  );
};
