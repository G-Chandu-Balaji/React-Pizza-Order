import  { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setquery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search for Order#"
        value={query}
        onChange={(e) => setquery(e.target.value)}
        className="rounded-full px-3 py-1 bg-yellow-100 w-28 sm:w-64 sm:focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50
        transition-all duration-300 text-sm placeholder:text-stone-600  "
      ></input>
    </form>
  );
}

export default SearchOrder;
