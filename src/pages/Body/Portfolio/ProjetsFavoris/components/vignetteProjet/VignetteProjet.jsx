import "./vignetteProjet.scss";

export default function VignetteProjet({ titre, description, image, technos = [], alt }) {
  return (
    <article className="vignette">
      <div className="presentation_projet">
        <h3>{titre}</h3>
        <p>{description}</p>
        <div className="listeTechno">
          {technos.map((techno) => (
            <div key={techno._id} className="container_image">
              <img src={import.meta.env.VITE_API_URL + "/" + techno.image} loading="lazy" alt={techno.alt_img}/>
            </div>
          ))}
        </div>
      </div>
      <a className="image_lien_projet" href="#">
        <img alt={alt} src={image} loading="lazy" />
      </a>
      {/* Pour le responsive  */}
      <div className="listeTechno_second_view">
        {technos.map((techno) => (
          <div key={techno._id} className="container_image">
            <img src={import.meta.env.VITE_API_URL + "/" + techno.image} loading="lazy" alt={techno.alt_img}/>
          </div>
        ))}
      </div>
    </article>
  );
}
