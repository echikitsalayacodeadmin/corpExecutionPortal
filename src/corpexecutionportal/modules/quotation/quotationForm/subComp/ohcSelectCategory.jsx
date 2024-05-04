import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Box, Menu, Typography } from "@mui/material";
import { getData } from "../../../../assets/corpServices";
import { BASE_URL } from "../../../../../assets/constants";

const OhcSelectCategory = ({ setSelectedItem }) => {
  const [categories, setCategories] = React.useState([]);
  const fetchCategoryList = async () => {
    const url = BASE_URL + "quotation/data/ohc/categories";
    try {
      const response = await getData(url);
      if (response?.data) {
        setCategories(response.data);
      } else {
        console.error("Error fetching data:", response?.error);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCategories([]);
    }
  };

  React.useEffect(() => {
    fetchCategoryList();
  }, []);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpenMenu}>
        Add Row
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              setSelectedItem(category);
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "15px",
                lineHeight: "15px",
                color: "#000000",
              }}
            >
              {category}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default OhcSelectCategory;
