import React from "react";
import Typography from "@material-ui/core/Typography";
import StarFilter from "./starFilter/StarFilter";
import PropertyTypeFilter from "./propertyTypeFilter.jsx/PropertyFilter";
import FacilityFilter from "./facilityFilter/FacilityFilter";
import PriceFilter from "./priceFilter/PriceFilter";

const styles = {
  spaceY: {
    margin: "1rem 0",
  },
};

function Filters(props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Set Filters
      </Typography>
      <div style={styles.spaceY}>
        <PriceFilter
          setPriceFilter={props.setPriceFilter}
          priceValues={props.priceValues}
        />
      </div>
      <div style={styles.spaceY}>
        <StarFilter
          setStarFilter={props.setStarFilter}
          starValues={props.starValues}
        />
      </div>
    </div>
  );
}

export default Filters;
