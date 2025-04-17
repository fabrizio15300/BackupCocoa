import React, { useState } from 'react';

const Searchbar = ({ onSearch }) => {
  const [searchTerm,setSearchTerm] = useState('');

//funzione che handla la ricerca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); //ricerca in tempo reale con onSearch()
  };

  return (
    <input
      type="text"
      placeholder="Cerca prodotti..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};
export default Searchbar;
