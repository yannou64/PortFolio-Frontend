# Description

Application frontend développée en React (avec Vite) permettant de présenter mon portfolio : projets et compétences.
[Lien vers le backend](https://github.com/yannou64/PortFolio-Backend.git)

# Stack technique

- React (hooks, composants fonctionnels)
- Vite (bundler, code splitting, dev server rapide)
- CSS/SCSS (responsive design, accessibilité)

# Variables d'environnement

Le projet utilise des variables d’environnement à définir dans un fichier **.env** à la racine du dossier Frontend-CV.

```bash
    VITE_API_URL=http://localhost:3444
```

Toutes les variables doivent commencer par VITE\_ pour être accessibles dans le code React via **import.meta.env.**

# Installation et lancement

Clonez le dépôt, installez les dépendances et lancez le serveur de développement :

```bash
    git clone https://github.com/yannou64/PortFolio-Frontend.git
    cd Frontend-CV
    npm install
    npm run dev
```

L'application sera disponible sur : http://localhost:5173/

# Build de production

```bash
    npm run build
```

# Aperçu

![Aperçu de l'application](./src/assets/aperçu.webp)

# Eco-conception & Performance & SEO & Accessibilité

- Utilisation du lazy loading sur les images
- Preloading de l'image du hero + **fetchpriority="high"**
- Images au format WebP optimisées
- Images du Hero disponibles en 2 formats différents (WebP) pour s’adapter au navigateur et réduire le poids des ressources, et améliorer le LCP.
- Code splitting géré automatiquement par Vite
- Aria-label pour les inputs et bouton burger
- Aria-control pour le menu burger
- Alt renseigné pour toutes les images du projet
- Design responsive mobile-first
- **H1**, Méta donnée **title** et **description** unique pour les composants du <main>

# Respect du RGPD

- Présence de Conditions Générales et mentions légales pour informer l’utilisateur.
- Cookies limités à la gestion d’authentification (HTTP-only, non traçants).
