import "./style.css";

export function MiniTag({ tag, onClick }) {
  return (
    <li className="miniTagContainer" onClick={onClick}>
      {tag.name}
    </li>
  );
}
