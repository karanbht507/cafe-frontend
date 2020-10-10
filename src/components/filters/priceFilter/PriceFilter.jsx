import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 180,
  },
});

export default function PriceFilter({ setPriceFilter, priceValues }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        step={50}
        min={100}
        max={1000}
        value={priceValues}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
}
