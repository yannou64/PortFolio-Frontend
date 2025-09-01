import "./MyButton.scss";

export default function MyButton({ lien, titre }) {
  return (
    <a className="myLink" href={lien} target="_blank">
      <button className="myButton">{titre}</button>
    </a>
  );
}
