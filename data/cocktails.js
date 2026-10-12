// Fiches techniques du Socle des Cocktails de Référence (édition 2025).
// ing : [dose, ingrédient, famille d'alcool éventuelle] dans l'ordre de la recette.
// m : méthode (shaker | melange | direct) · v : verre (nom de fichier dans img/verres)
window.COCKTAILS = [
{
  s: "aviation", n: "Aviation", p: "Floral, acidulé et fruité", base: "gin",
  h: "Cocktail publié dans le livre « Recipes for mixed drinks » de Hugo Ensslin à New York en 1916.",
  ing: [["10 ml", "Jus de citron"], ["15 ml", "Maraschino", "liqueurs"], ["5 ml", "Crème de violette", "liqueurs"], ["40 ml", "Gin", "gin"]],
  m: "shaker", v: "nick-nora", g: "Cerise à l’eau-de-vie", c: "Short drink", t: "All day cocktail", tav: 28,
  tech: ["Mirer et remplir le verre Nick & Nora de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Retirer la glace du verre et égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rafraîchi", "Garnir d’une cerise à l’eau-de-vie"]
},
{
  s: "bamboo", n: "Bamboo", p: "Vineux, sec et épicé", base: "xeres",
  h: "Boisson répandue en Malaisie en 1878, popularisée aux États-Unis, puis au Japon par Louis Eppinger au début des années 1900.",
  ing: [["35 ml", "Sherry fino", "xeres"], ["35 ml", "Vermouth dry", "vermouth"], ["2 traits", "Bitters orange"]],
  m: "melange", v: "nick-nora", g: "Zeste de citron exprimé", c: "Short drink", t: "Before dinner", tav: 15,
  tech: ["Mirer et remplir le verre Nick & Nora et le verre à mélange de glace", "Rafraîchir le verre et le verre à mélange avec la cuillère de bar", "Retirer la glace du verre et égoutter le verre à mélange", "Verser les ingrédients dans le verre à mélange", "Mélanger puis passer dans le verre rafraîchi", "Garnir d’un zeste de citron exprimé"],
  vars: [["Ratios", "Selon les livres et les rééditions de la recette, certains adaptent les ratios sherry / vermouth."]],
  nb: "La technique du Cuban Roll peut être utilisée pour réaliser le cocktail."
},
{
  s: "bramble", n: "Bramble", p: "Fruité, acidulé et frais", base: "gin",
  h: "Créé par Dick Bradsell au Fred’s Club à Londres dans les années 1980.",
  ing: [["5 ml", "Sirop de sucre"], ["15 ml", "Jus de citron"], ["40 ml", "Gin", "gin"], ["10 ml", "Crème de mûre", "liqueurs"]],
  m: "direct", v: "old-fashioned", g: "Demi-tranche de citron et deux mûres", c: "Short drink", t: "All day cocktail", tav: 25,
  tech: ["Mirer et remplir le verre Old Fashioned de glace pilée", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients à l’exception de la crème de mûre", "Mélanger", "Compléter le verre de glace pilée", "Verser la crème de mûre (sans mélanger)", "Garnir d’une demi-tranche de citron et de deux mûres", "Ajouter une paille courte"]
},
{
  s: "caipirinha", n: "Caipirinha", p: "Puissant, acidulé et frais", base: "cachaca",
  h: "Cocktail national du Brésil dont la recette est publiée, pour la première fois, durant l’été 1948.",
  ing: [["1/2", "Citron vert en morceaux"], ["1 bar spoon", "Sucre en poudre"], ["40 ml", "Cachaça", "cachaca"]],
  m: "direct", v: "old-fashioned", g: "Aucune", c: "Short drink", t: "All day cocktail", tav: 40,
  tech: ["Mirer et remplir le verre Old Fashioned de glace pilée", "Rafraîchir le verre avec la cuillère de bar", "Retirer la glace du verre", "Piler le demi-citron vert coupé en morceaux et le sucre en poudre", "Compléter le verre de glace pilée", "Verser la mesure de cachaça", "Mélanger et compléter de glace pilée", "Ajouter une paille courte"],
  vars: [["Caipirovska", "La vodka remplace la cachaça."], ["Caipirissima", "Le ron cubain remplace la cachaça."]]
},
{
  s: "cosmopolitan", n: "Cosmopolitan", p: "Fruité, acidulé et gourmand", base: "vodka",
  h: "Recette mise au point par Toby Cecchini lorsqu’il officiait au restaurant Odéon à New York en 1988.",
  ing: [["5 ml", "Jus de citron vert"], ["20 ml", "Nectar de cranberry"], ["15 ml", "Triple sec", "liqueurs"], ["30 ml", "Vodka", "vodka"]],
  m: "shaker", v: "coupe", g: "Zeste de citron vert exprimé", c: "Short drink", t: "All day cocktail", tav: 27,
  tech: ["Mirer et remplir le verre Coupe de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Retirer la glace du verre et égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rafraîchi", "Garnir d’un zeste de citron vert exprimé"]
},
{
  s: "daiquiri", n: "Daiquiri", p: "Puissant, acidulé et frais", base: "rhum",
  h: "Premier cocktail national de Cuba dont l’origine est attribuée à Jennings S. Cox, ingénieur de la mine cubaine de Daiquiri vers 1900.",
  ing: [["1 bar spoon", "Sucre en poudre"], ["20 ml", "Jus de citron vert"], ["40 ml", "Ron cubain 3 años", "rhum"]],
  m: "shaker", v: "coupe", g: "Aucune", c: "Short drink", t: "All day cocktail", tav: 27,
  tech: ["Mirer et remplir le verre Coupe de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Diluer le sucre en mélangeant quelques secondes avec une cuillère de bar", "Retirer la glace du verre et égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rafraîchi"],
  vars: [["Hemingway Special", "10 ml jus de citron vert, 20 ml jus de pamplemousse, 5 ml maraschino, 40 ml ron cubain 3 años."]]
},
{
  s: "dry-martini", n: "Dry Martini", p: "Puissant, vineux et sec", base: "gin",
  h: "C’est une évolution du Martinez apparu en 1884 aux États-Unis. La première recette est publiée dans le livre « American Bar » de Frank Newman à Paris en 1904.",
  ing: [["15 ml", "Vermouth dry", "vermouth"], ["55 ml", "Gin", "gin"]],
  m: "melange", v: "martini", g: "Olive verte ou zeste de citron exprimé", c: "Short drink", t: "Before dinner", tav: 35,
  tech: ["Mirer et remplir le verre Martini et le verre à mélange de glace", "Rafraîchir le verre et le verre à mélange avec la cuillère de bar", "Retirer la glace du verre et égoutter le verre à mélange", "Verser les ingrédients dans le verre à mélange", "Mélanger puis passer dans le verre rafraîchi", "Garnir d’une olive verte ou d’un zeste de citron exprimé"],
  vars: [["Vodkatini", "La vodka remplace le gin."], ["Tequini", "La tequila remplace le gin."], ["Gibson", "Garnir d’un oignon grelot."], ["Martinez", "Vermouth rouge, liqueur maraschino, deux traits d’aromatic bitters et une cerise à l’eau-de-vie."], ["Dirty Martini", "15 ml de saumure d’olive remplacent les 15 ml de vermouth dry."]]
},
{
  s: "espresso-martini", n: "Espresso Martini", p: "Corsé, complexe et gourmand", base: "vodka",
  h: "Recette mise au point par Dick Bradsell au Soho Brasserie de Londres en 1983.",
  ing: [["5 ml", "Sirop de sucre"], ["25 ml", "Café espresso"], ["10 ml", "Liqueur de café", "liqueurs"], ["30 ml", "Vodka", "vodka"]],
  m: "shaker", v: "coupe", g: "Trois grains de café", c: "Short drink", t: "After dinner", tav: 27,
  tech: ["Mirer et remplir le verre Coupe de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Retirer la glace du verre et égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rafraîchi", "Garnir de trois grains de café déposés sur la mousse"]
},
{
  s: "gin-basil-smash", n: "Gin Basil Smash", p: "Frais, acidulé et végétal", base: "gin",
  h: "Créé par Jörg Meyer au bar Le Lion – Café de Paris à Hambourg en Allemagne en 2008.",
  ing: [["15 ml", "Sirop de sucre"], ["20 ml", "Jus de citron"], ["50 ml", "Gin", "gin"], ["10 feuilles", "Basilic"]],
  m: "shaker", v: "old-fashioned", g: "Tête de basilic frais", c: "Short drink", t: "All day cocktail", tav: 25,
  tech: ["Mirer et remplir le verre Old Fashioned de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Égoutter le verre et compléter de glace si besoin", "Égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rempli de glace", "Garnir d’une tête de basilic frais"]
},
{
  s: "manhattan", n: "Manhattan", p: "Puissant, vineux et complexe", base: "whisky",
  h: "Considéré comme le premier cocktail apéritif, il est attribué à Georges Black, propriétaire du Manhattan Inn à New York. Il l’aurait inventé vers 1880.",
  ing: [["2 traits", "Aromatic bitters"], ["20 ml", "Vermouth rouge", "vermouth"], ["50 ml", "Whiskey américain", "whisky"]],
  m: "melange", v: "nick-nora", g: "Cerise à l’eau-de-vie", c: "Short drink", t: "Before dinner", tav: 35,
  tech: ["Mirer et remplir le verre Nick & Nora et le verre à mélange de glace", "Rafraîchir le verre et le verre à mélange avec la cuillère de bar", "Retirer la glace du verre et égoutter le verre à mélange", "Verser les ingrédients dans le verre à mélange", "Mélanger puis passer dans le verre rafraîchi", "Garnir d’une cerise à l’eau-de-vie"],
  vars: [["Rob Roy", "Aromatic bitters, 15 ml vermouth rouge, 55 ml scotch whisky, 1 cerise à l’eau-de-vie."]]
},
{
  s: "margarita", n: "Margarita", p: "Puissant, acidulé et frais", base: "tequila",
  h: "La recette apparaît sous différentes appellations à la fin des années 1930. C’est en 1953 que son nom définitif est publié et adopté aux États-Unis.",
  ing: [["10 ml", "Jus de citron vert"], ["20 ml", "Triple sec", "liqueurs"], ["40 ml", "Tequila", "tequila"]],
  m: "shaker", v: "coupe", g: "Givrage au sel fin", c: "Short drink", t: "All day cocktail", tav: 34,
  tech: ["Mirer et givrer le verre Coupe au sel fin", "Remplir le verre et la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Retirer la glace du verre et égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rafraîchi"],
  vars: [["Tommy’s Margarita", "Le sirop d’agave remplace le triple sec."]],
  nb: "Le rim au sel neutre est proposé lors de la prise de commande."
},
{
  s: "mint-julep", n: "Mint Julep", p: "Puissant, frais et parfumé", base: "whisky",
  h: "C’est la boisson américaine de l’été par excellence. La première recette, réalisée avec de la glace, est publiée dans l’État de Virginie aux États-Unis en 1807.",
  ing: [["10 feuilles", "Menthe"], ["2 bar spoons", "Sucre en poudre"], ["50 ml", "Eau-de-vie brune", "whisky"]],
  m: "direct", v: "julep", g: "Tête de menthe fraîche", c: "Short drink", t: "All day cocktail", tav: 40,
  tech: ["Mirer et remplir la timbale Julep de glace pilée", "Rafraîchir la timbale avec la cuillère de bar", "Retirer la glace de la timbale", "Piler la menthe et le sucre en poudre", "Compléter la timbale de glace pilée", "Verser l’eau-de-vie", "Mélanger", "Garnir d’une tête de menthe fraîche et ajouter une paille courte"],
  nb: "La recette originelle privilégie l’utilisation de cognac ou de whiskey américain."
},
{
  s: "negroni", n: "Negroni", p: "Puissant, vineux et amer", base: "gin",
  h: "À la fin des années 1920, plusieurs recettes n’ayant pas la même composition sont très populaires à Paris. La recette et le nom final du cocktail sont publiés, pour la première fois en Italie, en 1947.",
  ing: [["30 ml", "Vermouth rouge", "vermouth"], ["30 ml", "Bitter", "bitter"], ["30 ml", "Gin", "gin"]],
  m: "direct", v: "old-fashioned", g: "Demi-tranche d’orange", c: "Short drink", t: "Before dinner", tav: 26,
  tech: ["Mirer et remplir le verre Old Fashioned de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients", "Mélanger", "Garnir d’une demi-tranche d’orange"],
  vars: [["Negroni Sbagliato", "Le prosecco remplace le gin."], ["Boulevardier", "Le bourbon remplace le gin."], ["Cardinale", "Le vermouth dry remplace le vermouth rouge."], ["White Negroni", "30 ml vermouth blanc, 30 ml gentiane, 30 ml gin."]]
},
{
  s: "old-fashioned", n: "Old-Fashioned", p: "Puissant, boisé et complexe", base: "whisky",
  h: "La première recette d’Old-Fashioned fut mise au point aux États-Unis en 1806.",
  ing: [["1 morceau", "Sucre brun"], ["2 traits", "Aromatic bitters"], ["50 ml", "Eau-de-vie brune", "whisky"]],
  m: "direct", v: "old-fashioned", g: "Zeste d’orange exprimé et cerise à l’eau-de-vie", c: "Short drink", t: "All day cocktail", tav: 40,
  tech: ["Mirer et remplir le verre Old Fashioned de glace", "Rafraîchir le verre avec la cuillère de bar", "Retirer la glace du verre", "Piler le morceau de sucre brun imbibé d’aromatic bitters", "Remplir à moitié de glace le verre", "Verser 20 ml d’eau-de-vie brune", "Mélanger", "Compléter le verre de glace et verser les 30 ml d’eau-de-vie brune restants", "Mélanger", "Garnir d’un zeste d’orange exprimé et d’une cerise à l’eau-de-vie"],
  nb: "Toutes les eaux-de-vie vieillies peuvent être utilisées pour réaliser un Old-Fashioned. La recette originelle privilégie le whiskey américain."
},
{
  s: "penicillin", n: "Penicillin", p: "Tourbé, acidulé et épicé", base: "whisky",
  h: "Créé par Sam Ross du bar Milk & Honey de New York en 2005.",
  ing: [["20 ml", "Jus de citron"], ["10 ml", "Sirop de miel"], ["10 ml", "Jus de gingembre frais"], ["40 ml", "Blend whisky", "whisky"], ["10 ml", "Whisky tourbé", "whisky"]],
  m: "shaker", v: "old-fashioned", g: "Lamelle de gingembre", c: "Short drink", t: "All day cocktail", tav: 25,
  tech: ["Mirer et remplir le verre Old Fashioned de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker à l’exception du whisky tourbé", "Égoutter le verre et compléter de glace si besoin", "Égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rempli de glace", "Verser le whisky tourbé (sans mélanger)", "Garnir d’une lamelle de gingembre"],
  nb: "Le jus de gingembre peut être remplacé par 3 tranches de gingembre frais pilées."
},
{
  s: "pornstar-martini", n: "Pornstar Martini", p: "Acidulé, fruité et gourmand", base: "vodka",
  h: "Créé par Douglas Ankrah au bar Townhouse à Londres en 2002. L’idée originale était de manger le fruit de la passion, de rincer son palais avec le champagne, puis de déguster le cocktail.",
  ing: [["10 ml", "Sirop de vanille"], ["30 ml", "Purée de fruit de la passion"], ["20 ml", "Liqueur de fruit de la passion", "liqueurs"], ["30 ml", "Vodka vanille", "vodka"]],
  m: "shaker", v: "coupe", g: "Demi-fruit de la passion, champagne servi à part en verre shot", c: "Short drink", t: "All day cocktail", tav: 18,
  tech: ["Mirer et remplir le verre Coupe de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Retirer la glace du verre et égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rafraîchi", "Garnir d’un demi-fruit de la passion", "Accompagner de champagne servi dans un verre shot"],
  nb: "Le sirop de vanille peut être remplacé par une bar spoon de sucre vanillé."
},
{
  s: "sidecar", n: "Sidecar", p: "Puissant, acidulé et frais", base: "cognac",
  h: "Lors de la première publication de la recette en 1922 à Londres, Robert Vermeire précise dans son livre « Cocktails – How to mix them » que la recette est très populaire en France. Le nom rendrait hommage à un officier qui se rendait au bar en side-car.",
  ing: [["10 ml", "Jus de citron"], ["20 ml", "Triple sec", "liqueurs"], ["40 ml", "Cognac", "cognac"]],
  m: "shaker", v: "coupe", g: "Aucune", c: "Short drink", t: "All day cocktail", tav: 36,
  tech: ["Mirer et remplir le verre Coupe de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Retirer la glace du verre et égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rafraîchi"],
  vars: [["White Lady", "10 ml jus de citron, 20 ml triple sec, 40 ml gin."]]
},
{
  s: "sour", n: "Sour", p: "Puissant, acidulé et frais", base: "whisky",
  h: "Variante du Whiskey Sour paru dans « The Bartender’s Guide » dès 1862.",
  ing: [["1 bar spoon", "Sucre en poudre"], ["20 ml", "Jus de citron"], ["20 ml", "Blanc d’œuf ou aquafaba"], ["50 ml", "Spiritueux (whiskey)", "whisky"]],
  m: "shaker", v: "old-fashioned", g: "Cerise à l’eau-de-vie", c: "Short drink", t: "All day cocktail", tav: 28,
  techTitre: "Technique dry shake",
  tech: ["Mirer et remplir le verre Old Fashioned de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Diluer le sucre en mélangeant quelques secondes avec une cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Frapper (sans glace)", "Remplir la grande timbale du shaker de glace", "Frapper puis passer dans le verre rempli de glace", "Garnir d’une cerise à l’eau-de-vie"],
  vars: [["Sans émulsifiant", "Le cocktail peut être proposé sans émulsifiant. Dans ce cas, utiliser un verre Martini."]],
  nb: "Tous les spiritueux peuvent être utilisés en Sour. La technique du reverse dry shake peut être choisie pour réaliser le cocktail."
},
{
  s: "americano", n: "Americano", p: "Vineux, amer et désaltérant", base: "bitter",
  h: "Créé au Gaspare Campari’s à Milan en 1860. Son nom d’origine mêlait les deux villes d’où sont originaires ses deux composants : Milano-Torino. La clientèle américaine de passage demandait un ajout d’eau gazeuse ; les Italiens ont donc baptisé cette version pour rendre hommage aux consommateurs américains.",
  ing: [["20 ml", "Vermouth rouge", "vermouth"], ["50 ml", "Bitter", "bitter"], ["50 ml", "Eau gazeuse"]],
  m: "direct", v: "highball", g: "Demi-tranche d’orange et demi-tranche de citron", c: "Long drink", t: "Before dinner", tav: 13,
  tech: ["Mirer et remplir le verre Highball de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients", "Mélanger", "Garnir d’une demi-tranche d’orange et d’une demi-tranche de citron"]
},
{
  s: "bellini", n: "Bellini", p: "Vineux, fruité et désaltérant", base: "champagne",
  h: "Cocktail inventé par Giuseppe Cipriani, propriétaire du Harry’s Bar de Venise, en 1948. Son nom est celui d’un peintre vénitien du XVe siècle, Giovanni Bellini.",
  ing: [["40 ml", "Nectar / purée de pêche blanche"], ["80 ml", "Champagne", "champagne"]],
  m: "direct", v: "flute", g: "Aucune", c: "Long drink", t: "All day cocktail", tav: 8,
  tech: ["Mirer et remplir la Flûte de glace", "Rafraîchir le verre avec la cuillère de bar", "Retirer la glace du verre", "Verser les ingrédients", "Mélanger"],
  vars: [["Rossini", "Nectar ou purée de fraise."], ["Fellini", "Nectar ou purée de framboise."], ["Mimosa", "Jus d’orange frais."]]
},
{
  s: "bloody-mary", n: "Bloody Mary", p: "Savoureux, gourmand et acidulé", base: "vodka",
  h: "On trouve des mentions de jus de tomate mélangé avec des spiritueux dès la fin des années 1920. La première recette du Bloody Mary apparaît dans la presse américaine en 1939.",
  ing: [["", "Sel au céleri"], ["2 gouttes", "Tabasco"], ["1 trait", "Sauce anglaise"], ["10 ml", "Jus de citron"], ["40 ml", "Vodka", "vodka"], ["70 ml", "Jus de tomate"]],
  m: "direct", v: "highball", g: "Demi-tranche de citron et branche de céleri (facultatif)", c: "Long drink", t: "Before dinner", tav: 13,
  tech: ["Mirer et remplir le verre Highball de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Assaisonner de sel au céleri, de quelques gouttes de Tabasco et d’un trait de sauce anglaise", "Verser les ingrédients, puis mélanger", "Garnir d’une demi-tranche de citron et d’une branche de céleri (facultatif)", "Ajouter un agitateur"],
  vars: [["Bull Shot", "Du consommé de bœuf remplace le jus de tomate."], ["Bloody Maria", "La tequila remplace la vodka."], ["Virgin Mary", "Sans vodka."], ["Red Snapper", "Le gin remplace la vodka."]],
  nb: "Ajuster l’assaisonnement au goût du client."
},
{
  s: "champagne-cocktail", n: "Champagne Cocktail", p: "Vineux, complexe et boisé", base: "champagne",
  h: "C’est le premier cocktail au champagne ! Il est mentionné dès 1855, mais la recette est publiée pour la première fois dans le livre « How to Mix Drinks » de Jerry Thomas, en 1862.",
  ing: [["1 morceau", "Sucre blanc"], ["1 trait", "Aromatic bitters"], ["10 ml", "Cognac", "cognac"], ["110 ml", "Champagne", "champagne"]],
  m: "direct", v: "flute", g: "Zeste de citron exprimé", c: "Long drink", t: "All day cocktail", tav: 8,
  tech: ["Mirer et remplir la Flûte de glace", "Rafraîchir le verre avec la cuillère de bar", "Retirer la glace du verre", "Déposer le sucre imbibé d’aromatic bitters dans le verre", "Verser les ingrédients", "Garnir d’un zeste de citron exprimé"]
},
{
  s: "dark-and-stormy", n: "Dark and Stormy", p: "Acidulé, boisé et épicé", base: "rhum",
  h: "La famille Gosling a déposé la marque de cette boisson nationale des Bermudes aux États-Unis en 1991, afin de garantir l’utilisation de son rhum « Black Seal ». Un marin l’aurait baptisée en comparant la boisson à un nuage si sombre que seul un fou ou un homme déjà mort prendrait la mer par ce temps.",
  ing: [["15 ml", "Jus de citron vert"], ["100 ml", "Ginger beer"], ["40 ml", "Black rum", "rhum"]],
  m: "direct", v: "highball", g: "Quartier de citron vert", c: "Long drink", t: "All day cocktail", tav: 11,
  tech: ["Mirer et remplir le verre Highball de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients à l’exception du black rum", "Mélanger", "Ajouter le black rum (sans mélanger)", "Garnir d’un quartier de citron vert", "Ajouter un agitateur"]
},
{
  s: "fizz", n: "Fizz", p: "Frais, désaltérant et acidulé", base: "gin",
  h: "La recette du Gin Fizz est publiée pour la première fois dans le « Bar-tender’s Guide » de Jerry Thomas en 1876. C’est l’un des plus anciens cocktails.",
  ing: [["10 ml", "Sirop de sucre"], ["20 ml", "Jus de citron"], ["40 ml", "Eau-de-vie (gin)", "gin"], ["50 ml", "Eau gazeuse"]],
  m: "shaker", v: "highball", g: "Tranche de citron", c: "Long drink", t: "All day cocktail", tav: 13,
  tech: ["Mirer et remplir le verre Highball de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker à l’exception de l’eau gazeuse", "Égoutter le verre et compléter de glace si besoin", "Égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rempli de glace", "Compléter d’eau gazeuse fraîche", "Mélanger", "Garnir d’une tranche de citron"],
  vars: [["Tom Collins", "Il se prépare directement au verre, dans un verre Highball sur glace."]],
  nb: "Toutes les eaux-de-vie peuvent être utilisées pour réaliser un Fizz. À l’origine servi sans glace, il est de nos jours servi sur glace."
},
{
  s: "french-75", n: "French 75", p: "Puissant, frais et acidulé", base: "gin",
  h: "Une recette « 75 » fut inventée à Paris au début de la Première Guerre mondiale, initialement au calvados. Elle prend le nom de French 75 grâce à Harry MacElhone, du Harry’s Bar à Paris, qui remplace le calvados par du champagne. Elle est publiée aux États-Unis en 1927 dans « Here’s How » de Judge Jr.",
  ing: [["10 ml", "Sirop de sucre"], ["20 ml", "Jus de citron"], ["40 ml", "Gin", "gin"], ["50 ml", "Champagne", "champagne"]],
  m: "shaker", v: "flute", g: "Zeste de citron exprimé", c: "Long drink", t: "All day cocktail", tav: 16,
  tech: ["Mirer et remplir la Flûte de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker à l’exception du champagne", "Retirer la glace du verre et égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rafraîchi", "Compléter de champagne frais", "Mélanger", "Garnir d’un zeste de citron exprimé"]
},
{
  s: "horses-neck", n: "Horse’s Neck", p: "Puissant, complexe et désaltérant", base: "cognac",
  h: "La recette originale, publiée en 1890, comportait simplement du ginger ale, de l’aromatic bitters et un zeste de citron. Quelques années plus tard, on commence à y ajouter un « coup de fouet » avec du cognac ou du whiskey américain.",
  ing: [["3 traits", "Aromatic bitters"], ["40 ml", "Cognac", "cognac"], ["100 ml", "Ginger ale"]],
  m: "direct", v: "highball", g: "Long zeste de citron exprimé", c: "Long drink", t: "All day cocktail", tav: 11,
  tech: ["Mirer et remplir le verre Highball de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients", "Mélanger", "Garnir d’un long zeste de citron exprimé"],
  nb: "Un grand zeste de citron déposé sur le bord du verre est caractéristique de ce cocktail : il forme, avec un peu d’imagination, la tête et le cou d’un cheval."
},
{
  s: "mai-tai", n: "Mai Tai", p: "Puissant, acidulé et gourmand", base: "rhum",
  h: "Créé par Victor Bergeron, dit « Trader Vic », qui contribua à promouvoir la culture Tiki. La recette fait surface en 1953 à Hawaï, où elle devient la signature de l’île.",
  ing: [["25 ml", "Jus de citron vert"], ["15 ml", "Sirop d’orgeat"], ["15 ml", "Curaçao orange", "liqueurs"], ["25 ml", "Rhum vieux agricole", "rhum"], ["25 ml", "Rhum vieux jamaïcain", "rhum"]],
  m: "shaker", v: "old-fashioned", g: "Demi-tranche de citron vert et tête de menthe fraîche", c: "Long drink", t: "All day cocktail", tav: 30,
  tech: ["Mirer et remplir le verre Old Fashioned de glace pilée", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Égoutter le verre et compléter de glace pilée si besoin", "Égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rempli de glace pilée", "Garnir d’une demi-tranche de citron vert et d’une tête de menthe fraîche", "Ajouter une paille courte"]
},
{
  s: "mojito", n: "Mojito", p: "Frais, acidulé et désaltérant", base: "rhum",
  h: "Cocktail emblématique de Cuba, publié pour la première fois dans le « Libro de Cocktail » de Juan Lasa, en 1929. Mojito signifie « petit jus » en espagnol.",
  ing: [["10 feuilles", "Menthe"], ["1 bar spoon", "Sucre en poudre"], ["20 ml", "Jus de citron vert"], ["50 ml", "Ron cubain", "rhum"], ["50 ml", "Eau gazeuse"]],
  m: "direct", v: "highball", g: "Tranche de citron vert et tête de menthe fraîche", c: "Long drink", t: "All day cocktail", tav: 13,
  tech: ["Mirer et remplir le verre Highball de glace", "Rafraîchir le verre avec la cuillère de bar", "Retirer la glace", "Piler légèrement les feuilles de menthe et le sucre en poudre", "Verser le jus de citron vert", "Mélanger pour diluer le sucre", "Remplir le verre de glace", "Verser le ron et l’eau gazeuse fraîche", "Mélanger", "Garnir d’une tranche de citron vert et d’une tête de menthe fraîche", "Ajouter une paille"]
},
{
  s: "moscow-mule", n: "Moscow Mule", p: "Frais, acidulé et épicé", base: "vodka",
  h: "Créé par le propriétaire de la marque Smirnoff aux États-Unis en 1941, afin de promouvoir la vodka en cocktails.",
  ing: [["15 ml", "Jus de citron vert"], ["40 ml", "Vodka", "vodka"], ["100 ml", "Ginger beer"]],
  m: "direct", v: "mule", g: "Tranche de citron vert", c: "Long drink", t: "All day cocktail", tav: 13,
  tech: ["Mirer et remplir la timbale Mule de glace", "Rafraîchir la timbale avec la cuillère de bar", "Égoutter la timbale et compléter de glace si besoin", "Verser les ingrédients", "Mélanger", "Garnir d’une tranche de citron vert"],
  vars: [["French Mule", "Avec du cognac."], ["Mexican Mule", "Avec de la tequila."], ["Chilcano de Pisco", "Avec du pisco, et l’amargo chuncho remplace l’aromatic bitters."], ["Gin-Gin Mule", "Avec du gin et de la menthe fraîche."]],
  nb: "Deux traits d’aromatic bitters peuvent être proposés lors de la prise de commande."
},
{
  s: "paloma", n: "Paloma", p: "Fruité, acidulé et désaltérant", base: "tequila",
  h: "Recette apparue dans les années 1990 dans la région de Guadalajara au Mexique. Paloma signifie « colombe » en espagnol.",
  ing: [["50 ml", "Jus de pamplemousse"], ["10 ml", "Sirop d’agave"], ["10 ml", "Jus de citron vert"], ["40 ml", "Tequila blanco 100 % agave", "tequila"], ["50 ml", "Eau gazeuse"]],
  m: "direct", v: "highball", g: "Givrage au sel fin et demi-tranche de pamplemousse", c: "Long drink", t: "All day cocktail", tav: 10,
  tech: ["Mirer et givrer le verre Highball au sel fin", "Remplir le verre de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients", "Mélanger", "Garnir d’une demi-tranche de pamplemousse"],
  nb: "Le jus de pamplemousse et l’eau gazeuse peuvent être remplacés par un soda au pamplemousse (recette d’origine)."
},
{
  s: "pina-colada", n: "Piña Colada", p: "Exotique, fruité et gourmand", base: "rhum",
  h: "Cette création est attribuée à Ramon Marrero Perez, surnommé « Monchito », à l’hôtel Hilton de San Juan en 1954, suite à l’invention de la crème de noix de coco sur l’île de Porto Rico.",
  ing: [["20 ml", "Crème de noix de coco"], ["60 ml", "Jus d’ananas"], ["40 ml", "Rhum blanc", "rhum"]],
  m: "shaker", v: "highball", g: "Quartier d’ananas et cerise à l’eau-de-vie", c: "Long drink", t: "All day cocktail", tav: 13,
  tech: ["Mirer et remplir le verre Highball de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Égoutter le verre et compléter de glace si besoin", "Égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rempli de glace", "Garnir d’un quartier d’ananas et d’une cerise à l’eau-de-vie"],
  vars: [["Chichi", "La vodka remplace le rhum."], ["Blue Hawaiian", "On ajoute 15 ml de curaçao bleu."], ["Apple Colada", "Le jus de pomme trouble remplace le jus d’ananas."]]
},
{
  s: "planters-punch", n: "Planter’s Punch", p: "Exotique, fruité et complexe", base: "rhum",
  h: "Le punch est la plus ancienne des boissons du bar : la première recette est publiée en Inde en 1638. Des centaines de recettes de punch seront inventées au fil des siècles suivants, à travers l’Empire britannique.",
  ing: [["2 traits", "Aromatic bitters"], ["40 ml", "Jus d’orange"], ["40 ml", "Jus d’ananas"], ["40 ml", "Rhum agricole blanc", "rhum"], ["1 trait", "Rhum agricole ambré", "rhum"]],
  m: "direct", v: "highball", g: "Quartier d’ananas et cerise à l’eau-de-vie", c: "Long drink", t: "All day cocktail", tav: 16,
  tech: ["Mirer et remplir le verre Highball de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients à l’exception du rhum agricole ambré", "Mélanger", "Ajouter un trait de rhum agricole ambré (sans mélanger)", "Garnir d’un quartier d’ananas et d’une cerise à l’eau-de-vie", "Ajouter un agitateur"]
},
{
  s: "rum-swizzle", n: "Rum Swizzle", p: "Puissant, acidulé et épicé", base: "rhum",
  h: "Le terme swizzle désigne la méthode de préparation à l’aide d’un bâton lélé (ramification naturelle à 5 branches). Une boisson avec du rhum est désignée par ce terme dès 1788.",
  ing: [["20 ml", "Sirop de sucre"], ["30 ml", "Jus de citron vert"], ["20 ml", "Velvet falernum", "liqueurs"], ["50 ml", "Rhum ambré", "rhum"], ["2 traits", "Aromatic bitters"]],
  m: "direct", v: "highball", g: "Zeste d’orange exprimé et tête de menthe fraîche", c: "Long drink", t: "All day cocktail", tav: 20, outil: "Swizzle stick (ou cuillère de bar)",
  tech: ["Mirer et remplir le verre Highball de glace pilée", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace pilée si besoin", "Verser les ingrédients", "Mélanger à l’aide d’un swizzle stick (ou de la cuillère de bar)", "Garnir d’un zeste d’orange exprimé et décorer d’une tête de menthe fraîche", "Ajouter une paille"],
  nb: "Toutes les eaux-de-vie vieillies peuvent être utilisées pour réaliser un Swizzle."
},
{
  s: "sex-on-the-beach", n: "Sex on the Beach", p: "Rond, fruité et gourmand", base: "vodka",
  h: "Popularisée à partir des années 1980, cette recette fut inventée aux États-Unis.",
  ing: [["40 ml", "Jus d’orange"], ["40 ml", "Nectar de cranberry"], ["10 ml", "Liqueur de pêche", "liqueurs"], ["40 ml", "Vodka", "vodka"]],
  m: "shaker", v: "highball", g: "Demi-tranche d’orange", c: "Long drink", t: "All day cocktail", tav: 15,
  tech: ["Mirer et remplir le verre Highball de glace", "Remplir la grande timbale du shaker de glace", "Rafraîchir le verre avec la cuillère de bar", "Verser les ingrédients dans la petite timbale du shaker", "Égoutter le verre et compléter de glace si besoin", "Égoutter la grande timbale du shaker", "Frapper puis passer dans le verre rempli de glace", "Garnir d’une demi-tranche d’orange"]
},
{
  s: "spritz", n: "Spritz", p: "Fruité, vineux et désaltérant", base: "bitter",
  h: "Le Spritz se composait au départ de vin blanc et d’eau de Seltz. L’ajout d’un ingrédient amer commence en Europe de l’Est dans les années 1920, avant de devenir la boisson signature de Venise.",
  ing: [["50 ml", "Bitter ou autre spiritueux", "bitter"], ["60 ml", "Vin blanc effervescent", "champagne"], ["20 ml", "Eau gazeuse"]],
  m: "direct", v: "vin", g: "Adaptée au spiritueux utilisé", c: "Long drink", t: "Before dinner", tav: 16,
  tech: ["Mirer et remplir le verre à Vin de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients", "Mélanger", "Garnir d’une décoration adaptée à la recette"],
  nb: "Le prosecco est à privilégier. Il faut adapter la garniture au spiritueux utilisé. La marque du spiritueux choisi précède le terme Spritz pour nommer le cocktail."
},
{
  s: "tequila-sunrise", n: "Tequila Sunrise", p: "Acidulé, fruité et gourmand", base: "tequila",
  h: "Une première version du cocktail fut inventée au Mexique vers 1930. La version actuelle fut mise au point en 1972 et adoptée par les Rolling Stones durant leur tournée américaine.",
  ing: [["80 ml", "Jus d’orange"], ["40 ml", "Tequila", "tequila"], ["1 trait", "Sirop de grenadine"]],
  m: "direct", v: "highball", g: "Demi-tranche d’orange et cerise à l’eau-de-vie", c: "Long drink", t: "All day cocktail", tav: 13,
  tech: ["Mirer et remplir le verre Highball de glace", "Rafraîchir le verre avec la cuillère de bar", "Égoutter le verre et compléter de glace si besoin", "Verser les ingrédients à l’exception du sirop de grenadine", "Mélanger", "Verser un trait de grenadine (sans mélanger)", "Garnir d’une demi-tranche d’orange et d’une cerise à l’eau-de-vie", "Ajouter un agitateur"],
  nb: "Le trait de grenadine apporte un dégradé rappelant le lever de soleil."
}
];
