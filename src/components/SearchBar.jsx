export default function SearchBar({ value, onChange }) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search recipes, e.g. chicken"
            aria-label="Search recipes"
        />
    );
}