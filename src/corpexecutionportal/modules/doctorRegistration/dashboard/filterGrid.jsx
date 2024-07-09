import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import { Fragment } from "react"

const FilterGrid = ({
  handleShowAll,
  selectedDocId,
  handleChangeDoctor,
  doctorList,
  statusList,
  handleChangeStatus,
}) => {
  return (
    <Fragment>
      <Grid
        display={{ lg: "flex", xs: "block" }}
        sx={{
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          border: "0.5px solid #D9D9D9",
          borderRadius: "15px",
          paddingBlock: "5px",
          paddingInline: "5px",
        }}>
        <Grid item lg={4} xs={12} sx={{ cursor: "pointer" }} onClick={handleShowAll}>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "13px",
              lineHeight: "15px",
              color: "#000000",
              textAlign: "center",
              marginBlock: "10px",
            }}>
            Show All
          </Typography>
        </Grid>
        <Divider sx={{ border: "0.5px solid #D4D4D4", transform: "rotate(0deg)" }} />
        <Grid
          item
          lg={4}
          xs={12}
          component="form"
          sx={{
            textAlign: "center",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}>
          <FormControl>
            <Select
              variant="outlined"
              sx={{
                background: "#fff",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "15px",
              }}
              size="small"
              displayEmpty
              value={selectedDocId}
              onChange={handleChangeDoctor}>
              <MenuItem value="" disabled>
                Select Doctor
              </MenuItem>
              {doctorList.map((item, index) => (
                <MenuItem key={index} value={item.docId}>
                  {item.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Divider sx={{ border: "0.5px solid #D4D4D4", transform: "rotate(0deg)" }} />
        <Grid
          item
          lg={4}
          xs={12}
          component="form"
          sx={{
            textAlign: "center",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}>
          <FormControl>
            <Select
              variant="outlined"
              sx={{
                background: "#fff",
                fontWeight: "400",
                fontSize: "13px",
                lineHeight: "15px",
              }}
              size="small"
              displayEmpty
              value={statusList}
              onChange={handleChangeStatus}>
              <MenuItem value="" disabled>
                Select Status
              </MenuItem>
              <MenuItem value="LIVE & UPCOMING">Live & Upcoming</MenuItem>
              <MenuItem value="LIVE">Live</MenuItem>
              <MenuItem value="ATTENDED">Attended</MenuItem>
              <MenuItem value="UPCOMING">Upcoming</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default FilterGrid
