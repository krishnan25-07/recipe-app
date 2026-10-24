import { useEffect, useState } from "react";
import "./App.css";
import { searchMeals } from "./api/mealdb";
import useDebounce from "./hooks/useDebounce";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [meals, setMeals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMeals([]);
      return;
    }

    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError("");
      try {
        const results = await searchMeals(debouncedQuery, controller.signal);
        setMeals(results);
      } catch (err) {
        if (err.name !== "AbortError") setError("Could not load recipes. Try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    run();
    return () => controller.abort(); // cancel the previous request when the query changes
  }, [debouncedQuery]);

  function handleQueryChange(value) {
    setQuery(value);
    setSelected(null);
  }

  return (
    <main className="app">
      <div className="panel">
        <h1>Recipe Finder</h1>
        <SearchBar value={query} onChange={handleQueryChange} />

        {loading && <p className="muted">Searching...</p>}
        {error && <p role="alert" className="error">{error}</p>}
        {!loading && debouncedQuery && meals.length === 0 && !error && (
          <p className="muted">No recipes found for "{debouncedQuery}".</p>
        )}

        {selected ? (
          <RecipeDetail meal={selected} onBack={() => setSelected(null)} />
        ) : (
          <ul className="grid">
            {meals.map((meal) => (
              <li key={meal.idMeal}>
                <RecipeCard meal={meal} onSelect={setSelected} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}