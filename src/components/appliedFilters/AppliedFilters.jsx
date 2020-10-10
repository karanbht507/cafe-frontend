import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import StarRateIcon from "@material-ui/icons/StarRate";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const styles = {
  chipStyles: {
    display: "inline-block",
    margin: ".3rem",
  },
};

function AppliedFilters({
  starFilter,
  propFilter,
  facilityFilter,
  priceFilter,
  deleteFilter,
}) {
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    if (
      !starFilter.length &&
      !propFilter.length &&
      !facilityFilter.length &&
      !priceFilter.length
    ) {
      setFilterApplied(false);
    } else {
      setFilterApplied(true);
    }
  }, [starFilter, propFilter, facilityFilter, priceFilter]);

  const handleDelete = (prop, value) => {
    deleteFilter(prop, value);
  };

  if (filterApplied) {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Applied Filters
        </Typography>

        {starFilter &&
          starFilter.map((item) => (
            <span style={styles.chipStyles} key={item}>
              <Chip
                size="small"
                icon={<StarRateIcon />}
                label={item}
                onDelete={() => handleDelete("star", item)}
              />
            </span>
          ))}
        {priceFilter[0] && (
          <span style={styles.chipStyles}>
            <Chip
              size="small"
              icon={<AttachMoneyIcon />}
              label={`${priceFilter[0]}-${priceFilter[1]}`}
              onDelete={() => handleDelete("price", [100, 1000])}
            />
          </span>
        )}
      </div>
    );
  }

  return null;
}

export default AppliedFilters;
