import "./reseaux.scss";
import logoLinkedin from "../../../assets/iconeLinkedin.png";
import logoGithub from "../../../assets/iconeGithub.png";
import logoInsta from "../../../assets/iconeInstagram.png";
import logoGithubDarkMode from "../../../assets/githubDarkMode.png";

export default function Reseaux({ dark = false }) {
  return (
    <div className="reseaux-sociaux">
      <a href="https://www.linkedin.com/in/yannick-64-biot/" target="_blank">
        <img src={logoLinkedin} alt="logo pour le lien vers un compte linkedin" />
      </a>
      <a href="https://github.com/yannou64" target="_blank">
        <img src={dark ? logoGithubDarkMode : logoGithub} alt="logo pour le lien vers un compte github" />
      </a>
      <a href="https://www.instagram.com/yannick.b64/" target="_blank">
        <img src={logoInsta} alt="logo pour le lien vers un compte Instagram" />
      </a>
    </div>
  );
}
