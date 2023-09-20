import "./style.css";

export function MiniContact({ contact, onClick }) {
  return (
    <li className="miniContactContainer" onClick={onClick}>
      {contact.name}
    </li>
  );
}
