import { Grid } from "@mui/material";
import { CustomIOSSwitch } from "./customIOSSwitch";

const SwitchComps = ({
  formValues,
  setFormValues,
  SwitchFieldList,
  columns = 16,
}) => {
  return (
    <Grid
      container
      columns={columns}
      columnSpacing={3}
      display="flex"
      alignItems="center"
      rowSpacing={1}
    >
      {SwitchFieldList.filter((item) => item.display).map((item, index) => (
        <Grid item lg={2} xs={columns / 2} key={index}>
          <CustomIOSSwitch
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

export default SwitchComps;
