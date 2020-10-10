import React from "react";
import Item from "./item/Item";
import "./itemList.style.css";

function ItemList({ items, itemsFound }) {
  console.log('-----------it', items)
  return (
    <div className="items-grid">
      {!itemsFound && <h1>No items match</h1>}
      {items && items.map((item) => <Item key={item._id} item={item} />)}
    </div>
  );
}

export default ItemList;
