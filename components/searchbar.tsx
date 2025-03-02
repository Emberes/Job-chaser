import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, filters: { jobId?: string; city?: string; region?: string; workingHours?: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [jobId] = useState("");
  const [workingHours] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, { jobId, workingHours });
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Sök jobb"
        className="search-input"
      />
      <button type="submit" className="search-button">Sök</button>
    </form>
  );
};

export default SearchBar;