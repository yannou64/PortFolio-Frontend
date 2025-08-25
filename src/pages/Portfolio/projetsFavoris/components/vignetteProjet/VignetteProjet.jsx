import "./vignetteProjet.scss"

export default function VignetteProjet({titre, description, image, technos}){
    return (
        <article className="vignette">
            <div>
                <h3>{titre}</h3>
                <p>{description}</p>
                <div className="listeTechno">
                    
                </div>
            </div>
            <a href="#"><img alt="" src={image}/></a>
        </article>
    )
}