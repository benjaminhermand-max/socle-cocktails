/* Autres apéritifs & digestifs (hors Socle) — d'après les cours de culture professionnelle (apéritifs 01 à 04, digestifs). */
window.AUTRES = [
{
  s: "quinquinas", img: "x-quinquinas.png", n: "Quinquinas", titre: "Les Quinquinas", groupe: "aperitif",
  famille: "Apéritif à base de vin (A.B.V.)",
  intro: "Vin apéritif aromatisé de diverses plantes, dont traditionnellement l’écorce de quinquina : l’arbre dont on tirait la quinine, la « plante miracle » contre la malaria (paludisme).",
  id: [["Famille", "Apéritif à base de vin (A.B.V.)"], ["Base", "Vin blanc, vin rouge ou mistelle"], ["Aromates", "Écorce de quinquina, écorce d’orange, vanille, cacao, café"], ["Degré", "Environ 15 % vol."], ["Marques commerciales", "Dubonnet, St-Raphaël"]],
  sec: [
    { t: "Fabrication", steps: ["On fait macérer les écorces de quinquina et les aromates (orange, vanille, cacao, café) dans de l’alcool neutre.", "On ajoute cette macération au vin blanc, au vin rouge ou à la mistelle : c’est le <b>mutage</b>.", "On ajoute du sucre ou du caramel pour adoucir l’amertume et donner la couleur."] },
    { t: "Bon à savoir", text: "Le quinquina est un arbre d’Amérique du Sud. Son écorce contient la <b>quinine</b>, longtemps utilisée pour soigner la malaria : c’est elle qui donne aux quinquinas leur amertume caractéristique." }
  ]
},
{
  s: "vins-de-liqueur", img: "x-vins-de-liqueur.png", n: "Vins de liqueur", titre: "Les Vins de liqueur", groupe: "aperitif",
  famille: "Apéritif à base de vin (A.B.V.) — V.D.L.",
  intro: "Les vins de liqueur (V.D.L.) sont des vins mutés en début de fermentation avec une eau-de-vie. Le sucre du raisin est conservé : ils sont doux et titrent entre 15 et 22 % vol.",
  id: [["Famille", "Apéritif à base de vin (A.B.V.)"], ["Matière première", "Moût de raisin"], ["Mutage", "En début de fermentation, avec une eau-de-vie"], ["Degré", "15 à 22 % vol."], ["Exemples", "Pineau des Charentes, Floc de Gascogne, Macvin du Jura, Porto, Xérès"]],
  sec: [
    { t: "Le mutage", steps: ["Le <b>moût</b> (jus de raisin non fermenté, avec la pulpe, la peau et les pépins) commence à fermenter : les levures transforment le sucre en alcool.", "Dès le début de la fermentation, on ajoute une eau-de-vie : c’est le <b>mutage</b>.", "L’alcool stoppe l’action des levures : le vin garde une grande partie de son sucre naturel."] },
    { t: "Les principaux vins de liqueur", table: [["Vin de liqueur", "Région", "Muté avec"], ["Pineau des Charentes", "Charentes", "Cognac"], ["Floc de Gascogne", "Gascogne", "Armagnac"], ["Macvin du Jura", "Jura", "Marc du Jura"], ["Porto", "Portugal", "Eau-de-vie de vin"], ["Xérès", "Espagne (Andalousie)", "Eau-de-vie de vin"]] }
  ]
},
{
  s: "vins-doux-naturels", img: "x-vins-doux-naturels.png", n: "Vins doux naturels", titre: "Les Vins doux naturels", groupe: "aperitif",
  famille: "Apéritif à base de vin (A.B.V.) — V.D.N.",
  intro: "Riches en sucre et en alcool, les vins doux naturels (V.D.N.) sont des vins mutés pendant la fermentation. Ils sont majoritairement produits dans le Languedoc-Roussillon.",
  id: [["Famille", "Apéritif à base de vin (A.B.V.)"], ["Matière première", "Raisin (souvent muscat ou grenache)"], ["Mutage", "Pendant la fermentation, avec de l’alcool neutre"], ["Région principale", "Languedoc-Roussillon"], ["Exemples", "Muscat de Frontignan, Muscat de Beaumes-de-Venise, Banyuls"]],
  sec: [
    { t: "Fabrication", steps: ["Les raisins, très mûrs et riches en sucre, sont pressés : on obtient le moût.", "La fermentation commence : les levures transforment le sucre en alcool.", "Pendant la fermentation, on ajoute de l’alcool neutre : le mutage stoppe les levures.", "Le vin garde ainsi une partie de son sucre naturel : il est doux et alcoolisé."] },
    { t: "V.D.L. ou V.D.N. ?", table: [["", "Vin de liqueur (V.D.L.)", "Vin doux naturel (V.D.N.)"], ["Moment du mutage", "En début de fermentation", "Pendant la fermentation"], ["Muté avec", "Une eau-de-vie", "De l’alcool neutre"], ["Exemples", "Pineau, Floc, Macvin, Porto", "Muscats, Banyuls"]] }
  ]
},
{
  s: "anises", img: "x-anises.png", n: "Anisés", titre: "Les Anisés", groupe: "aperitif",
  famille: "Apéritif à base d’alcool (A.B.A.)",
  intro: "Les anisés sont des apéritifs qui se caractérisent par l’ajout d’extraits d’anis vert, d’anis étoilé (badiane) ou de fenouil. En France, ils sont associés à Marseille et au pastis.",
  id: [["Famille", "Apéritif à base d’alcool (A.B.A.)"], ["Base", "Alcool neutre à 96 % vol."], ["Aromates", "Anis vert, badiane, fenouil, réglisse"], ["Origine", "Marseille (pastis), Grèce (ouzo)"], ["Marques commerciales", "Ricard, 51, Berger Blanc, Ouzo — Pacifique (sans alcool)"]],
  sec: [
    { t: "Fabrication", steps: ["On fait macérer l’anis vert, la badiane, le fenouil et la réglisse dans de l’alcool neutre à 96 % vol., pendant environ une semaine.", "On distille pour récupérer les arômes.", "On ajoute du sucre et du caramel pour la couleur, puis de l’eau pour ramener le degré."] },
    { t: "Bon à savoir", text: "Les anisés se servent allongés d’eau fraîche : au contact de l’eau, les huiles d’anis se troublent et la boisson devient laiteuse. On l’appelle « l’alcool du soleil »." }
  ]
},
{
  s: "gentianes", img: "x-gentianes.png", n: "Gentianes", titre: "Les Gentianes", groupe: "aperitif",
  famille: "Apéritif à base d’alcool (A.B.A.)",
  intro: "Les gentianes sont des apéritifs produits à partir des racines de gentiane jaune, une plante de montagne à fleurs jaunes dont la racine apporte une saveur amère.",
  id: [["Famille", "Apéritif à base d’alcool (A.B.A.)"], ["Base", "Alcool neutre à 96 % vol."], ["Aromate", "Racines de gentiane jaune"], ["Origine", "Montagnes françaises (Massif central, Jura, Alpes)"], ["Marques commerciales", "Suze, Salers, Avèze"]],
  sec: [
    { t: "Fabrication", steps: ["On récolte les racines de gentiane jaune.", "On les fait macérer dans de l’alcool neutre à 96 % vol., entre 3 et 9 mois.", "On filtre, puis on ajoute du sucre et de l’eau pour ramener le degré."] },
    { t: "Bon à savoir", text: "La Suze a été créée en 1885 et est commercialisée depuis 1889 (date inscrite sur la bouteille). C’est la gentiane la plus connue en France ; son amertume en fait un apéritif apprécié pur ou allongé de tonic." }
  ]
},
{
  s: "armagnac", img: "x-armagnac.png", n: "Armagnac", titre: "L’Armagnac", groupe: "digestif",
  famille: "Digestif — eau-de-vie de vin",
  intro: "L’armagnac est une eau-de-vie de vin produite en Gascogne. C’est la plus ancienne eau-de-vie de France : distillée puis vieillie en fût de chêne, elle développe des arômes fruités, boisés et épicés.",
  id: [["Famille", "Digestif — eau-de-vie de vin"], ["Matière première", "Vin blanc (cépages ugni blanc, baco, folle blanche, colombard)"], ["Origine", "Gascogne (AOC Armagnac)"], ["Degré", "40 % vol. minimum"], ["Marques commerciales", "Bas-Armagnac Delord, Laubade"]],
  sec: [
    { t: "Fabrication", steps: ["On produit un vin blanc à partir des cépages de Gascogne.", "On le distille, le plus souvent en alambic armagnacais (distillation continue).", "L’eau-de-vie vieillit en fût de chêne, qui lui apporte arômes et couleur ambrée."] },
    { t: "Les mentions d’âge : VS, VSOP, XO…", table: [["Mention", "Signification", "Âge minimum"], ["VS ou ***", "Very Special", "1 an"], ["VSOP", "Very Superior Old Pale", "4 ans"], ["Napoléon", "Entre le VSOP et le XO", "6 ans"], ["XO", "Extra Old", "10 ans"], ["Hors d’âge", "Très vieil assemblage", "10 ans"], ["Millésime", "Une seule récolte, année indiquée", "Selon l’année"]] },
    { t: "Comment lire la mention ?", text: "Comme pour le cognac, l’âge indiqué est celui de l’eau-de-vie <b>la plus jeune</b> de l’assemblage, comptée en fût de chêne. Différence à retenir : un VS d’armagnac peut sortir après <b>1 an</b>, contre 2 ans pour un VS de cognac. L’armagnac est aussi réputé pour ses <b>millésimes</b>, issus d’une seule année de récolte." },
    { t: "Les trois terroirs", list: ["<b>Bas-Armagnac</b> : le plus réputé, aux eaux-de-vie fines et fruitées.", "<b>Ténarèze</b> : des eaux-de-vie plus corsées, qui gagnent à vieillir.", "<b>Haut-Armagnac</b> : le plus petit vignoble."] }
  ]
},
{
  s: "calvados", img: "x-calvados.png", n: "Calvados", titre: "Le Calvados", groupe: "digestif",
  famille: "Digestif — eau-de-vie de cidre",
  intro: "Le calvados est une eau-de-vie de cidre produite en Normandie, à partir de pommes (et de poires pour certaines appellations). Vieilli en fût de chêne, il offre des notes fraîches et fruitées.",
  id: [["Famille", "Digestif — eau-de-vie de cidre"], ["Matière première", "Cidre de pommes (et de poires)"], ["Origine", "Normandie (AOC Calvados)"], ["Degré", "40 % vol. minimum"], ["Marque commerciale", "Busnel"]],
  sec: [
    { t: "Fabrication", steps: ["Les pommes sont broyées et pressées ; le jus fermente et devient du cidre.", "On distille le cidre en alambic.", "L’eau-de-vie vieillit au moins 2 ans en fût de chêne."] },
    { t: "Les trois appellations", list: ["<b>Calvados</b> : l’appellation la plus large.", "<b>Calvados Pays d’Auge</b> : double distillation en alambic à repasse.", "<b>Calvados Domfrontais</b> : au moins 30 % de poires."] }
  ]
}
];
