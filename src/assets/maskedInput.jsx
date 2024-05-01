import * as React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import TextField from "@mui/material/TextField";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000/000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function CustomMaskedInput({
  title,
  property,
  formValues,
  setFormValues,
}) {
  const handleChange = (e) => {
    console.log({ match: /^\d{1,3}\/\d{1,3}$/.test(e.target.value) });

    let newFormValues = { ...formValues };
    newFormValues[property] = e.target.value;
    setFormValues(newFormValues);
  };

  return (
    <React.Fragment>
      <TextField
        size="small"
        //label="react-number-format"
        value={formValues[property] || ""}
        onChange={handleChange}
        name={property}
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: TextMaskCustom,
        }}
        error={
          formValues[property]
            ? !/^\d{1,3}\/\d{1,3}$/.test(formValues[property])
            : false
        }
        helperText={
          formValues[property]
            ? /^\d{1,3}\/\d{1,3}$/.test(formValues[property])
              ? ""
              : "Enter valid Values!"
            : ""
        }
      />
    </React.Fragment>
  );
}
