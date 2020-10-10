import React, { Component } from "react";
import Container from "../../components/common/DashboardLayout/dashboardLayout";
import ItemList from "../../components/itemsList/ItemList";
// import data from "../../data/data.json";
import Filters from "../../components/filters/Filters";
import Box from "@material-ui/core/Box";
import AppliedFilters from "../../components/appliedFilters/AppliedFilters";
import instance from '../../axios';

const styles = {
  filterWrap: {
    width: "250px",
  },
  spaceY: {
    margin: "1rem 0",
  },
};

let data = []

export class Homepage extends Component {
  state = {
    items: [],
    starFilter: [],
    propFilter: [],
    facilityFilter: [],
    priceFilter: [],
    itemsFound: true,
    starValues: {
      five: false,
      four: false,
      three: false,
    },
    propValues: {
      apartment: false,
      holiday: false,
      guest: false,
      resort: false,
      bnb: false,
    },
    facilityValues: {
      spa: false,
      wifi: false,
      bar: false,
      cafe: false,
    },
    priceValues: [100, 1000],
    searchValue: "",
  };

  componentDidMount() {
    this.getCafes()
  }

  getCafes = () => {
    instance.get('/cafes').then(res => {
      this.setState({
        items: res.data,
      });
      data = res.data
    })
  }

  searchItem = (e) => {
    this.setState(
      {
        searchValue: e.target.value,
      },
      () => this.applyFilters(e)
    );
  };

  setPropFilter = (propertyType) => {
    const propertyTypes = {
      ...this.state.propValues,
      ...propertyType,
    };
    const propArr = [];
    for (const item in propertyTypes) {
      if (propertyTypes[item]) {
        propArr.push(item);
      }
    }

    this.setState(
      {
        propFilter: propArr,
        propValues: propertyTypes,
      },
      () => this.applyFilters()
    );
  };

  setFacilityFilter = (facility) => {
    const facilities = {
      ...this.state.facilityValues,
      ...facility,
    };
    const facilityArr = [];
    for (const item in facilities) {
      if (facilities[item]) {
        facilityArr.push(item);
      }
    }
    this.setState(
      {
        facilityFilter: facilityArr,
        facilityValues: facilities,
      },
      () => this.applyFilters()
    );
  };

  setPriceFilter = (priceRange) => {
    this.setState(
      {
        priceFilter: priceRange,
        priceValues: priceRange,
      },
      () => this.applyFilters()
    );
  };

  setStarFilter = (rating) => {
    const ratings = {
      ...this.state.starValues,
      ...rating,
    };

    const starArr = [];
    for (const item in ratings) {
      switch (item) {
        case "five":
          if (ratings[item]) {
            starArr.push(5);
          }
          break;
        case "four":
          if (ratings[item]) {
            starArr.push(4);
          }
          break;
        case "three":
          if (ratings[item]) {
            starArr.push(3);
          }
          break;
        default:
          return;
      }
    }

    this.setState(
      {
        starFilter: starArr,
        starValues: ratings,
      },
      () => this.applyFilters()
    );
  };

  // Remove Filters
  deleteFilter = (prop, value) => {
    const {
      starFilter,
      starValues,
      propFilter,
      propValues,
      facilityValues,
      facilityFilter,
    } = this.state;

    let starFinal;
    switch (prop) {
      case "star":
        switch (value) {
          case 5:
            starFinal = "five";
            break;
          case 4:
            starFinal = "four";
            break;
          case 3:
            starFinal = "three";
            break;
          default:
            return;
        }
        this.setState(
          {
            starValues: {
              ...starValues,
              [starFinal]: false,
            },
            starFilter: starFilter.filter((item) => item !== value),
          },
          () => this.applyFilters()
        );
        break;
      case "prop":
        this.setState(
          {
            propValues: {
              ...propValues,
              [value]: false,
            },
            propFilter: propFilter.filter((item) => item !== value),
          },
          () => this.applyFilters()
        );
        break;
      case "facility":
        this.setState(
          {
            facilityValues: {
              ...facilityValues,
              [value]: false,
            },
            facilityFilter: facilityFilter.filter((item) => item !== value),
          },
          () => this.applyFilters()
        );
        break;
      case "price":
        this.setState(
          {
            priceValues: value,
            priceFilter: [],
          },
          () => this.applyFilters()
        );
        break;
      default:
        return;
    }
  };

  // Apply Filters
  applyFilters = (e) => {
    const { starFilter, propFilter, items, facilityFilter, priceFilter } = this.state;
    let updatedList = data;

    // Apply star filters
    if (starFilter.length) {
      updatedList = updatedList.filter((item) => {
        let matchItem;
        starFilter.forEach((star) => {
          if (star == item.cafeRating) {
            matchItem = item;
          }
        });
        return matchItem;
      });
    }

    // Apply property filters
    if (propFilter.length !== 0) {
      updatedList = updatedList.filter((item) => {
        let matchItem;
        propFilter.forEach((prop) => {
          if (prop === item.property_type) {
            matchItem = item;
          }
        });
        return matchItem;
      });
    }

    // Apply facility filter
    if (facilityFilter.length) {
      updatedList = updatedList.filter((item) => {
        let result = [];
        facilityFilter.forEach((facility) => {
          if (item.facility.includes(facility)) {
            result.push(true);
          } else {
            result.push(false);
          }
        });
        if (!result.includes(false)) {
          return item;
        }
      });
    }

    // Apply Price Filter
    if (priceFilter.length) {
      const minPrice = priceFilter[0];
      const maxPrice = priceFilter[1];

      updatedList = updatedList.filter(
        (item) => item.costForTwo >= minPrice && item.costForTwo <= maxPrice
      );
    }

    updatedList = updatedList.filter((item) => {
        return item.name.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1
      }
    );

    if (!updatedList.length) {
      this.setState({
        itemsFound: false,
        items: updatedList,
      });
    } else {
      this.setState({
        itemsFound: true,
        items: updatedList,
      });
    }
  };

  render() {
    const {
      items,
      itemsFound,
      starFilter,
      priceFilter,
      propFilter,
      facilityFilter,
      starValues,
      propValues,
      facilityValues,
      priceValues,
    } = this.state;
    return (
      <Container searchItem={this.searchItem} getCafes={this.getCafes}>
        <Box display="flex">
          <div style={styles.filterWrap}>
            <AppliedFilters
              starFilter={starFilter}
              propFilter={propFilter}
              facilityFilter={facilityFilter}
              priceFilter={priceFilter}
              deleteFilter={this.deleteFilter}
            />
            <Filters
              starValues={starValues}
              propValues={propValues}
              priceValues={priceValues}
              facilityValues={facilityValues}
              setStarFilter={this.setStarFilter}
              setPropFilter={this.setPropFilter}
              setFacilityFilter={this.setFacilityFilter}
              setPriceFilter={this.setPriceFilter}
            />
          </div>
          <ItemList items={items} itemsFound={itemsFound} />
        </Box>
      </Container>
    );
  }
}

export default Homepage;
