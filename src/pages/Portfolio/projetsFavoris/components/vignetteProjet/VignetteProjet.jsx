import "./vignetteProjet.scss";

export default function VignetteProjet({ titre, description, image, technos = [] }) {
  return (
    <article className="vignette">
      <div>
        <h3>{titre}</h3>
        <p>{description}</p>
        <div className="listeTechno">
          {technos.map((techno) => (
            <div key={techno._id} className="container_image">
              <img src={import.meta.env.VITE_API_URL + "/" + techno.image} />
            </div>
          ))}
        </div>
      </div>
      <a href="#">
        <img alt="" src={image} />
      </a>
      <div className="listeTechno_mobile_view">
        {technos.map((techno) => (
          <div key={techno._id} className="container_image">
            <img src={import.meta.env.VITE_API_URL + "/" + techno.image} />
          </div>
        ))}
      </div>
    </article>
  );
}
