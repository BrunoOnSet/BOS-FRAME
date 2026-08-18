# BOS FRAME V3.14 — SENSOR + EYE LINE

## Taille exacte du capteur
Sous le choix du modèle caméra, FRAME affiche maintenant en petit la largeur exacte
de capteur utilisée pour le calcul du cadrage.

Exemples :
- FX3 : 35,60 mm
- FX30 : 23,30 mm
- ALEXA 35 : valeur issue directement de BOS-CAMERA-DB

La valeur change immédiatement avec le modèle choisi.

## Règle des yeux corrigée
La ligne des yeux n'est plus simplement placée à 1/3 de toute la zone Preview.

Elle est maintenant placée à exactement 1/3 du CADRE CINÉMA BLEU.

En plus, FRAME applique une correction de composition après la projection :
- 1 personne : ses yeux sont exactement au tiers supérieur ;
- plusieurs personnes : la moyenne des yeux du groupe est exactement au tiers supérieur ;
- les différences de taille entre personnes sont conservées ;
- le comportement reste identique du plan large au très gros plan.

Règle :
- 1/3 au-dessus des yeux
- 2/3 en dessous des yeux

## Camera DB
FRAME reste connecté à la base commune BOS-CAMERA-DB.
