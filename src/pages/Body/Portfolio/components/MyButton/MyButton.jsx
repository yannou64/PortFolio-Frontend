import "./MyButton.scss";

export default function MyButton({ id, lien, titre }) {
  return (
    <a className="myLink" href={lien} target="_blank">
      <button form={id} className="myButton">{titre}</button>
    </a>
  );
}
