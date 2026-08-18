# FRAME — BOS V3.11

## Correctif ancrage du visage en très gros plan

Problème :
en 1 personne, quand on allait très près / très gros plan, le rendu finissait
par s'ancrer davantage sur la masse des cheveux que sur la ligne des yeux.

## Correctif
La preview place maintenant le personnage à partir de :
- la projection des yeux
- la projection des pieds

Les yeux deviennent l'ancre absolue du rendu.

### Résultat attendu
- les yeux restent la vraie référence
- la ligne 1/3 reste fiable
- en très gros plan, l'image ne "glisse" plus vers les cheveux


## V3.11 — BOS Camera DB
- Base exacte : FRAME BOS V3.10 EYESLOCK.
- Conservation de toutes les fonctions V3.10 (Preview, multi-sujets, eye lock, etc.).
- La liste des caméras est maintenant chargée depuis BOS-CAMERA-DB.
- Cache local + fallback embarqué pour le fonctionnement hors ligne.
