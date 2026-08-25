# BOS FRAME V3.26 — EXACT ONSET V58 TITLES / CENTER / SLIDERS

Corrections :

- titres des bulles copiés sur les valeurs finales ONSET_V58 :
  - padding 15 × 16 px
  - titre 16 px
  - bleu #2F5B66
  - sous-titre 10 px
  - point 8 px
  - pile typographique identique à V58

- centrage :
  - largeur min(760px, 100%)
  - margin auto
  - padding latéral 12 px, y compris mobile
  - suppression des overrides FRAME qui ramenaient les marges à 9 px

- personnes 2 / 3 / 4 :
  - le DOM du slider n'est plus recréé pendant le glissement
  - la poignée reste donc sous le doigt
  - le chiffre se met à jour sans interrompre le drag
  - le chiffre reste cliquable pour saisie libre
