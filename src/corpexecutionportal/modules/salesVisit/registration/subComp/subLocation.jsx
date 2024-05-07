import React, { Fragment } from "react";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";

const SubLocation = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChangeVisitType = (event, newValue, reason) => {
    setSelectedValue(newValue);
    setFormValues({ ...formValues, sub: newValue });
    if (reason === "clear") {
      setSelectedValue({
        value: "",
        label: "",
      });
      setFormValues({ ...formValues, priority: "" });
    }
  };

  useEffect(() => {
    setSelectedValue(formValues.priority);
  }, [formValues]);
  return (
    <Fragment>
      <CustomAutocomplete
        options={[
          "Sector 1 - Pithampur",
          "Sector 2 - Pithampur",
          "Sector 3 - Pithampur",
          "Pahadi Pithampur",
          "Suhagpur Pithampur",
          "Pharma SEZ Pithampur",
          "SEZ 1 Pithampur",
          "Sanwar Road Indore",
          "Poleground Indore",
          "Vijay Nagar Indore",
          "Machal Indore",
          "Within City",
        ]}
        label="Sub Location"
        getOptionLabel={(option) => option}
        placeholder="Sub Location"
        value={selectedValue}
        onChange={handleChangeSubLoaction}
      />
    </Fragment>
  );
};

export default SubLocation;
