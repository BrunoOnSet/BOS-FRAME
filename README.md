# FRAME - BOS V2.8

## Nouveau : RESET CALIBRATION

Dans CAL, FRAME affiche maintenant un bloc explicite :

RESET CALIBRATION PORTRAIT
ou
RESET CALIBRATION PAYSAGE

selon l’orientation actuelle du téléphone.

### Sécurité
Le reset efface uniquement :
- la CAL RAPIDE de l’orientation actuelle ;
- les points CAL PRO de l’orientation actuelle ;
- la limite grand-angle de l’orientation actuelle ;
- les corrections de centrage liées à cette calibration.

La calibration de l’autre orientation reste intacte.

### Confirmation
Une confirmation est demandée avant l’effacement.

### Si aucune calibration n’existe
Le bouton est désactivé et affiche :
AUCUNE CALIBRATION PORTRAIT / PAYSAGE.

### Où le trouver
CAL → bas de l’écran de choix.

Le bouton déjà présent dans RÉGLAGES a également été renommé clairement :
RESET CALIBRATION · ORIENTATION ACTUELLE.

## Inchangé
- DA EXPO V3.19
- calibration portrait / paysage séparée
- CAL PRO paysage compact
- FX6 par défaut au premier lancement
- dernière caméra cinéma mémorisée
- 16:9
- limite grand-angle


## V2.8
- Ajout d’un bouton INSTALL dans l’app pour faciliter l’installation PWA.
- Android/Chrome : utilise le prompt natif lorsqu’il est disponible.
- iPhone/iPad : affiche directement les instructions Safari → Partager → Sur l’écran d’accueil.
- Manifest renforcé avec id/scope et cache PWA v2.8.


## V2.9
- Ajout d’un champ **FOCALE LIBRE** dans la section CADRAGE.
- Accepte toute focale de 1 à 1000 mm, avec décimales au dixième.
- Les focales prédéfinies restent disponibles comme raccourcis.
- Si la valeur libre correspond à un preset, celui-ci redevient actif.


## V3.0 — BOS Camera DB
- Liste caméra alimentée par la base centrale BOS.
- URL : `https://raw.githubusercontent.com/BrunoSetTools/BOS-CAMERA-DB/main/cameras.json`
- Cache local + fallback embarqué : FRAME reste utilisable hors ligne.
- Une modification de `cameras.json` peut mettre à jour la liste sans nouvelle version de FRAME.
