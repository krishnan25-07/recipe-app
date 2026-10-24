import { getPreviewUrl } from "../api/mealdb";

export default function RecipeCard({ meal, onSelect }) {
    return (
        <button className="recipe-card" onClick={() => onSelect(meal)}>
            <img
                src={getPreviewUrl(meal.strMealThumb)}
                alt={meal.strMeal}
                width="200"
                height="200"
                loading="lazy"
                decoding="async"
            />
            <span>{meal.strMeal}</span>
        </button>
    );
}