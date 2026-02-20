import { useProducts } from "../../../hooks/Products";
import { useSearch } from "../../../hooks/useSearch";
import { useCallback } from "react";
import debounce from "just-debounce-it";
import type { SortBy } from "../../../../types.d";

interface searchProps {
  limit: number;
  page: number;
  sorted: SortBy;
  asc: boolean;
}

export function SearchProducts({ limit, page, sorted, asc }: searchProps) {
  const { searchFetchProducts } = useProducts();
  const { search, updateSearch, error } = useSearch();
  const debouncedGetMovies = useCallback(
    debounce(async (search: string) => {
      await searchFetchProducts(search, limit, page, sorted, asc);
    }, 500),
    [],
  );
  const handleSubmit = (event: any) => {
    event.preventDefault();
    searchFetchProducts(search, limit, page, sorted, asc);

    //const fields = new window.FormData(event.target);
    //const query = fields.get("query");
  };

  const handleChange = (event: any) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
    //searchFetchProducts(search, limit, page, sorted, asc);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        style={{
          border: "1px solid transparent",
          borderColor: error ? "red" : "transparent",
        }}
        onChange={handleChange}
        value={search}
        name="query"
        type="text"
        placeholder="Star Wars, Avenger..."
      />
      <input type="checkbox" />
      <button type="submit">Buscar</button>
    </form>
  );
}
