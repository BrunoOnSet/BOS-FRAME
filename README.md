# BOS FRAME V3.19 — WIDE FIX + ARMS

Corrections :
1. Gros plan / plans serrés :
   - correction du calcul de placement caméra pour les focales larges (24 mm et moins)
   - si le sujet devient "trop proche" et passe en projection invalide,
     l'algorithme considère maintenant qu'il faut RECULER la caméra
     au lieu de la coller à la distance minimale.

2. Mannequin :
   - nouvel asset reconstruit depuis l'image de référence exacte
   - les deux bras sont conservés
   - ratios de calibration V3.18 conservés
