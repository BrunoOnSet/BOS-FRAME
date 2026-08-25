# BOS FRAME V3.31 — LIGHT HEADER LAYOUT FIX

Correction ciblée de l'entête.

Cause :
d'anciennes règles FRAME forçaient encore l'entête à 280 px de large
et 54 px de haut, malgré l'intégration de l'entête LIGHT_V0_50.

V3.31 :
- largeur entête : 100 % du conteneur
- hauteur : automatique
- position : flux normal, au-dessus des modes
- logo / typo / texte / bouton DARK conservés comme LIGHT_V0_50
- responsive LIGHT conservé
- aucune modification des fonctions FRAME ni de la bulle 01
