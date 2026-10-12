// Présentations des alcools, validées à partir des cours de culture professionnelle.
// sections : { t: titre, steps: [...] } | { t, list: [...] } | { t, table: [[en-têtes], [ligne], ...] } | { t, text }
window.ALCOOLS = [
{
  s: "gin", n: "Gin", titre: "Le Gin", famille: "Eau-de-vie de grains aromatisée", img: "gin.png",
  intro: "Le gin est une eau-de-vie (de céréales, de mélasse ou de vin) aromatisée principalement avec des baies de genièvre, qui lui donnent son goût unique.",
  id: [["Famille", "Digestif — eau-de-vie de grains blanche"], ["Matières premières", "Céréales, mélasse ou vin"], ["Aromates", "Genièvre, coriandre, angélique, écorces d’agrumes, fenouil, réglisse, racines, fleurs"], ["Origine", "Hollande, très prisé des Anglais"], ["Degré", "37,5 % vol. minimum"], ["Marques commerciales", "Beefeater, Bombay Sapphire"]],
  sec: [
    { t: "Fabrication", steps: ["On part d’une eau-de-vie de grains neutre.", "On ajoute les aromates, selon deux méthodes.", "On distille : les vapeurs d’alcool se chargent en arômes, puis sont condensées et refroidies.", "On ajoute de l’eau pour ramener l’alcool d’environ 80 % à 37,5 % vol. minimum."] },
    { t: "Les deux méthodes", list: ["<b>London Dry Gin</b> : les aromates sont placés dans l’alambic, l’alcool est aromatisé par distillation.", "<b>Gin simple</b> : les aromates sont ajoutés directement dans l’alcool par macération."] }
  ]
},
{
  s: "rhum", n: "Rhum", titre: "Le Rhum", famille: "Eau-de-vie de canne à sucre", img: "rhum.png",
  intro: "Le rhum est une eau-de-vie de canne à sucre ; selon la matière première, on distingue le rhum agricole et le rhum traditionnel.",
  id: [["Famille", "Digestif — eau-de-vie de plante"], ["Matière première", "Canne à sucre : jus frais (vesou) ou mélasse"], ["Origine", "Caraïbes, Antilles"], ["Degré à la distillation", "65 à 80 % vol."], ["Marques commerciales", "Bacardi, Havana Club, Charrette, Clément, Trois Rivières, Saint James"]],
  sec: [
    { t: "Rhum agricole ou rhum traditionnel ?", table: [["", "Rhum agricole", "Rhum traditionnel (industriel)"], ["Matière première", "Jus de canne frais (vesou)", "Mélasse, résidu de la fabrication du sucre"], ["Production", "Surtout Antilles françaises", "Environ 90 % de la production mondiale"], ["Exemples", "Saint James, Clément, Trois Rivières", "Bacardi, Havana Club"]] },
    { t: "Fabrication", steps: ["Fermentation du vesou ou de la mélasse : on obtient un jus à 5-6 % vol.", "Distillation, le plus souvent en colonne : on obtient une eau-de-vie de 65 à 80 % vol.", "Vieillissement en fût de chêne (rhum ambré), ou pas (rhum blanc)."] }
  ]
},
{
  s: "vodka", n: "Vodka", titre: "La Vodka", famille: "Eau-de-vie de grains blanche", img: "vodka.png",
  intro: "La vodka est une eau-de-vie de grains blanche, originaire de Russie et de Pologne, filtrée pour obtenir un goût très neutre.",
  id: [["Famille", "Digestif — eau-de-vie de grains blanche"], ["Matières premières", "Céréales (blé, seigle, orge) ou mélasses de betterave et de pomme de terre"], ["Origine", "Russie et Pologne"], ["Degré", "37,5 % vol. minimum"], ["Marques commerciales", "Absolut, Zubrowka, Eristoff"]],
  sec: [
    { t: "Fabrication", steps: ["<b>Maltage</b> : on trempe les céréales dans l’eau pour les faire germer.", "<b>Fermentation</b> : pendant 3 jours, les levures transforment le sucre en alcool.", "<b>Distillation</b> : en alambic à colonnes ; l’alcool passe au minimum par 3 colonnes successives pour sélectionner les arômes les plus fins.", "<b>Purification</b> : filtration au charbon de bois et au quartz, pour enlever les impuretés et les mauvais goûts.", "<b>Réduction</b> : on ajoute de l’eau distillée pour ramener le degré à 37,5 % vol."] }
  ]
},
{
  s: "whisky", n: "Whisky", titre: "Le Whisky", famille: "Eau-de-vie de grains brune", img: "whisky.png",
  intro: "Le whisky est une eau-de-vie de grains brune, vieillie en fût de chêne ; c’est le digestif le plus consommé en France.",
  id: [["Famille", "Digestif — eau-de-vie de grains brune"], ["Matières premières", "Céréales : orge maltée, maïs, seigle"], ["Pays producteurs", "Écosse, Irlande, Japon, États-Unis, France"], ["Degré à la distillation", "70 à 80 % vol."], ["Marques commerciales", "Clan Campbell, Aberlour, Glenlivet, Chivas, Talisker, Paddy, Jameson, Wild Turkey"]],
  sec: [
    { t: "Fabrication", steps: ["<b>Maltage</b> : l’orge est humidifiée (2 jours) pour activer la germination, qui transforme l’amidon en sucre (8 jours).", "<b>Touraillage</b> : l’orge maltée est séchée dans des fours, parfois à la fumée de tourbe (whisky tourbé).", "<b>Brassage</b> : la céréale réduite en farine est mélangée à l’eau chaude pour en extraire le sucre.", "<b>Fermentation</b> : les levures donnent un jus à 6-8 % vol.", "<b>Distillation</b> : en alambic à chauffe directe ou à colonne, jusqu’à 70-80 % vol.", "<b>Vieillissement</b> : en fût de chêne, souvent un fût ayant contenu du bourbon ou du xérès, qui apporte arômes et couleur.", "<b>Assemblage</b> : on mélange des whiskies de fûts, d’âges et de distilleries différents."] },
    { t: "Les types de whisky", table: [["Type", "Définition"], ["Single malt", "100 % orge maltée, une seule distillerie"], ["Pur malt", "100 % orge maltée, plusieurs distilleries"], ["Blend", "Mélange de whisky de malt et de whisky de grain"], ["Bourbon (États-Unis)", "Minimum 51 % de maïs"], ["Rye (États-Unis)", "Minimum 51 % de seigle"]] }
  ]
},
{
  s: "vermouth", n: "Vermouth", titre: "Le Vermouth", famille: "Apéritif à base de vin", img: "vermouth.png",
  intro: "Le vermouth est un vin aromatisé par une macération de plantes et d’épices, puis fortifié par l’ajout de mistelle ; il titre entre 14,5 et 22 % vol.",
  id: [["Famille", "Apéritif à base de vin (A.B.V.)"], ["Base", "Vin blanc de Sète ou de Chambéry"], ["Épices", "Quinquina, clou de girofle, gentiane, absinthe, écorces d’orange, gingembre, cannelle"], ["Origine", "Italie (Turin)"], ["Degré", "14,5 à 22 % vol."], ["Marques", "Martini, Vermouth Routin de Chambéry"]],
  sec: [
    { t: "Composition", table: [["Ingrédient", "Part"], ["Vin blanc", "75 %"], ["Alcool neutre ou mistelle", "11 %"], ["Plantes et épices", "9 %"], ["Sucre", "4 %"], ["Caramel (colore le vermouth rouge)", "1 %"]] },
    { t: "La mistelle", text: "La mistelle est un jus de raisin frais mélangé à un alcool neutre." }
  ]
},
{
  s: "champagne", n: "Champagne", titre: "Le Champagne", famille: "Vins effervescents", img: "champagne.png",
  intro: "Le champagne est un vin effervescent d’appellation d’origine contrôlée, produit uniquement en Champagne, dont les bulles naissent d’une seconde fermentation en bouteille.",
  id: [["Famille", "Vin effervescent (AOC Champagne)"], ["Cépages", "Chardonnay, pinot noir, pinot meunier"], ["Origine", "Champagne (Reims, Épernay)"], ["Degré", "Environ 12 % vol."], ["Marque", "Veuve Clicquot"]],
  sec: [
    { t: "Fabrication : la méthode traditionnelle", steps: ["On élabore un vin tranquille, souvent par assemblage de cépages et d’années.", "On le met en bouteille avec du sucre et des levures (liqueur de tirage).", "Une seconde fermentation en bouteille produit le gaz carbonique : la prise de mousse.", "Vieillissement sur lies, remuage, puis dégorgement pour retirer le dépôt.", "On ajoute la liqueur d’expédition, qui fixe le dosage en sucre (brut, extra-brut, demi-sec…)."] },
    { t: "Les autres vins effervescents", text: "Le Socle accepte aussi le prosecco (Italie), à privilégier pour le Spritz et le Negroni Sbagliato." }
  ]
},
{
  s: "tequila", n: "Tequila", titre: "La Tequila", famille: "Eau-de-vie d’agave", img: "tequila.png",
  intro: "La tequila est une eau-de-vie de plante, tirée de l’agave, et produite exclusivement au Mexique.",
  id: [["Famille", "Digestif — eau-de-vie de plante"], ["Matière première", "L’agave bleu (aussi appelé maguey) ; on utilise son cœur, la piña"], ["Origine", "Mexique, exclusivement"], ["Degré", "35 à 40 % vol."], ["Marques", "Olmeca, San José"]],
  sec: [
    { t: "Fabrication", steps: ["Le cœur de l’agave (piña) est cuit, puis broyé : il libère des sucres fermentescibles.", "<b>Fermentation</b> : les levures mangent ces sucres et produisent un alcool à 6-8 % vol.", "<b>Distillation</b> en alambic.", "<b>Vieillissement</b> en fût de chêne, ou pas : quelques mois, voire quelques années."] },
    { t: "Tequila blanche ou ambrée ?", text: "Certaines tequilas vieillissent en fût de chêne, ce qui leur donne une couleur ambrée. La tequila blanche (blanco) n’est pas vieillie." }
  ]
},
{
  s: "cognac", n: "Cognac", titre: "Le Cognac", famille: "Eau-de-vie de vin", img: "cognac.png",
  intro: "Le cognac est une eau-de-vie de vin d’appellation d’origine contrôlée, issue d’une double distillation en alambic charentais et vieillie au moins 2 ans en fût de chêne.",
  id: [["Famille", "Digestif — eau-de-vie de vin"], ["Matière première", "Vin blanc, cépage Ugni blanc"], ["Origine", "Charentes (AOC Cognac)"], ["Degré", "40 % vol. minimum"], ["Marques commerciales", "Hennessy, Martell"]],
  sec: [
    { t: "Fabrication", steps: ["On distille le vin une première fois dans un alambic charentais (à repasse) : on obtient le <b>brouillis</b>, à environ 30 % vol.", "On le distille une seconde fois, c’est la <b>bonne chauffe</b> : une eau-de-vie à environ 72 % vol.", "Vieillissement en fût de chêne, au moins 2 ans avant la commercialisation."] },
    { t: "Les trois grandes eaux-de-vie françaises", table: [["Eau-de-vie", "Terroir", "Matière première", "Distillation"], ["Cognac", "Charentes", "Vin (Ugni blanc)", "Double, alambic charentais"], ["Armagnac", "Gascogne", "Vin (Ugni blanc)", "Unique, alambic à colonne"], ["Calvados", "Normandie", "Cidre (pommes, parfois poires)", "Alambic charentais ou à colonne"]] },
    { t: "Bon à savoir", text: "Le Mint Julep peut aussi se faire au cognac : c’est l’une des deux eaux-de-vie de la recette originelle." }
  ]
},
{
  s: "bitter", n: "Bitter", titre: "Le Bitter", famille: "Apéritif à base d’alcool", img: "bitter.png",
  intro: "Le bitter est une liqueur apéritive à base d’alcool neutre et de substances amères ; le mot « bitter » signifie « amer » en anglais et en allemand.",
  id: [["Famille", "Apéritif à base d’alcool (A.B.A.)"], ["Aromates", "Écorce de quinquina, gentiane jaune, écorces d’orange, de citron et de pamplemousse"], ["Pays producteurs", "France (Corse), Italie (Sardaigne, Sicile), Espagne"], ["Marques commerciales", "Campari, Picon, Angostura, Bitter San Pellegrino"]],
  sec: [
    { t: "Fabrication", steps: ["On part d’un alcool neutre à 96 % vol.", "On y fait macérer les aromates pendant environ 2 mois.", "Pour le Campari, la couleur rouge vient de la cochenille (colorant E120)."] },
    { t: "Les 4 catégories de bitters", table: [["Catégorie", "Exemple", "Usage"], ["Amers clairs", "Campari (Milan, Italie)", "Apéritif, cocktails"], ["Goudrons", "Picon", "Surtout mélangé à la bière"], ["Concentrés", "Angostura", "Épice à cocktail : quelques gouttes suffisent"], ["Sans alcool", "Bitter San Pellegrino", "Apéritif sans alcool"]] },
    { t: "Attention à ne pas confondre", text: "Dans les fiches du Socle, « bitter » désigne un amer clair type Campari, alors que l’« aromatic bitters » (Angostura) est un bitter concentré dosé en traits." }
  ]
},
{
  s: "cachaca", n: "Cachaça", titre: "La Cachaça", famille: "Eau-de-vie de canne à sucre", img: "cachaca.png",
  intro: "La cachaça est l’eau-de-vie nationale du Brésil, distillée à partir de jus de canne à sucre frais, comme le rhum agricole.",
  id: [["Famille", "Digestif — eau-de-vie de plante"], ["Matière première", "Jus de canne à sucre frais"], ["Origine", "Brésil, exclusivement"], ["Degré", "38 à 48 % vol."], ["Marque", "Thoquino"]],
  sec: [
    { t: "Fabrication", steps: ["Le jus de canne frais est fermenté par des levures.", "Distillation, le plus souvent en alambic.", "Embouteillée blanche, ou vieillie en fût de bois."] },
    { t: "Cachaça ou rhum agricole ?", text: "Les deux partent du jus de canne frais : la cachaça se distingue par son origine (Brésil) et sa réglementation propre." }
  ]
},
{
  s: "xeres", n: "Xérès", titre: "Le Xérès", famille: "Vin de liqueur", img: "xeres.png",
  intro: "Le xérès (sherry) est un vin de liqueur espagnol : un vin dont on a arrêté la fermentation par l’ajout d’une eau-de-vie, c’est le mutage.",
  id: [["Famille", "Apéritif à base de vin (A.B.V.) — vin de liqueur (V.D.L.)"], ["Origine", "Espagne, région de Jerez en Andalousie"], ["Degré", "15 à 22 % vol."], ["Marque", "Drysack"]],
  sec: [
    { t: "Le mutage", steps: ["Les levures transforment le sucre du moût de raisin en alcool : c’est la fermentation alcoolique.", "On ajoute de l’alcool en début de fermentation : les levures s’arrêtent.", "On conserve ainsi une partie du sucre et on augmente le degré : on obtient un vin de liqueur."] },
    { t: "Les vins de liqueur vus en cours", list: ["Pineau des Charentes (muté au cognac)", "Floc de Gascogne (muté à l’armagnac)", "Macvin du Jura (muté au marc du Jura)", "Porto", "Xérès"] },
    { t: "Fino, medium…", text: "Le Socle demande un xérès <b>fino</b>, le plus sec et le plus clair. Le Drysack illustre la famille, mais c’est un medium, plus doux." }
  ]
},
{
  s: "liqueurs", n: "Liqueurs & crèmes", titre: "Les Liqueurs et les crèmes", famille: "Triple sec, maraschino, café…", img: "liqueurs.png",
  intro: "Les liqueurs et les crèmes sont des spiritueux sucrés, élaborés à partir d’alcool et de plantes, de fruits ou d’épices ; dans les cocktails, elles apportent le « sweet » de la règle des 3 S.",
  id: [["Liqueurs", "Spiritueux sucrés à base d’alcool, de plantes, de fruits ou d’épices — au moins 100 g de sucre par litre"], ["Crèmes", "Liqueurs plus sucrées, à base d’alcool neutre ou de fruits, à la texture onctueuse — au moins 250 g de sucre par litre"], ["Liqueurs vues en cours", "Cointreau, Grand Marnier, Mandarine Impériale, Izarra, Kahlua, Disaronno, Get 27, Manzana"], ["Crèmes vues en cours", "Crème de cassis L’Héritier-Guyot et Cartron, liqueurs Marie Brizard"]],
  sec: [
    { t: "Les liqueurs et crèmes du Socle", table: [["Produit", "Arôme", "Cocktails"], ["Triple sec (Cointreau)", "Écorces d’orange", "Cosmopolitan, Margarita, Sidecar"], ["Curaçao orange", "Écorces d’orange", "Mai Tai"], ["Maraschino", "Cerise marasque", "Aviation"], ["Crème de violette", "Violette", "Aviation"], ["Crème de mûre", "Mûre", "Bramble"], ["Liqueur de café", "Café", "Espresso Martini"], ["Liqueur de fruit de la passion", "Fruit de la passion", "Pornstar Martini"], ["Liqueur de pêche", "Pêche", "Sex on the Beach"], ["Velvet falernum", "Citron vert, gingembre, clou de girofle", "Rum Swizzle"]] }
  ]
}
];
