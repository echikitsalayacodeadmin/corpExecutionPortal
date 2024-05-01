import { Grid } from "@mui/material";
import { TextFieldItem } from "./customTextField";

const TextFieldCompsNew = ({
  formValues,
  setFormValues,
  TextFieldList,
  gridSize = 4,
}) => {
  return (
    <Grid
      container
      columnSpacing={3}
      display="flex"
      alignItems="center"
      rowSpacing={1}
    >
      {TextFieldList.filter((val) => val?.visibility).map((item, index) => (
        <Grid item lg={gridSize} xs={6} key={index}>
          <TextFieldItem
            title={item.title}
            property={item.property}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TextFieldCompsNew;
