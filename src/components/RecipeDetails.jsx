import { getIngredients } from "../api/mealdb";

export default function RecipeDetail({ meal, onBack }) {
    return (
        <article className="detail">
            <button className="back" onClick={onBack}>← Back to results</button>
            <h2>{meal.strMeal}</h2>
            <p className="muted">{meal.strCategory} · {meal.strArea}</p>
            <img src={meal.strMealThumb} alt={meal.strMeal} />

            <h3>Ingredients</h3>
            <ul>
                {getIngredients(meal).map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <p className="instructions">{meal.strInstructions}</p>
        </article>
    );
}