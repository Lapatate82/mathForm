# Choisir son environnement de dev : vite ou Next:
![Choisir entre vite et next](/src/assets/image.png)
![Choisir entre vite et next suite](/src/assets/image-1.png)

On va choisir vite ici.


# React + Vite

## Création d'un projet React avec vite.js 
1. npm create vite@latest mon-projet -- --template react
2. cd mon-projet
3. npm install 

## Démarrer le serveur
npm run dev

## Les fichiers
On retrouve un fichier main.jsx (et non plus index.js) et App.jsx.

## Installation du router
1. ```npm install react-router-dom```
2. Ajouter dans main.js : 
```import { BrowserRouter, Routes, Route } from 'react-router-dom';```
3. Importer les pages et les intégrés au render avec Route dans app.js
```
import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';

return (
    <>
        <div>
            <nav>
                <Link to="/">Accueil</Link> | <Link to="/about">À propos</Link>
            </nav>
            
            <hr />
            <Outlet /> 
        </div>
    </>
)
```

## Création des dossiers (Vite ne le fait pas automatiquement)
Dans src créer les dossiers Pages et Composants puis créer les pages à intégrées dans les link de la route.


## Ligne de commande pour contourner ce problème en forçant l'installation de circle-packing
npm install @nivo/circle-packing @nivo/core d3 --legacy-peer-deps


## build tailwind css
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch