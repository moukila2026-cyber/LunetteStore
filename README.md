# LUNETTE STORE — Daloa

Site vitrine premium, responsive et statique pour Lunette Store à Balouzon, non loin du Collège Privé Iman, Daloa, Côte d’Ivoire.

## Site déployé

**https://lunette-store-daloa.vercel.app**

Projet Vercel : `lunette-store-daloa`, compte `moukila`. Déploiement de production réellement effectué et état `READY` confirmé ; le contenu public a été récupéré sans authentification le 21 octobre 2026. Les sources sont sur la branche `arena/6abd0035-lunettestore`, publiée sur GitHub, sans fusion dans `main`.

Vérifications exécutées : compilation et pré-rendu réussis, **36 tests Playwright réussis** (18 scénarios déclinés en bureau et mobile), zéro violation dans les analyses axe automatisées effectuées, `npm audit` sans vulnérabilité signalée et formatage vérifié. Les tests de fonctionnement ont été exécutés sur la version de production locale ; la vérification distante porte sur la disponibilité et le contenu public.

## Photo de la boutique et campagnes fournies

La photo intérieure authentique et les quatre affiches transmises sont conservées dans `public/media/originals/`. Elles ne sont pas présentées comme des images générées par IA.

- **Intérieur** : luminosité, tons moyens et netteté légèrement améliorés, sans génération, suppression ou ajout d’élément. Version WebP 640/1080 px pour le site et JPEG retouché téléchargeable : `public/media/shop/interieur-ameliore.jpg`.
- La photo réelle est utilisée dans l’accueil et dans « La boutique », où elle est affichée en entier. Elle sert aussi d’image de partage social. Son original est conservé.
- **Affiches** : jeu-concours, test de vue offert, Journée mondiale de la vue, Octobre rose. Compression WebP, proportions et contenus conservés, sans recadrage des affiches. Aperçus 540 px et fichiers complets 1080 px.
- La section « Actualités » dispose d’une visionneuse : Échap, flèches, fermeture au clic extérieur, focus contenu dans la fenêtre puis restitué au déclencheur. Un lien permet d’ouvrir chaque affiche en grand pour zoomer.
- Textes, réserves et messages WhatsApp sont regroupés dans `src/campaigns.js`. Le concours n’est pas présenté comme actif sans confirmation : l’affiche indique « lundi 26 octobre » sans année et sans lien de publication officiel. Aucun formulaire de participation, tirage ou questionnaire médical n’est créé.
- Les autres visuels IA du catalogue gardent leurs mentions illustratives. La publicité Octobre rose est un message de sensibilisation, pas une annonce de dépistage en boutique.

Pour régénérer les fichiers à partir des originaux : `npm run media`. Traitement reproductible : `scripts/prepare-shop-media.mjs`. Composants : `ShopPhoto.jsx`, `Campaigns.jsx`. Styles : `src/campaigns.css`.

À faire confirmer : droits d’utilisation des affiches et portraits fournis, période et règlement du concours, publication officielle de participation et modalités du test gratuit.

## Parcours Signature — inspiration de structure et crédit Shopin30

L’analyse de la structure de **monart.ci** et les choix d’adaptation sont documentés dans `docs/DIRECTION-ARTISTIQUE.md`. Les visuels, textes, coordonnées et code du site de référence ne sont pas copiés ; aucune assurance, qualification, équipement ou horaire non communiqué n’a été ajouté.

- Accueil photographique pleine largeur avec boutons collection/WhatsApp et rappel conditionnel du test gratuit.
- Services photographiques présentés avant la galerie, puis expérience de netteté et parcours de visite en trois étapes.
- Le curseur de netteté est **un effet graphique uniquement**, sans mesure, diagnostic ou recommandation de correction ; il ne stocke aucune donnée.
- Invitation finale à contacter la boutique.
- Pied de page : **Conçu par Shopin30 · +225 05 01 30 33 43**, avec lien WhatsApp `https://wa.me/2250501303343` et message prérempli. Ce contact du concepteur est distinct des numéros de la boutique.
- Réglages du concepteur : objet `creator` dans `src/data.js`. Styles : `src/signature.css`. Composants : `Hero`, `VisionExperience`, `VisitJourney`, `ClosingInvitation`.

## Édition Atelier — enrichissement visuel

- Nouveau bouton WhatsApp flottant sur ordinateur **et** mobile, avec panneau de contact ivoire/vert profond, deux numéros et messages préremplis. Il remplace l’ancienne barre mobile.
- Fermeture par bouton, Échap ou clic extérieur ; retour du focus au déclencheur après fermeture au clavier. Le panneau est non modal, n’envoie rien automatiquement et ne promet pas de réponse immédiate.
- Quatre nouveaux visuels : portraits homme/femme, nature morte solaire et détail de monture. Le « carnet de style » utilise une composition photographique asymétrique.
- Révélations au défilement, progression de lecture, transitions de survol et mouvement d’entrée du portrait. Le contenu reste visible sans JavaScript et les animations respectent la préférence de réduction de mouvement.
- Styles additionnels isolés dans `src/atelier.css` ; composants `Editorial.jsx`, `VisualEffects.jsx` et `WhatsAppWidget.jsx`.
- Tests supplémentaires du panneau, de ses liens, des petits écrans/paysage, de l’accessibilité et des animations.

## Stack et fonctionnalités

- React 19, Vite 7, CSS moderne, icônes Lucide.
- Playfair Display et DM Sans auto-hébergées via Fontsource (pas de requête Google Fonts).
- HTML pré-rendu à la compilation pour le SEO et la consultation sans JavaScript, puis hydratation React.
- Sept inspirations, filtres et visionneuse native `dialog` : clavier, Échap, navigation précédente/suivante, confinement et restauration du focus.
- Menu mobile, ancres, panneau WhatsApp flottant et WhatsApp contextuel par style.
- Liens téléphone, e-mail, deux WhatsApp préremplis et recherche Google Maps par adresse. Aucune coordonnée GPS inventée ni carte tierce chargée automatiquement.
- Métadonnées françaises, URL canonique, sitemap et données structurées `Optician`, sans avis, horaires ou certifications fictifs.
- Images WebP en deux tailles, chargement différé sauf visuel principal, respect de `prefers-reduced-motion`.
- Aucun backend, paiement, panier, formulaire médical, outil de suivi ou cookie publicitaire ajouté par l’application.

## Lancer le projet

Prérequis : **Node.js 22.12+** (Node 24 convient) et npm.

```bash
npm ci
npm run dev
```

Ouvrir l’adresse affichée par Vite, normalement `http://localhost:5173`.

```bash
npm run build       # compile dans dist/ puis pré-rend le HTML
npm run preview     # sert la version de production locale
```

Les images nécessaires sont déjà dans `public/images/`. Il n’est pas nécessaire de régénérer les images pour compiler.

## Organisation et personnalisation

```text
src/
  App.jsx                  Composition des sections, marque et pied de page
  data.js                  Coordonnées, navigation, catégories, textes et images
  main.jsx                 Polices locales et hydratation React
  styles.css               Identité visuelle et responsive
  atelier.css              Finition éditoriale, animations et widget flottant
  signature.css            Accueil immersif, services, expérience, parcours et crédit
  components/
    Header.jsx             Navigation bureau/mobile
    Gallery.jsx            Catalogue, filtres et visionneuse
    Services.jsx           Les six prestations photographiques
    Hero.jsx               Accueil photographique et contacts
    VisionExperience.jsx   Démonstration graphique, non médicale
    VisitJourney.jsx       Parcours de visite en trois étapes
    ClosingInvitation.jsx  Dernier appel à la prise de contact
    Editorial.jsx          Carnet de style photographique
    WhatsAppWidget.jsx     Panneau de contact flottant
    VisualEffects.jsx      Révélations et progression de lecture
    Contact.jsx            Coordonnées et localisation
    Primitives.jsx         Logo, images, liens et icône WhatsApp
public/
  images/                  Images WebP optimisées et versionnées
  favicon.svg
  robots.txt
scripts/
  optimize-images.mjs      Génération des images 640/1280 px
  prerender.mjs            Pré-rendu statique à la compilation
tests/site.spec.js        Tests Playwright + axe
index.html                 SEO, langue, métadonnées et données structurées
vercel.json                Build, répertoire de sortie et en-têtes HTTP
```

### Remplacer les images

Les douze visuels du dossier `public/images/` (trois portraits, sept inspirations et deux natures mortes éditoriales) ont été **générés par IA pour ce projet**. Ils ne représentent ni une cliente réelle, ni le stock de la boutique, ni ses locaux. Les mentions illustratives sont visibles sur le site. Ne pas les transformer en preuves de disponibilité.

1. Obtenir les photographies réelles et les autorisations d’utilisation de la responsable ; obtenir aussi l’accord des personnes reconnaissables.
2. Remplacer `public/images/NOM-640.webp` et `NOM-1280.webp` en conservant les noms, ou modifier `image` et `alt` dans `src/data.js`.
3. Pour utiliser l’outil d’optimisation, créer `source-assets/` puis y placer : `editorial.png`, `timeless.png`, `modern.png`, `bold.png`, `women.png`, `men.png`, `kids.png`, `care.png`, `editorial-man.png`, `editorial-woman.png`, `sunlight.png`, `craft.png`. Exécuter `npm run images`.
4. Adapter les textes, tailles et cadrages si les photos réelles ont d’autres proportions.
5. Ne retirer les mentions « illustratif / généré par IA » que des visuels effectivement remplacés. Elles figurent dans `App.jsx`, `Hero.jsx`, `Services.jsx`, `VisionExperience.jsx`, `Gallery.jsx`, `Editorial.jsx` et dans les textes alternatifs de `data.js`.

Les originaux volumineux de travail ne sont pas versionnés (`source-assets/` ignoré). Les WebP livrés suffisent au déploiement. Les polices sont distribuées sous SIL Open Font License ; les licences sont incluses dans leurs paquets npm. Lucide est distribué sous licence ISC.

### Modifier les contenus

- Coordonnées, messages WhatsApp, adresse Maps : `src/data.js`.
- Services et conditions commerciales : `src/components/Services.jsx`.
- Palette, typographies, espacements : variables et règles dans `src/styles.css`, `src/atelier.css` et `src/signature.css`.
- Panneau WhatsApp : `src/components/WhatsAppWidget.jsx` ; numéros et message commun dans `src/data.js`.
- SEO et données structurées : `index.html`. Lors d’un changement de coordonnées, modifier aussi le JSON-LD et le texte de secours sans JavaScript.
- Année : calculée automatiquement. Le pré-rendu est actualisé à chaque compilation ; reconstruire au changement d’année pour actualiser aussi le HTML statique.
- Aucun secret ou fichier `.env` n’est nécessaire.

## Vérifications

```bash
npm run build
npx playwright install --with-deps chromium
npm test
npm audit
npm run format:check
```

Un navigateur déjà installé peut être utilisé avec `CHROMIUM_PATH=/chemin/vers/chromium npm test`.

Les tests démarrent la prévisualisation de `dist/` sur le port 4173. Ils couvrent :

- affichage et chargement des images, métadonnées, erreurs JavaScript ;
- tous les filtres et les sept inspirations ;
- visionneuse, flèches, Échap, confinement du focus et retour au déclencheur ;
- menu mobile et navigation bureau ;
- valeurs des liens d’appel, WhatsApp (messages compris), e-mail et recherche Maps ;
- absence de débordement horizontal entre 320 et 1920 px ;
- analyse automatisée axe WCAG A/AA sur page et visionneuse ;
- présence du contenu HTML sans JavaScript et captures de contrôle.

Les tests de liens **ne passent aucun appel, n’envoient aucun message et ne valident pas l’activité réelle des numéros**. Une analyse automatisée sans erreur n’est pas une certification d’accessibilité ni une garantie de conformité exhaustive. Les tests mobiles sont exécutés en émulation Chromium, pas sur un iPhone physique.

## Déployer sur Vercel

La configuration est prête dans `vercel.json` :

- Framework : **Vite**
- Installation : `npm ci`
- Build : `npm run build`
- Output : `dist`
- Node.js : 22.12+ ou 24
- Variables d’environnement : aucune

### Depuis le tableau de bord

1. Importer le dépôt `moukila2026-cyber/LunetteStore`.
2. Utiliser le projet dédié `lunette-store-daloa` s’il a déjà été créé ; ne pas créer de doublon.
3. Le code de cette réalisation est sur **`arena/6abd0035-lunettestore`**. La branche `main` initiale ne contient pas cette réalisation. Pour de futures publications automatiques, choisir cette branche dans Settings → Environments → Production / Branch Tracking, ou intégrer le code via une PR après validation.
4. Vérifier les paramètres ci-dessus et déployer. Pour un déploiement manuel, sélectionner la branche courante ou son commit.
5. Vérifier **Settings → Deployment Protection**. Si Vercel Authentication protège les URL de production, la désactiver pour rendre le site public, selon les possibilités du compte. Une URL déployée peut être protégée même si son état est `READY`.
6. Tester l’URL dans une fenêtre privée sans connexion Vercel.
7. Ajouter uniquement le domaine validé par la responsable dans Settings → Domains, puis configurer les DNS indiqués par Vercel.
8. Après choix d’un domaine personnalisé, remplacer l’URL Vercel dans `index.html` (canonique, `og:url`, image de partage et JSON-LD), `public/sitemap.xml` et `public/robots.txt`. L’URL Vercel réellement attribuée est utilisée en attendant ; aucun domaine commercial n’est supposé.

### Depuis un poste local authentifié

```bash
npm ci
npm run build
npx vercel link
npx vercel --prod
```

Sélectionner le projet `lunette-store-daloa` et le bon compte. Ne pas publier de jeton dans le dépôt.

### Branches et publication

Cette session travaille exclusivement sur `arena/6abd0035-lunettestore`. Une publication effectuée depuis cette branche ne signifie pas qu’elle a été fusionnée dans `main`. Pour mettre à jour le déploiement, publier le dernier commit de cette branche ou configurer explicitement son suivi dans Vercel.

## À confirmer avec la responsable avant lancement commercial

- Confirmation de l’adresse « Balouzon, non loin du Collège Privé Iman » et résultat de la recherche Google Maps ; créer/vérifier la fiche établissement si besoin.
- Activité des deux numéros, disponibilité sur WhatsApp et réception de l’e-mail.
- Horaires et jours d’ouverture : volontairement non inventés.
- Références, disponibilités et photographies réelles ; accord pour conserver les images IA si souhaité.
- Conditions de la monture offerte (modèles, exclusions, durée), du test de vue gratuit et des facilités de paiement.
- Prestations effectivement proposées, modalités et personnel habilité pour les tests de vue. Aucune certification ou qualification non communiquée n’est revendiquée.
- Identité légale de l’exploitant, immatriculation et mentions légales applicables en Côte d’Ivoire, à faire valider et compléter avant le lancement commercial.
- Domaine officiel, réglages de protection Vercel et validation finale des textes et de l’identité visuelle.

Aucune donnée médicale ne doit être demandée via ce site. Les liens WhatsApp et Google Maps quittent le site et relèvent des conditions de ces services tiers.

## Logo officiel fourni

Le logo bordeaux fourni par la boutique remplace le logo typographique dans l’en-tête et le pied de page. Le fichier reçu est conservé, sans modification, dans `public/brand/lunette-store-original.jpg`.

La version affichée, `public/brand/lunette-store.webp` (569 × 308 px), retire uniquement les grandes marges blanches du haut et du bas (recadrage vertical de y=130 à y=437 inclus). Aucun élément n’a été redessiné, recoloré ou étiré ; le cadrage horizontal reste celui du fichier reçu. Le fond blanc est conservé et le pied de page utilise un cartouche blanc pour maintenir le contraste.

Le composant `Brand` dans `src/components/Primitives.jsx` affiche le logo ; ses tailles sont définies en fin de `src/signature.css`. Les données structurées de la boutique pointent également vers ce logo. Une future version vectorielle ou haute définition pourra remplacer cette ressource.
