import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(BlogContext);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
