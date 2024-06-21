import React from "react";
import Tooltip from "@mui/material/Tooltip";

const RangeTooltip = ({
  value,
  acceptableRangeMin,
  acceptableRangeMax,
  biorefRangeMin,
  biorefRangeMax,
}) => {
  return (
    <Tooltip
      title={
        acceptableRangeMin ||
        acceptableRangeMax ||
        biorefRangeMin ||
        biorefRangeMax ? (
          <>
            <div>
              Acceptable Range: {acceptableRangeMin || 0} -{" "}
              {acceptableRangeMax || 0}
            </div>
            <div>
              Bioref Range: {biorefRangeMin || 0} - {biorefRangeMax || 0}
            </div>
          </>
        ) : (
          ""
        )
      }
      arrow
    >
      <span>{value}</span>
    </Tooltip>
  );
};

export default RangeTooltip;
