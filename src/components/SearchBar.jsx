import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle input change for the search bar
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle the search action when the user submits the form
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Pass the search query to the parent component
    // Clear the search query after submission
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <img
          src="https://w7.pngwing.com/pngs/456/948/png-transparent-computer-icons-desktop-web-search-engine-wordpress-com-search-icon-search-logo-website-circle-wordpresscom-thumbnail.png"
          alt=""
          onClick= {handleSearch}
        />
      </div>
    </form>
  );
};

export default SearchBar;
