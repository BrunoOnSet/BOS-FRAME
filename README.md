# FRAME - BST V1.2

## Nouveau : CAL PRO

FRAME peut maintenant apprendre directement le cadrage d'une vraie caméra.

### Procédure recommandée avec la Sony FX6
1. Mets FRAME sur la caméra téléphone que tu veux utiliser.
2. Dans l'écran principal choisis le ratio utilisé sur la FX6 (par exemple 16:9).
3. CAL > CAL PRO.
4. Choisis Sony FX6 comme caméra de référence.
5. Mets la vraie FX6 à 24 mm.
6. Place le téléphone au plus près de l'axe optique de la FX6.
7. Avec le slider ZOOM FRAME, fais correspondre les limites gauche/droite de FRAME à l'image de la FX6.
8. ENREGISTRER CE POINT.
9. Recommence à 35 mm, 50 mm et 85 mm.

Avec 2 points ou plus, FRAME interpole automatiquement entre les références.
24 / 35 / 50 / 85 mm sont conseillés.

## Pourquoi
La V1 supposait qu'un seul champ de vision du téléphone suffisait pour toutes les focales.
Certains téléphones appliquent des corrections/crops numériques qui rendent cette hypothèse insuffisante.
CAL PRO apprend donc une courbe réelle à plusieurs points.

## CAL RAPIDE
La calibration objet + distance reste disponible comme méthode de secours.

## Installation / mise à jour
Remplace l'ancien dossier FRAME sur ton hébergement par cette version.
Ouvre ensuite FRAME une fois avec du réseau et recharge la page afin que le nouveau service worker prenne la V1.2.
