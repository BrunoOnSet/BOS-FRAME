# BOS FRAME V3.27 — ONSET V58 EXACT CENTER

Correction ciblée du centrage global.

La règle finale réellement active dans ONSET_V58 est :
- max-width : 620px
- margin : 0 auto
- padding horizontal : 16px
- padding horizontal 12px sous 380px

FRAME utilisait encore une largeur de 760px issue d'une règle antérieure
de la référence, ce qui expliquait la différence visuelle dans une fenêtre
de navigateur desktop.

Aucune autre fonctionnalité n'est modifiée.
