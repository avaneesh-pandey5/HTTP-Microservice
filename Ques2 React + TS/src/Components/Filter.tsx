import React from "react";

const Filter = ({ filters, setFilters }) => {
  const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  const categories = [
    "Phone",
    "Computer",
    "TV",
    "Earphone",
    "Tablet",
    "Charger",
    "Mouse",
    "Keypad",
    "Bluetooth",
    "Pendrive",
    "Remote",
    "Speaker",
    "Headset",
    "Laptop",
    "PC",
  ];
  const availabilities = ["yes", "out-of-stock"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="flex space-x-4 mb-4">
      <select
        name="company"
        value={filters.company}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select Company</option>
        {companies.map((company, index) => (
          <option key={index} value={company}>
            {company}
          </option>
        ))}
      </select>

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        name="availability"
        value={filters.availability}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select Availability</option>
        {availabilities.map((availability, index) => (
          <option key={index} value={availability}>
            {availability}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
        className="p-2 border rounded"
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
        className="p-2 border rounded"
      />

      <input
        type="number"
        name="rating"
        placeholder="Min Rating"
        value={filters.rating}
        onChange={handleChange}
        className="p-2 border rounded"
      />
    </div>
  );
};

export default Filter;
