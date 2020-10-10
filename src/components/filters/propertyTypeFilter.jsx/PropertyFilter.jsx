import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function PropertyTypeFilter({ propValues, setPropFilter }) {
  const handleChange = (event) => {
    setPropFilter({
      [event.target.name]: event.target.checked,
    });
  };
  const { apartment, holiday, guest, resort, bnb } = propValues;
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Property Type</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={apartment}
                onChange={handleChange}
                name="apartment"
              />
            }
            label="apartment"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={holiday}
                onChange={handleChange}
                name="holiday"
              />
            }
            label="Holiday"
          />
          <FormControlLabel
            control={
              <Checkbox checked={guest} onChange={handleChange} name="guest" />
            }
            label="Guest"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={resort}
                onChange={handleChange}
                name="resort"
              />
            }
            label="Resort"
          />
          <FormControlLabel
            control={
              <Checkbox checked={bnb} onChange={handleChange} name="bnb" />
            }
            label="BnB"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}

export default PropertyTypeFilter;
