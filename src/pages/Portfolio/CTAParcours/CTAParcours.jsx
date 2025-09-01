import "./CTAParcours.scss"
import MyButton from "../components/MyButton/MyButton.jsx"

export default function CTAParcours(){
    return (
        <section id="CTAParcours">
            <h2>Mon parcours</h2>
            {/* myStyle :
                1 : background myOrange, color myWhite
                2 : backgroud myWhite, color myOrange
             */}
            <MyButton lien="../../../../public/Documents/cv-yannick-biot.pdf" titre="En savoir +" className="myButton" />
        </section>
    )
}