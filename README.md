# FRAME — BOS V3.12 CAMERA DROPDOWN

## Sélection caméra harmonisée avec EXPO V3.31

Le choix de caméra dans FRAME utilise désormais le même principe qu'EXPO :

1. sélection de la MARQUE par boutons
2. sélection du MODÈLE dans un menu déroulant

Les marques et modèles sont générés automatiquement depuis BOS-CAMERA-DB.

## Base caméra commune

URL centrale utilisée par FRAME :

https://raw.githubusercontent.com/BrunoSetTools/BOS-CAMERA-DB/main/cameras.json

FRAME et EXPO pointent donc vers la même base distante.

## Hors ligne

Le fallback local de FRAME est désormais harmonisé avec celui d'EXPO V3.31 :
- databaseVersion 1.2
- Sony
- RED
- ARRI
- Blackmagic
- capteurs génériques

Le cache Camera DB passe également sur :
bos-camera-db-cache-v2

## Mémoire

FRAME conserve toujours la caméra principale sélectionnée.
En plus, il mémorise maintenant le dernier modèle utilisé pour chaque marque,
comme EXPO.

Exemple :
- Sony → FX6
- ARRI → ALEXA 35
- Blackmagic → Pocket Cinema Camera 6K

Quand on revient sur une marque, son dernier modèle est repris automatiquement.

## Inchangé

- PREVIEW / VUE RÉELLE
- Preview jusqu'à 4 personnes
- carnations/diversité
- règle des yeux
- CAL RAPIDE / CAL PRO
- calibrations portrait / paysage
- RESET calibration
