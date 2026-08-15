# Portfolio2

Portfolio personnel développé en deux parties : un backend Django REST API pour gérer le contenu du portfolio et un frontend React + Vite pour afficher les sections du site.

Le projet met en avant :
- la présentation professionnelle,
- les compétences,
- l’expérience,
- la formation,
- les langues,
- les projets réalisés,
- et un formulaire de contact fonctionnel avec envoi d’e-mails.

---

## 1. Analyse du projet

### Stack technique

#### Backend
- Python
- Django 6.1
- Django REST Framework
- SQLite (base de données locale de développement)
- Pillow pour la gestion des images
- python-dotenv pour la configuration des variables d’environnement
- CORS headers pour la communication avec le frontend

#### Frontend
- React 19
- Vite
- React Router DOM
- CSS modules / styles personnalisés

### Architecture générale

Le projet suit une architecture monorepo simple :

- `backend/` : application Django et API REST
- `frontend/` : application React qui consomme l’API

La logique métier principale est centralisée dans l’application `projects`, qui expose les modèles suivants :
- `Project`
- `ProjectImage`
- `About`
- `Skill`
- `Experience`
- `Education`
- `Language`
- `ContactMessage`

### Fonctionnalités principales

- page d’accueil avec sections de présentation, compétences, expériences, projets, formation et langues,
- affichage des projets avec détails, images et informations techniques,
- API REST pour récupérer les données du portfolio,
- formulaire de contact avec validation côté frontend et backend,
- envoi d’un e-mail de notification au propriétaire,
- réponse automatique envoyée à l’utilisateur,
- prise en charge des images de profil, CV et images de projets,
- configuration CORS pour autoriser les appels depuis le frontend local ou le site déployé.

---

## 2. Structure du projet

```text
Portfolio2/
├── backend/
│   ├── backend_env/            # environnement virtuel Python
│   ├── config/                 # settings, urls, wsgi, asgi
│   ├── media/                  # fichiers uploadés (images, documents)
│   ├── projects/               # application Django principale
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── email_backend.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── templates/
│   │   └── emails/
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── sections/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── .gitignore
└── README.md
```

---

## 3. Backend Django

### Application principale

L’application `projects` contient toute la logique de contenu du portfolio.

#### Modèles importants

- `Project` : informations d’un projet (titre, slug, description, catégorie, objectifs, technologies, architecture, résultats, images associées)
- `About` : informations sur la personne, le profil, le CV, le LinkedIn, GitHub, la bio
- `Skill` : compétences classées par catégorie
- `Experience` : expériences professionnelles
- `Education` : formations et diplômes
- `Language` : langues et niveaux
- `ContactMessage` : messages reçus depuis le formulaire de contact

### API REST

Les endpoints sont exposés via `DefaultRouter` dans `backend/projects/urls.py` :

- `GET /api/projects/` : liste des projets
- `GET /api/projects/<slug>/` : détail d’un projet
- `GET /api/about/` : informations sur l’auteur
- `GET /api/skills/` : liste des compétences
- `GET /api/experiences/` : expériences
- `GET /api/education/` : formations
- `GET /api/languages/` : langues
- `POST /api/contact/` : envoi d’un message de contact

### Envoi d’e-mails

Le backend utilise `EmailMessage` pour :
1. notifier le propriétaire du site d’un nouveau message,
2. envoyer une réponse automatique à l’expéditeur.

La configuration SMTP est gérée dans `config/settings.py` avec les variables :
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `CONTACT_EMAIL`

---

## 4. Frontend React

### Navigation

Le frontend est structuré avec `react-router-dom`.

Les routes disponibles sont :
- `/` : accueil
- `/projects` : liste de tous les projets
- `/projects/:slug` : détail d’un projet
- `/contact` : formulaire de contact

### Services API

Le fichier `frontend/src/services/projectService.js` récupère les projets via le backend.

Le fichier `frontend/src/services/contactService.js` envoie les messages du formulaire vers `POST /api/contact/`.

### Comportement utilisateur

- la page d’accueil regroupe les sections principales du portfolio,
- la liste des projets est chargée dynamiquement,
- chaque projet est accessible via son slug,
- le formulaire de contact affiche des messages de succès ou d’erreur selon le résultat de l’envoi.

---

## 5. Pré-requis

### Backend
- Python 3.10+
- pip
- virtualenv ou venv

### Frontend
- Node.js 18+
- npm

---

## 6. Installation et lancement

### 1) Cloner le projet

```bash
git clone <url-du-repo>
cd Portfolio2
```

### 2) Backend Django

Accédez au dossier backend et créez un environnement virtuel :

```bash
cd backend
python -m venv .venv
```

Sur Windows PowerShell :

```powershell
.\.venv\Scripts\Activate.ps1
```

Sur Linux/macOS :

```bash
source .venv/bin/activate
```

Installez les dépendances :

```bash
pip install -r requirements.txt
```

Créez un fichier `.env` dans `backend/` avec les variables suivantes :

```env
DJANGO_SECRET_KEY=votre-secret-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
SMTP_USERNAME=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-app
CONTACT_EMAIL=votre-email-destination@gmail.com
```

Appliquez les migrations :

```bash
python manage.py migrate
```

Créez un compte administrateur :

```bash
python manage.py createsuperuser
```

Lancez le serveur Django :

```bash
python manage.py runserver
```

Le backend est accessible sur :
- `http://localhost:8000`
- `http://localhost:8000/api/`

### 3) Frontend React

Dans un autre terminal :

```bash
cd frontend
npm install
```

Créez un fichier `.env` dans `frontend/` :

```env
VITE_API_URL=http://localhost:8000
```

Lancez le serveur de développement :

```bash
npm run dev
```

Le frontend est généralement disponible sur :
- `http://localhost:5173`

---

## 7. Commandes utiles

### Backend

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
python manage.py collectstatic
```

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 8. Variables d’environnement et configuration

### Backend (`backend/.env`)

```env
DJANGO_SECRET_KEY=
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
SMTP_USERNAME=
SMTP_PASSWORD=
CONTACT_EMAIL=
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8000
```

> Le frontend dépend de cette variable pour appeler l’API Django. Sans elle, les appels aux services de projets ou de contact peuvent échouer.

---

## 9. Déploiement

### Frontend
Le projet frontend est compatible avec Vite et peut être déployé sur :
- Vercel,
- Netlify,
- ou tout hébergeur statique supportant les builds Vite.

Le build de production se lance avec :

```bash
cd frontend
npm run build
```

### Backend
Le backend Django peut être déployé sur :
- Render,
- Railway,
- Fly.io,
- VPS / serveur Linux,
- ou tout hébergeur compatible Python.

Pour une version de production, il est recommandé de :
- remplacer SQLite par PostgreSQL,
- sécuriser les variables d’environnement,
- configurer un domaine propre,
- activer HTTPS,
- gérer les fichiers media avec un stockage externe si nécessaire.

---

## 10. Points forts du projet

- architecture claire et simple à maintenir,
- backend robuste pour la gestion du contenu,
- frontend moderne et rapide,
- portfolio orienté image et contenu professionnel,
- formulaire de contact fonctionnel avec e-mails,
- séparation nette entre API et interface utilisateur.

---

## 11. Points d’attention

- le projet utilise SQLite en local, ce qui convient au développement mais pas forcément à la production,
- le backend envoie des e-mails via SMTP Gmail, donc il faut configurer un mot de passe d’application,
- le `CORS` est configuré pour les origines locales et le site Vercel, il peut être ajusté selon le déploiement final,
- il est conseillé de compléter les contenus administrables depuis le panneau d’administration Django.

---

## 12. Accès admin Django

Une fois le serveur backend lancé, l’interface admin est accessible ici :

```text
http://localhost:8000/admin/
```

Cela permet de gérer directement :
- les projets,
- les informations “About”,
- les compétences,
- les expériences,
- les formations,
- les langues,
- et les messages reçus.

---

## 13. Conclusion

Portfolio2 est un projet de portfolio professionnel complet, pensé pour présenter un profil technique autour de :
- bases de données,
- développement,
- data science,
- intelligence artificielle,
- et solutions numériques.

La combinaison Django + React donne un bon équilibre entre contenu dynamique, API robuste et interface moderne.

---

## 14. Commande de démarrage rapide

```bash
# Backend
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend (dans un autre terminal)
cd frontend
npm install
npm run dev
```
