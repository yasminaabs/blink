# BLINK

**BLINK** est une application web de gestion e-commerce multi-rôles (Admin,
Vendeur, Client, Visiteur), inspirée d'une marketplace de vêtements où
chaque client peut aussi devenir vendeur en créant sa propre boutique.

Ce dépôt contient le **front-end** (React + Vite). Il consomme l'API REST du
dossier voisin [`../server`](../server) (`http://localhost:4000/api/v1/...`)
pour les articles, utilisateurs, boutiques, tailles, etc.

> Projet académique réalisé dans le cadre du module *Méthodes de conception*
> — Master 1 Génie Logiciel, Faculté des Sciences Exactes, Université de
> Béjaïa (2024–2025). Les diagrammes UML, cas d'utilisation et maquettes
> d'interfaces sont détaillés dans le rapport de conception du projet.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation et lancement](#installation-et-lancement)
- [Configuration de l'API](#configuration-de-lapi)
- [Routes](#routes)
- [Structure du projet](#structure-du-projet)
- [État d'avancement](#état-davancement)
- [Auteurs](#auteurs)

## Fonctionnalités

| Rôle | Ce qu'il peut faire |
|---|---|
| **Visiteur** | Rechercher/consulter des articles, gérer un panier, signaler un article |
| **Client** | Tout ce que fait le visiteur, + favoris, avis/commentaires, paiement, suivi des commandes, gestion du profil, création de sa propre boutique |
| **Vendeur** | Gérer ses articles et commandes, consulter les avis, gérer les infos de sa boutique |
| **Admin** | Gérer vendeurs/clients, modérer avis et signalements, tableau de bord, peut aussi opérer sa propre boutique |

## Stack technique

- [React 19](https://react.dev/) + [React Router 7](https://reactrouter.com/)
- [Vite 6](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [axios](https://axios-http.com/) pour les appels API
- [lucide-react](https://lucide.dev/) pour les icônes

## Prérequis

- Node.js ≥ 18
- Une base MySQL locale + le serveur API du projet ([`../server`](../server))
  lancé sur `http://localhost:4000` (pour les pages déjà branchées à l'API :
  accueil / liste des produits). Voir le README de `server/` pour le
  démarrer.

## Installation et lancement

```bash
npm install       # installe les dépendances
npm run dev       # lance le serveur de développement (http://localhost:5173)
npm run build     # build de production dans dist/
npm run preview   # sert le build de production localement
npm run lint      # vérifie le code avec ESLint
```

## Configuration de l'API

L'URL de l'API (`http://localhost:4000/api/v1`) est actuellement codée en dur
dans les composants qui l'utilisent (`BestSelling`, `ProductCard`, `Navbar`,
`Research`, `LoginPage`, les pages vendeur, `modal/AddProduct`). Si le
back-end tourne sur une autre adresse, il faut adapter ces appels `axios`.

## Routes

| Chemin | Page |
|---|---|
| `/` | Accueil (mise en avant, best-sellers, catalogue) |
| `/search` | Recherche / filtres d'articles |
| `/category/:categoryName` | Articles d'une catégorie |
| `/product/:id` | Détail d'un article (panier, favoris, signalement) |
| `/cart` | Panier |
| `/dashbordadmin` | Espace Admin |
| `/dashbordvendeur` | Espace Vendeur |
| `/dashbordclient` | Espace Client |

## Structure du projet

```
src/
├─ Pages/                Pages routées ci-dessus
├─ components/
│  ├─ common/            Composants partagés : Navbar, Footer, LoginPage,
│  │                      Notification, ReportModal
│  ├─ home/               Sections de la page d'accueil / boutique : Benefit,
│  │                      BestSelling, Browse, News, Pic, ProductCard, Research
│  ├─ admin/              Dashboard admin : sidebar, tableau de bord,
│  │                      gestion vendeurs/clients/avis/signalements
│  ├─ vendeur/            Dashboard vendeur : articles, commandes, avis,
│  │                      paramètres, tableau de bord
│  ├─ client/             Espace compte client : commandes, favoris,
│  │                      adresse, infos, création de boutique
│  └─ modal/              Formulaires modaux (ajout d'article)
├─ data/                 Données mock partagées (products.js)
└─ assets/               Images et icônes
```

## État d'avancement

- `BestSelling` et `ProductCard` sont déjà branchés à l'API réelle
  (`GET /api/v1/articles/getall`).
- `ProductDetail` et `CategoryPage` utilisent encore les données mock de
  `src/data/products.js`, en attendant un endpoint de récupération d'un
  article par id.
- Le panier, les tableaux de bord et le signalement d'article fonctionnent
  en état local (React state), sans persistance côté serveur pour l'instant.
- Le cas d'utilisation « Signaler un article » est implémenté côté client
  via `components/common/ReportModal`, accessible depuis la page détail
  d'un article.

## Auteurs

Projet réalisé par **BENATSI Feriel**, **ABBAS Yasmina** et **BERBOUCHA
Lina**, encadré par **M. Bedjou Khaled** et **M. Achroufene Achour**.
