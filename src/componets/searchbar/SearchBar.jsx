import React, { useState } from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [district, setDistrict] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [searchType, setSearchType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      district: district || undefined,
      price: price || undefined,
      city: city || undefined,
      searchType: searchType || undefined,
    };
    onSearch(params);
  };
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setDistrict(""); // Reset district when city changes
  };
  const cities = ["Alexandria", "Cairo", "Aswan"];
  const districtsByCity = {
    Alexandria: ["Seyouf", "San Stefano", "Louran", "Sidi Bishr", "Sidi Gaber"],
    Cairo: ["Maadi", "Heliopolis", "Nasr City", "6th of October"],
    Aswan: ["Daraw", "Edfu", "Abu Simbel"],
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <select
        className={styles.citySelect}
        value={city}
        name="city"
        onChange={handleCityChange}
      >
        <option value="">All cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        className={styles.districtSelect}
        value={district}
        name="district"
        onChange={(e) => setDistrict(e.target.value)}
      >
        <option value="">All districts</option>
        {districtsByCity[city] &&
          districtsByCity[city].map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
      </select>
      <input
        className={styles.priceInput}
        type="number"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <select
        className={styles.typeSelect}
        value={searchType}
        name="searchType"
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Individual">Individual</option>
        <option value="Shared">Shared</option>
      </select>
      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
