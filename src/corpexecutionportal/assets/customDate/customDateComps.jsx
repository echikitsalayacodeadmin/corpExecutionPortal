import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CustomDate = ({
  formValues,
  setFormValues,
  label,
  height = 41,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableMaskedInput
        label={label}
        value={formValues.date || null}
        onChange={(newValue) => {
          setFormValues({ ...formValues, date: newValue });
        }}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            required: true,
            label: label,
            placeholder: "DD/MM/YYYY",
            sx: {
              "& fieldset": {
                fontSize: 11,
                height: height,
                borderRadius: 3,
              },
              input: {
                fontSize: 11,
                fontWeight: 600,
                color: "#000",
                fontFamily: "Poppins",
                fontStyle: "normal",
                mt: 0.1,
              },
            },
            InputLabelProps: {
              style: {
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: 10,
                color: "#000",
                lineHeight: "normal",
                opacity: 0.8,
              },
            },
          },
        }}
        format="LL"
      />
    </LocalizationProvider>
  );
};
