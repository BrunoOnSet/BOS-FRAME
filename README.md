# FRAME - BST V1.3

## Deux correctifs importants

### 1. Grand-angle / 24 mm
V1.2 affichait le flux téléphone en `cover`, ce qui pouvait couper une partie du champ du téléphone avant même le calcul de FRAME.

V1.3 travaille sur l'IMAGE COMPLETE du téléphone (`contain`) puis place le cadre cinéma dedans.
Le zoom CAL PRO peut maintenant descendre sous 1.0 jusqu'à la limite exacte où de vrais pixels téléphone couvrent encore tout le cadre.

Si cette limite est atteinte et que la vraie caméra est encore plus large :
- ce n'est plus un problème de calcul,
- il faut passer sur la caméra ultra-grand-angle du téléphone dans CAM.

Pour un Director's Viewfinder, il est recommandé de calibrer avec la caméra téléphone la plus large disponible, puis de zoomer numériquement pour les focales longues.

### 2. Décentrage selon la focale
CAL PRO possède maintenant :
- CENTRAGE HORIZONTAL
- CENTRAGE VERTICAL

Chaque point 24 / 35 / 50 / 85 mm mémorise :
- le zoom,
- le centrage X,
- le centrage Y.

FRAME interpole les trois valeurs entre les points, ce qui évite un déplacement brutal du cadre entre deux focales.

## IMPORTANT
Les anciens points CAL PRO V1.2 sont invalidés à cause du changement de moteur d'affichage.
La CAL RAPIDE est conservée si elle existait.

Refaire CAL PRO :
24 / 35 / 50 / 85 mm.

## Mise à jour
Remplacer le dossier FRAME sur l'hébergement.
Ouvrir l'application une fois avec du réseau et recharger.
Si l'ancienne interface reste affichée, fermer complètement l'application installée puis la rouvrir.
