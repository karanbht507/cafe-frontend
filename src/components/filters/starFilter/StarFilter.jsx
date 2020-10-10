import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function StarFilter({ starValues, setStarFilter }) {
  const handleChange = (event) => {
    setStarFilter({
      [event.target.name]: event.target.checked,
    });
  };
  const { five, four, three } = starValues;
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Star Category</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={five} onChange={handleChange} name="five" />
            }
            label="five"
          />
          <FormControlLabel
            control={
              <Checkbox checked={four} onChange={handleChange} name="four" />
            }
            label="four"
          />
          <FormControlLabel
            control={
              <Checkbox checked={three} onChange={handleChange} name="three" />
            }
            label="three"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}

export default StarFilter;
