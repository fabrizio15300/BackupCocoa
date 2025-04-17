import React, { useState } from "react";

const FilterBar = ({ onSortChange, onDiscountToggle }) => {
  const [sortOrder,setSortOrder] = useState(""); //stato dropdown

  //ordinamento dei prodotti della grid
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    onSortChange(e.target.value);
  };

  return (
    <div className="bg-stone-50 p-4 rounded-none shadow-sm place-items-end mr-6">

      <div>
        <label className="mr-2 text-gray-700">Ordina per:</label>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-700 p-2 rounded-none"
        >
          <option value="">Default</option>
          <option value="asc">Nome A-Z</option>
          <option value="desc">Nome Z-A</option>
          <option value="prezzoBassoAlto">Prezzo basso-alto</option>
          <option value="prezzoAltoBasso">Prezzo alto-basso</option>
        </select>
      </div>

    </div>
  );
};

export default FilterBar;