export async function searchMeals(query, signal) {
    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
        { signal }
    );
    if (!res.ok) throw new Error("Search failed. Try again.");
    const data = await res.json();
    return data.meals ?? [];
}

// TheMealDB stores ingredients as strIngredient1..20 and strMeasure1..20
export function getIngredients(meal) {
    const items = [];
    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`]?.trim();
        const measure = meal[`strMeasure${i}`]?.trim();
        if (name) items.push(`${measure ?? ""} ${name}`.trim());
    }
    return items;
}

//keeps the url logic in api
export function getPreviewUrl(url) {
    return url ? `${url}/preview` : "";
}