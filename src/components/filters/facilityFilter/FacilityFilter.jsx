import React from "react";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

function FacilityFilter({ setFacilityFilter, facilityValues }) {
  const handleChange = (event) => {
    setFacilityFilter({
      [event.target.name]: event.target.checked,
    });
  };
  const { spa, wifi, bar, cafe } = facilityValues;
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Facility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={spa} onChange={handleChange} name="spa" />
            }
            label="Spa"
          />
          <FormControlLabel
            control={
              <Checkbox checked={wifi} onChange={handleChange} name="wifi" />
            }
            label="Wi-Fi"
          />
          <FormControlLabel
            control={
              <Checkbox checked={bar} onChange={handleChange} name="bar" />
            }
            label="Bar"
          />
          <FormControlLabel
            control={
              <Checkbox checked={cafe} onChange={handleChange} name="cafe" />
            }
            label="Cafe"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}

export default FacilityFilter;
