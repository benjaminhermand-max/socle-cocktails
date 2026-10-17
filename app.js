(function () {
  "use strict";

  var C = window.COCKTAILS, A = window.ALCOOLS, S = window.SAVOIRS;
  var app = document.getElementById("app");

  var METHODES = { shaker: "Shaker", melange: "Verre à mélange", direct: "Direct au verre" };
  var VERRES = { "nick-nora": "Nick & Nora", "old-fashioned": "Old Fashioned", coupe: "Coupe", martini: "Martini", highball: "Highball", flute: "Flûte", julep: "Julep", mule: "Mule", vin: "Vin", shot: "Shot", degustation: "Dégustation", digestif: "Digestif", absinthe: "Absinthe", toddy: "Toddy", punch: "Punch", hurricane: "Hurricane", copa: "Copa", biere: "Bière", tiki: "Tiki", fantaisie: "Fantaisie" };
  var RUBRIQUES = [
    ["pratiques", "Bonnes pratiques"], ["categories", "Catégories & types"], ["familles", "Familles de cocktails"],
    ["methodes", "Méthodes de réalisation"], ["verrerie", "Verrerie de service"], ["materiel", "Matériel du barman"],
    ["tav", "Calcul du TAV"], ["lexique", "Lexique professionnel"]
  ];

  // Familles d'alcool présentes dans chaque cocktail
  C.forEach(function (c) {
    var set = {};
    c.ing.forEach(function (i) { if (i[2]) set[i[2]] = true; });
    c.al = Object.keys(set);
  });
  function cocktailsDe(slug) {
    var list = C.filter(function (c) { return c.al.indexOf(slug) !== -1; });
    return list.filter(function (c) { return c.base === slug; }).concat(list.filter(function (c) { return c.base !== slug; }));
  }
  var AU = window.AUTRES || [];
  function autre(slug) { for (var i = 0; i < AU.length; i++) if (AU[i].s === slug) return AU[i]; return null; }
  function alcool(slug) { for (var i = 0; i < A.length; i++) if (A[i].s === slug) return A[i]; return null; }
  function cocktail(slug) { for (var i = 0; i < C.length; i++) if (C[i].s === slug) return C[i]; return null; }

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function pluriel(n, mot) { return n + " " + mot + (n > 1 ? "s" : ""); }

  /* ---------- Liens automatiques vers les fiches ---------- */
  // Noms reconnus : les 36 cocktails + quelques appellations utilisées dans les cours.
  // Les noms associés à null sont des cocktails différents (variantes) : ils ne sont pas liés.
  var NOMS = (function () {
    var m = C.map(function (c) { return [c.n, c.s]; }).filter(function (x) { return x[0] !== "Sour" && x[0] !== "Fizz"; });
    m = m.concat([["Gin Fizz", "fizz"], ["Whiskey Sour", "sour"], ["Rye Whiskey Old-Fashioned", "old-fashioned"],
      ["Negroni Sbagliato", null], ["White Negroni", null], ["Dirty Martini", null], ["Tommy’s Margarita", null], ["Manhattan Inn", null], ["Pina Colada", "pina-colada"]]);
    return m.sort(function (a, b) { return b[0].length - a[0].length; });
  })();
  var RE_NOMS = new RegExp("(?<![\\p{L}\\d])(" + NOMS.map(function (x) {
    return x[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[’']/g, "['’]");
  }).join("|") + ")(?![\\p{L}\\d])", "gu");
  function slugDuNom(txt) {
    var t = txt.replace(/'/g, "’").toLowerCase();
    for (var i = 0; i < NOMS.length; i++) if (NOMS[i][0].toLowerCase() === t) return NOMS[i][1];
    return null;
  }
  function lierCocktails(root, sauf) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var el = n.parentElement;
        if (!el || el.closest("a, h1, h2, h3, button, input, label, textarea, [data-nolink]")) return NodeFilter.FILTER_REJECT;
        RE_NOMS.lastIndex = 0;
        return RE_NOMS.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var txt = n.nodeValue, frag = document.createDocumentFragment(), last = 0, m, lie = false;
      RE_NOMS.lastIndex = 0;
      while ((m = RE_NOMS.exec(txt))) {
        var slug = slugDuNom(m[1]);
        if (!slug || slug === sauf) continue;
        frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        var a = document.createElement("a");
        a.className = "ck"; a.href = "#/cocktail/" + slug; a.textContent = m[1];
        frag.appendChild(a); last = m.index + m[1].length; lie = true;
      }
      if (!lie) return;
      frag.appendChild(document.createTextNode(txt.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  }

  /* Liens automatiques vers les fiches d'alcools (pages alcool, hors Socle et connaissances).
     Seule la première mention de chaque fiche est liée, pour ne pas surcharger le texte. */
  var TERMES = [
    ["Pineau des Charentes|Floc de Gascogne|Macvin du Jura|vins? de liqueur|V\\.D\\.L\\.?", "#/autre/vins-de-liqueur"],
    ["vins? doux naturels?|V\\.D\\.N\\.?|Banyuls|Muscat de Frontignan|Muscat de Beaumes-de-Venise", "#/autre/vins-doux-naturels"],
    ["quinquinas?|Dubonnet|St-Raphaël", "#/autre/quinquinas"],
    ["gentianes?|Suze", "#/autre/gentianes"],
    ["anisés?|pastis|Ricard", "#/autre/anises"],
    ["armagnac", "#/autre/armagnac"],
    ["calvados", "#/autre/calvados"],
    ["cognac", "#/alcool/cognac"],
    ["xérès|sherry", "#/alcool/xeres"],
    ["vermouths?", "#/alcool/vermouth"],
    ["cachaça", "#/alcool/cachaca"]
  ];
  var RE_TERMES = new RegExp("(?<![\\p{L}\\d])(" + TERMES.map(function (t) { return "(" + t[0] + ")"; }).join("|") + ")(?![\\p{L}\\d])", "giu");
  function lierTermes(root, ici) {
    if (!root) return;
    var deja = {}; deja[ici] = true;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var el = n.parentElement;
        if (!el || el.closest("a, h1, h2, h3, dt, th, button, input, label, textarea, [data-nolink], .tableau")) return NodeFilter.FILTER_REJECT;
        RE_TERMES.lastIndex = 0;
        return RE_TERMES.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var txt = n.nodeValue, frag = document.createDocumentFragment(), last = 0, m, lie = false;
      RE_TERMES.lastIndex = 0;
      while ((m = RE_TERMES.exec(txt))) {
        var k = 0; for (var i = 0; i < TERMES.length; i++) if (m[i + 2] !== undefined) { k = i; break; }
        var href = TERMES[k][1];
        if (deja[href]) continue;
        deja[href] = true;
        frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        var a = document.createElement("a");
        a.className = "ck"; a.href = href; a.textContent = m[1];
        frag.appendChild(a); last = m.index + m[1].length; lie = true;
      }
      if (!lie) return;
      frag.appendChild(document.createTextNode(txt.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  }

  /* « Voir aussi » : fiches proches */
  var VOIR = {
    "alcool/xeres": ["autre/vins-de-liqueur", "autre/vins-doux-naturels"],
    "alcool/cognac": ["autre/armagnac", "autre/calvados", "autre/vins-de-liqueur"],
    "alcool/vermouth": ["autre/quinquinas", "autre/vins-de-liqueur"],
    "alcool/bitter": ["autre/gentianes", "autre/quinquinas", "autre/anises"],
    "alcool/rhum": ["alcool/cachaca"],
    "alcool/cachaca": ["alcool/rhum"],
    "alcool/whisky": ["alcool/cognac", "autre/armagnac"],
    "alcool/liqueurs": ["autre/anises"],
    "autre/quinquinas": ["alcool/vermouth", "alcool/bitter", "autre/gentianes"],
    "autre/vins-de-liqueur": ["alcool/xeres", "autre/vins-doux-naturels", "alcool/cognac", "autre/armagnac"],
    "autre/vins-doux-naturels": ["autre/vins-de-liqueur", "alcool/xeres"],
    "autre/anises": ["autre/gentianes", "alcool/bitter"],
    "autre/gentianes": ["alcool/bitter", "autre/quinquinas", "autre/anises"],
    "autre/armagnac": ["alcool/cognac", "autre/calvados", "autre/vins-de-liqueur"],
    "autre/calvados": ["alcool/cognac", "autre/armagnac"]
  };
  function voirAussi(cle) {
    var l = VOIR[cle];
    if (!l) return "";
    return '<section class="voir-aussi"><h2 class="h2">Voir aussi</h2><div class="voir-grid">' + l.map(function (k) {
      var p = k.split("/"), x = p[0] === "alcool" ? alcool(p[1]) : autre(p[1]);
      if (!x) return "";
      return '<a href="#/' + k + '"><img src="img/bouteilles/' + x.img + '" alt="" loading="lazy"><span><b>' + esc(x.n) + "</b><small>" + esc(x.famille) + "</small></span></a>";
    }).join("") + "</div></section>";
  }

  var ICON_BACK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var ICON_ECRAN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8"/></svg>';
  var ICON_NEXT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';

  function setNav(section) {
    document.querySelectorAll(".nav a").forEach(function (a) {
      if (a.dataset.section === section) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  /* ---------- Accueil ---------- */
  function viewAccueil() {
    setNav("alcools");
    document.title = "Socle des Cocktails — Lycée Ambroise Croizat";
    var cards = A.map(function (a, i) {
      var n = cocktailsDe(a.s).length;
      var rang = a.s === "liqueurs" ? "+" : (i < 9 ? "0" : "") + (i + 1);
      return '<a class="card-alcool" href="#/alcool/' + a.s + '">' +
        '<div class="pic"><span class="rank" aria-hidden="true">' + rang + '</span><span class="count">' + pluriel(n, "cocktail") + '</span>' +
        '<img src="img/bouteilles/' + a.img + '" alt="" loading="lazy"></div>' +
        '<div class="txt"><b>' + esc(a.n) + '</b><small>' + esc(a.famille) + '</small></div></a>';
    }).join("");
    app.innerHTML =
      '<section class="hero"><div class="wrap">' +
        '<div class="hero-text"><p class="eyebrow">Référentiel officiel · Édition 2025 · 36 cocktails</p>' +
        '<h1 class="display">L’art du cocktail.<br><span>De l’alcool à la fiche technique.</span></h1>' +
        '<p class="lead">Comprendre chaque spiritueux, connaître ses grands classiques et les réaliser dans les règles : le Socle des cocktails de référence, version élève.</p>' +
        '</div>' +
        '<div class="hero-media"><video src="img/accueil/accueil.mp4" poster="img/accueil/poster.jpg" autoplay muted loop playsinline aria-label="Aquarelle animée d’un comptoir de bar avec un Negroni, un Dry Martini, un French 75 et un Mojito"></video></div>' +
      '</div></section>' +
      '<section class="section"><div class="wrap"><div class="section-head"><h2 class="display">Les alcools du Socle</h2><span class="muted">du plus utilisé au moins utilisé</span></div>' +
        '<div class="grid-alcools">' + cards + '</div></div></section>' +
      '<section class="section"><div class="wrap"><a class="cta-dark cta-autres" href="#/autres"><div><p class="eyebrow">Hors Socle</p><h2 class="display">Autres apéritifs &amp; digestifs</h2>' +
        '<p>Quinquinas, vins de liqueur, vins doux naturels, anisés, gentianes, armagnac, calvados : ' + AU.length + ' fiches pour compléter le Socle.</p>' +
        '<div class="cta-bouteilles" aria-hidden="true">' + AU.map(function (x) { return '<img src="img/bouteilles/' + x.img + '" alt="" loading="lazy">'; }).join("") + '</div></div>' +
        '<span class="pill-gold">Découvrir' + ICON_NEXT + '</span></a></div></section>';
  }

  function scoreNom(n, v) {
    n = norm(n);
    if (n === v) return 0;
    if (n.indexOf(v) === 0) return 1;
    if (n.split(/[\s’'-]/).some(function (w) { return w.indexOf(v) === 0; })) return 2;
    if (n.indexOf(v) !== -1) return 3;
    return -1;
  }
  /* Recherche sur tout le site : cocktails, alcools, autres apéritifs & digestifs, connaissances, lexique. */
  function chercher(v) {
    var brut = v.trim();
    v = norm(brut.replace(/'/g, "’"));
    if (v.length < 1) return [];
    var res = [];
    function ajoute(score, rang, item) { if (score >= 0) res.push([score, rang, item]); }
    C.forEach(function (c) {
      var score = scoreNom(c.n, v), info = c.c + " · " + METHODES[c.m] + " · Verre " + VERRES[c.v];
      if (score < 0 && v.length >= 3) {
        var ing = c.ing.filter(function (x) { return norm(x[1]).indexOf(v) !== -1; })[0];
        if (ing) { score = 4; info = "Contient : " + ing[0] + " " + ing[1].toLowerCase(); }
        else if (norm(METHODES[c.m] + " " + (c.m === "melange" ? "melange stir" : c.m === "shaker" ? "frapper" : "direct au verre build") + " verre " + VERRES[c.v] + " " + c.c + " " + c.t + " " + c.g).indexOf(v) !== -1) { score = 5; info = METHODES[c.m] + " · Verre " + VERRES[c.v] + " · " + c.c; }
      }
      ajoute(score, 1, { n: c.n, href: "#/cocktail/" + c.s, img: "img/cocktails/" + c.s + ".jpg", info: info, type: "cocktail" });
    });
    function alcools(liste, route, etiquette) {
      liste.forEach(function (a) {
        var score = Math.min.apply(null, [a.n, a.titre].map(function (x) { var k = scoreNom(x, v); return k < 0 ? 99 : k; }));
        var info = etiquette + " · " + a.famille;
        if (score === 99) {
          score = -1;
          if (v.length >= 3) {
            var m = a.id.filter(function (r) { return /^Marque|Exemples/.test(r[0]) && norm(r[1].replace(/<[^>]+>/g, "")).indexOf(v) !== -1; })[0];
            if (m) { score = 2; info = etiquette + " · " + m[0] + " : " + m[1].replace(/<[^>]+>/g, ""); }
            else if (norm((a.intro + " " + a.id.map(function (r) { return r[1]; }).join(" ")).replace(/<[^>]+>/g, "")).indexOf(v) !== -1) score = 6;
          }
        }
        ajoute(score, 0, { n: a.titre, href: route + a.s, img: "img/bouteilles/" + a.img, info: info, type: "alcool" });
      });
    }
    alcools(A, "#/alcool/", "Alcool du Socle");
    alcools(AU, "#/autre/", "Hors Socle");
    RUBRIQUES.forEach(function (r) { ajoute(scoreNom(r[1], v), 2, { n: r[1], href: "#/savoirs/" + r[0], info: "Connaissances", type: "savoir" }); });
    if (v.length >= 2) S.lexique.forEach(function (l) {
      var k = scoreNom(l[0], v);
      ajoute(k < 0 ? -1 : k + 1, 3, { n: l[0], href: "#/savoirs/lexique", info: "Lexique : " + l[1], type: "lexique" });
    });
    return res.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1] || a[2].n.localeCompare(b[2].n, "fr"); }).map(function (x) { return x[2]; }).slice(0, 40);
  }

  function initSearch() {
    var f = document.getElementById("fq"), q = document.getElementById("q"), res = document.getElementById("res"), hint = document.getElementById("qh");
    if (!q) return;
    var hits = [], cur = -1;
    var petit = window.matchMedia("(max-width: 420px)");
    function majTexte() { q.placeholder = petit.matches ? "Cocktails, ingrédients…" : "Rechercher : cocktails, ingrédients…"; }
    majTexte();
    if (petit.addEventListener) petit.addEventListener("change", majTexte);
    function close() { res.hidden = true; q.setAttribute("aria-expanded", "false"); cur = -1; }
    function show() {
      hits = chercher(q.value);
      hint.textContent = "";
      if (!q.value.trim()) { res.innerHTML = ""; close(); return; }
      res.innerHTML = hits.length ? hits.map(function (h, i) {
        var vis = h.img ? '<img src="' + h.img + '" alt="" class="r-' + h.type + '">' : '<span class="r-ico" aria-hidden="true">' + (h.type === "lexique" ? "Aa" : "§") + "</span>";
        return '<li role="option" id="opt' + i + '"><a href="' + h.href + '">' + vis + "<span><b>" + esc(h.n) + "</b><small>" + esc(h.info) + "</small></span></a></li>";
      }).join("") : '<li class="muted" style="padding:10px 12px">Aucun résultat. Vérifie l’orthographe.</li>';
      if (hits.length > 1) res.insertAdjacentHTML("afterbegin", '<li class="res-count" aria-hidden="true">' + hits.length + ' résultats</li>');
      res.hidden = false; q.setAttribute("aria-expanded", "true"); cur = -1;
    }
    function mark() {
      res.querySelectorAll("a").forEach(function (a, i) { a.classList.toggle("on", i === cur); });
      if (cur >= 0) q.setAttribute("aria-activedescendant", "opt" + cur); else q.removeAttribute("aria-activedescendant");
    }
    q.addEventListener("input", show);
    q.addEventListener("focus", function () { if (q.value.trim()) show(); });
    q.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" && hits.length) { e.preventDefault(); cur = Math.min(cur + 1, hits.length - 1); mark(); }
      else if (e.key === "ArrowUp" && hits.length) { e.preventDefault(); cur = Math.max(cur - 1, 0); mark(); }
      else if (e.key === "Escape") { q.value = ""; close(); }
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var list = chercher(q.value);
      var c = cur >= 0 ? hits[cur] : list[0];
      if (c) location.hash = c.href;
      else hint.textContent = q.value.trim() ? "Aucun résultat pour « " + q.value.trim() + " »." : "Tape un cocktail, un alcool ou un ingrédient.";
    });
    document.addEventListener("click", function (e) { if (!f.contains(e.target)) close(); });
    window.fermerRecherche = function () { q.value = ""; hint.textContent = ""; res.innerHTML = ""; close(); q.blur(); };
  }

  /* ---------- Page alcool ---------- */
  function renderSection(sec) {
    var body = "";
    if (sec.steps) body = '<ol class="steps">' + sec.steps.map(function (x) { return "<li><span>" + x + "</span></li>"; }).join("") + "</ol>";
    else if (sec.list) body = '<ul class="dots">' + sec.list.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
    else if (sec.table) body = '<div class="table-scroll"><table><thead><tr>' + sec.table[0].map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr></thead><tbody>" +
      sec.table.slice(1).map(function (r) { return "<tr>" + r.map(function (c, i) { return i === 0 ? "<td><b>" + c + "</b></td>" : "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
    else if (sec.text) body = "<p>" + sec.text + "</p>";
    return '<section class="block"><h3>' + sec.t + "</h3>" + body + "</section>";
  }

  function embleme(slug, cls) {
    var e = (window.EMBLEMES || {})[slug];
    if (!e) return "";
    return '<span class="embleme ' + (cls || "") + '" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + e + "</svg></span>";
  }

  /* ---------- Favoris (mémorisés sur l'appareil) ---------- */
  var CLE_FAV = "socle-favoris-v1";
  function lireFav() { try { var l = JSON.parse(localStorage.getItem(CLE_FAV) || "[]"); return Array.isArray(l) ? l : []; } catch (e) { return []; } }
  function estFav(s) { return lireFav().indexOf(s) !== -1; }
  function basculerFav(s) {
    var l = lireFav(), i = l.indexOf(s);
    if (i === -1) l.push(s); else l.splice(i, 1);
    try { localStorage.setItem(CLE_FAV, JSON.stringify(l)); } catch (e) {}
    return i === -1;
  }
  var ICON_ETOILE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.5-4.2 6.1-.8z"/></svg>';
  function marqueFav(c) { return estFav(c.s) ? '<span class="fav-marque" title="Dans mes favoris">' + ICON_ETOILE + '<span class="sr-only">Favori</span></span>' : ""; }
  function filtresCocktails() {
    var n = lireFav().length;
    return '<div class="filters" role="group" aria-label="Filtrer les cocktails">' +
      ["Tous", "Short drink", "Long drink"].map(function (f, i) { return '<button type="button" data-f="' + f + '" aria-pressed="' + (i === 0) + '">' + f + "</button>"; }).join("") +
      '<button type="button" data-f="Favoris" aria-pressed="false" class="f-fav">' + ICON_ETOILE + "Favoris" + (n ? " (" + n + ")" : "") + "</button></div>";
  }
  function filtreOk(c, f) { return f === "Tous" || (f === "Favoris" ? estFav(c.s) : c.c === f); }
  var VIDE_FAV = '<p class="muted vide-fav">Aucun favori pour l’instant. Ouvre une fiche et touche l’étoile « Ajouter aux favoris » pour la retrouver ici.</p>';

  function carteCocktail(c, slug) {
    var ings = c.ing.map(function (i) {
      var hl = slug && i[2] === slug;
      return '<li' + (hl ? ' class="hl"' : "") + '><span class="dose">' + esc(i[0] || "—") + "</span>" + esc(i[1]) + "</li>";
    }).join("");
    var badge = slug ? (c.base === slug ? '<span class="chip base">Alcool de base</span>' : '<span class="chip">Aussi dans la recette</span>') : "";
    return '<a class="card-cocktail" href="#/cocktail/' + c.s + (slug ? "?de=" + slug : "") + '">' +
      '<div class="pic"><img src="img/cocktails/' + c.s + '.jpg" alt="" loading="lazy"></div>' +
      '<div class="body"><div><div class="meta"><span class="cat">' + c.c + '</span><span class="muted">TAV ' + c.tav + ' %</span></div>' +
      "<h3>" + esc(c.n) + marqueFav(c) + '</h3><p class="profil">' + esc(c.p) + "</p></div>" +
      '<ul class="ings">' + ings + "</ul>" +
      '<div class="chips">' + badge + '<span class="chip">' + METHODES[c.m] + '</span><span class="chip">Verre ' + VERRES[c.v] + "</span></div></div></a>";
  }

  function viewAlcool(slug) {
    var a = alcool(slug);
    if (!a) return viewIntrouvable();
    setNav("alcools");
    document.title = a.titre + " — Socle des Cocktails";
    var list = cocktailsDe(slug);
    var id = a.id.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("");
    app.innerHTML =
      '<div class="wrap"><a class="back" href="#/">' + ICON_BACK + "Tous les alcools</a>" +
      '<div class="alc-hero"><div class="alc-main"><p class="eyebrow">' + esc(a.famille) + "</p>" +
        '<div class="alc-title"><h1 class="display">' + esc(a.titre) + '</h1><img src="img/bouteilles/' + a.img + '" alt="Bouteille : ' + esc(a.n) + '"></div>' +
        '<p class="intro">' + a.intro + "</p>" +
        '<button type="button" class="btn-tableau" id="btnTableau">' + ICON_ECRAN + "Afficher en plein écran</button></div>" +
        '<aside class="id-card"><h2 class="display">Carte d’identité</h2><dl>' + id + "</dl></aside></div>" +
      '<div class="sections">' + a.sec.map(renderSection).join("") + "</div>" + voirAussi("alcool/" + a.s) + "</div>" +
      '<section class="band"><div class="wrap section">' +
        '<div class="cocktails-head"><div><p class="eyebrow">Dans le Socle</p><h2 class="display">' + pluriel(list.length, "cocktail") + "</h2></div>" +
        '<div class="filters" role="group" aria-label="Filtrer les cocktails">' +
          ["Tous", "Short drink", "Long drink"].map(function (f, i) { return '<button type="button" data-f="' + f + '" aria-pressed="' + (i === 0) + '">' + f + "</button>"; }).join("") +
        '</div></div><div class="grid-cocktails" id="liste"></div></div></section>';
    var grid = document.getElementById("liste");
    function draw(f) {
      grid.innerHTML = list.filter(function (c) { return f === "Tous" || c.c === f; }).map(function (c) { return carteCocktail(c, slug); }).join("") ||
        '<p class="muted">Aucun cocktail dans cette catégorie.</p>';
    }
    draw("Tous");
    app.querySelectorAll(".filters button").forEach(function (b) {
      b.addEventListener("click", function () {
        app.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        draw(b.dataset.f);
      });
    });
    document.getElementById("btnTableau").addEventListener("click", function () {
      ouvrirTableau({ liste: A, courant: a, rendu: contenuTableauAlcool, classe: "tb-alcool", aide: "← → changer d’alcool",
        hash: function (x) { return "#/alcool/" + x.s; } });
    });
  }

  /* ---------- Autres apéritifs & digestifs ---------- */
  function viewAutres() {
    setNav("alcools");
    document.title = "Autres apéritifs & digestifs — Socle des Cocktails";
    function bloc(g, titre, texte) {
      return '<section class="autres-groupe"><h2 class="display">' + titre + '</h2><p class="muted">' + texte + '</p><div class="autres-grid">' +
        AU.filter(function (x) { return x.groupe === g; }).map(function (x) {
          return '<a class="carte-autre" href="#/autre/' + x.s + '"><img src="img/bouteilles/' + x.img + '" alt="" loading="lazy"><span><b>' + esc(x.n) + "</b><small>" + esc(x.famille) + "</small></span></a>";
        }).join("") + "</div></section>";
    }
    app.innerHTML = '<div class="wrap section"><p class="eyebrow">Hors Socle</p><h1 class="display" style="font-size:clamp(52px,8vw,92px)">Autres apéritifs & digestifs</h1>' +
      '<p class="lead-autres">Les autres familles vues en culture professionnelle, en complément des alcools du Socle.</p>' +
      bloc("aperitif", "Les apéritifs", "Servis avant le repas : apéritifs à base de vin (A.B.V.) et à base d’alcool (A.B.A.).") +
      bloc("digestif", "Les digestifs", "Servis en fin de repas : les eaux-de-vie.") +
      '<p style="margin-top:28px"><button type="button" class="btn-tableau" id="btnTableau">' + ICON_ECRAN + "Présenter les " + AU.length + " fiches en plein écran</button></p></div>";
    document.getElementById("btnTableau").addEventListener("click", function () {
      ouvrirTableau({ liste: AU, courant: AU[0], rendu: contenuTableauAlcool, classe: "tb-alcool", aide: "← → changer d’alcool",
        hash: function (x) { return "#/autre/" + x.s; } });
    });
  }
  function viewAutre(slug) {
    var a = autre(slug);
    if (!a) return viewIntrouvable();
    setNav("alcools");
    document.title = a.titre + " — Socle des Cocktails";
    var id = a.id.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("");
    app.innerHTML =
      '<div class="wrap"><a class="back" href="#/autres">' + ICON_BACK + "Autres apéritifs & digestifs</a>" +
      '<div class="alc-hero"><div class="alc-main"><p class="eyebrow">' + esc(a.famille) + "</p>" +
        '<div class="alc-title"><h1 class="display">' + esc(a.titre) + '</h1><img src="img/bouteilles/' + a.img + '" alt="Bouteille : ' + esc(a.n) + '"></div>' +
        '<p class="intro">' + a.intro + "</p>" +
        '<button type="button" class="btn-tableau" id="btnTableau">' + ICON_ECRAN + "Afficher en plein écran</button></div>" +
        '<aside class="id-card"><h2 class="display">Carte d’identité</h2><dl>' + id + "</dl></aside></div>" +
      '<div class="sections">' + a.sec.map(renderSection).join("") + "</div>" + voirAussi("autre/" + a.s) + "</div>";
    document.getElementById("btnTableau").addEventListener("click", function () {
      ouvrirTableau({ liste: AU, courant: a, rendu: contenuTableauAlcool, classe: "tb-alcool", aide: "← → changer d’alcool",
        hash: function (x) { return "#/autre/" + x.s; } });
    });
  }

  /* ---------- Tous les cocktails ---------- */
  function viewCocktails() {
    setNav("cocktails");
    document.title = "Les 36 cocktails — Socle des Cocktails";
    var sorted = C.slice().sort(function (x, y) { return x.n.localeCompare(y.n, "fr"); });
    app.innerHTML = '<div class="wrap section"><div class="cocktails-head"><div><p class="eyebrow">Socle des Cocktails de Référence</p><h1 class="display" style="font-size:clamp(52px,8vw,92px)">Les 36 cocktails</h1>' + basculeVue("liste") + '</div>' +
      filtresCocktails() + '</div><div class="grid-cocktails" id="liste"></div>' +
      '<p class="entr-lien"><a class="btn-outil" href="#/outils/entrainement">S’entraîner sur les cocktails' + ICON_NEXT + "</a></p></div>";
    var grid = document.getElementById("liste");
    function draw(f) { grid.innerHTML = sorted.filter(function (c) { return filtreOk(c, f); }).map(function (c) { return carteCocktail(c, null); }).join("") || VIDE_FAV; }
    draw("Tous");
    app.querySelectorAll(".filters button").forEach(function (b) {
      b.addEventListener("click", function () {
        app.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        draw(b.dataset.f);
      });
    });
  }

  /* ---------- Galerie ---------- */
  function basculeVue(actif) {
    return '<nav class="vue" aria-label="Affichage">' +
      '<a href="#/cocktails"' + (actif === "liste" ? ' aria-current="page"' : "") + '>Liste</a>' +
      '<a href="#/galerie"' + (actif === "galerie" ? ' aria-current="page"' : "") + '>Galerie</a></nav>';
  }
  function viewGalerie() {
    setNav("cocktails");
    document.title = "Galerie des cocktails — Socle des Cocktails";
    var sorted = C.slice().sort(function (x, y) { return x.n.localeCompare(y.n, "fr"); });
    app.innerHTML = '<div class="wrap section"><div class="cocktails-head"><div><p class="eyebrow">Socle des Cocktails de Référence</p>' +
      '<h1 class="display" style="font-size:clamp(52px,8vw,92px)">La galerie</h1>' + basculeVue("galerie") + '</div>' +
      filtresCocktails() + '</div><ul class="galerie" id="liste" data-nolink></ul></div>';
    var grid = document.getElementById("liste");
    function draw(f) {
      grid.innerHTML = sorted.filter(function (c) { return filtreOk(c, f); }).map(function (c) {
        return '<li><a href="#/cocktail/' + c.s + '?de=galerie">' + marqueFav(c) + '<img src="img/cocktails/' + c.s + '.jpg" alt="" loading="lazy"><span>' + esc(c.n) + "</span></a></li>";
      }).join("") || '<li class="vide-li">' + VIDE_FAV + "</li>";
    }
    draw("Tous");
    app.querySelectorAll(".filters button").forEach(function (b) {
      b.addEventListener("click", function () {
        app.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        draw(b.dataset.f);
      });
    });
  }

  /* ---------- Fiche technique ---------- */
  function viewCocktail(slug, de) {
    var c = cocktail(slug);
    if (!c) return viewIntrouvable();
    setNav(de && de !== "galerie" ? "alcools" : "cocktails");
    document.title = c.n + " — fiche technique";
    var from = de && alcool(de) ? alcool(de) : null;
    var back = de === "galerie" ? '<a class="back" href="#/galerie">' + ICON_BACK + "La galerie</a>"
             : from ? '<a class="back" href="#/alcool/' + from.s + '">' + ICON_BACK + "Cocktails : " + esc(from.n) + "</a>"
                    : '<a class="back" href="#/cocktails">' + ICON_BACK + "Tous les cocktails</a>";
    var recette = c.ing.map(function (i) {
      var a = i[2] ? alcool(i[2]) : null;
      return '<li><span class="dose">' + esc(i[0] || "—") + '</span><span class="nom">' + esc(i[1]) + "</span>" +
        (a ? '<a class="lien" href="#/alcool/' + a.s + '">Voir : ' + esc(a.n) + "</a>" : "") + "</li>";
    }).join("");
    var ident = [["Méthode", METHODES[c.m] + (c.outil ? " — " + c.outil : "")], ["Catégorie", c.c], ["Type", c.t], ["TAV", c.tav + " %"], ["Garniture", c.g]];
    var identHtml = '<a class="verre" href="#/savoirs/verrerie"><img src="img/verres/' + c.v + '.jpg" alt=""><span><small>Verre</small><b>' + VERRES[c.v] + "</b></span></a>" +
      ident.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
    var vars = c.vars ? '<div><h2 class="h2">' + (c.vars.length > 1 ? "Variantes" : "Variante") + '</h2><div class="var-list">' +
      c.vars.map(function (v) { return "<div><b>" + esc(v[0]) + "</b><span>" + esc(v[1]) + "</span></div>"; }).join("") + "</div></div>" : "";
    var liste = from ? cocktailsDe(from.s) : C.slice().sort(function (x, y) { return x.n.localeCompare(y.n, "fr"); });
    var idx = liste.indexOf(c);
    var prev = liste[(idx - 1 + liste.length) % liste.length], next = liste[(idx + 1) % liste.length];
    var q = from ? "?de=" + from.s : "";
    app.innerHTML =
      '<div class="wrap">' + back +
      '<section class="fiche-hero"><div class="txt"><p class="eyebrow">' + c.c + " · " + c.t + '</p><h1 class="display titre-embleme">' + embleme(c.s, "e-fiche") + "<span>" + esc(c.n) + '</span></h1><p class="profil">' + esc(c.p) + '</p><p class="histo">' + esc(c.h) + "</p>" +
        '<div class="fiche-actions"><button type="button" class="btn-fav" id="btnFav" aria-pressed="' + estFav(c.s) + '">' + ICON_ETOILE + '<span>' + (estFav(c.s) ? "Dans mes favoris" : "Ajouter aux favoris") + "</span></button>" +
        '<button type="button" class="btn-tableau" id="btnTableau">' + ICON_ECRAN + "Afficher en plein écran</button></div></div>" +
        '<div class="pic"><img src="img/cocktails/' + c.s + '.jpg" alt="Illustration du cocktail ' + esc(c.n) + '"></div></section>' +
      '<div class="fiche-grid"><section class="block recette"><h2 class="h2">Recette</h2><ul>' + recette + "</ul>" +
        '<p class="order-note">Ingrédients dans l’ordre de la recette : du moins cher au plus cher.</p></section>' +
        '<aside class="identite"><h2 class="display">Carte d’identité</h2><dl>' + identHtml + "</dl></aside></div>" +
      '<div class="sections" style="padding-top:12px"><div><h2 class="h2">' + (c.techTitre || "Technique") + '</h2><ol class="technique">' +
        c.tech.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>" +
        (c.nb ? '<p class="nb"><b>N.B. :</b> ' + esc(c.nb) + "</p>" : "") + "</div>" + vars + "</div>" +
      blocCout(c) +
      '<nav class="prevnext" aria-label="Cocktail précédent ou suivant">' +
        '<a href="#/cocktail/' + prev.s + q + '">' + ICON_BACK + esc(prev.n) + "</a>" +
        '<a href="#/cocktail/' + next.s + q + '">' + esc(next.n) + ICON_NEXT + "</a></nav></div>";
    initCout(c);
    var bf = document.getElementById("btnFav");
    bf.addEventListener("click", function () {
      var on = basculerFav(c.s);
      bf.setAttribute("aria-pressed", String(on));
      bf.querySelector("span").textContent = on ? "Dans mes favoris" : "Ajouter aux favoris";
    });
    document.getElementById("btnTableau").addEventListener("click", function () {
      ouvrirTableau({ liste: liste, courant: c, rendu: contenuTableau, hash: function (x) { return "#/cocktail/" + x.s + q; } });
    });
  }

  /* ---------- Outils ---------- */
  function choixCocktail(id, libre) {
    return '<label class="outil-choix" for="' + id + '">Partir d’un cocktail du Socle<select id="' + id + '"><option value="">' + libre + "</option>" +
      C.slice().sort(function (x, y) { return x.n.localeCompare(y.n, "fr"); }).map(function (c) { return '<option value="' + c.s + '">' + esc(c.n) + "</option>"; }).join("") + "</select></label>";
  }
  function basculeOutils(t) {
    return '<nav class="vue vue-outils" aria-label="Outils"><a href="#/outils/entrainement"' + (t === "entrainement" ? ' aria-current="page"' : "") + '>Entraînement</a>' +
      '<a href="#/outils/tav"' + (t === "tav" ? ' aria-current="page"' : "") + '>Calcul du TAV</a>' +
      '<a href="#/outils/prix"' + (t === "prix" ? ' aria-current="page"' : "") + ">Prix de vente</a></nav>";
  }
  function viewOutils(t) {
    if (t === "entrainement") return viewEntrainement();
    t = t === "prix" ? "prix" : "tav";
    setNav("outils");
    document.title = (t === "tav" ? "Calcul du TAV" : "Prix de vente") + " — Outils — Socle des Cocktails";
    var bascule = basculeOutils(t);
    var corps = t === "tav"
      ? '<p class="lead-autres">Le titre alcoométrique volumique (TAV) indique le pourcentage d’alcool pur dans le cocktail.</p>' +
        '<div class="formula"><span class="big">TAV = Σ (volume × degré) ÷ volume total</span></div>' +
        choixCocktail("outck", "Exemple : Americano") +
        '<div class="calc"><div id="rows"></div><button type="button" class="add" id="add">+ Ajouter un ingrédient</button>' +
        '<div class="calc-out" aria-live="polite"><span>Volume total : <b id="vol" style="font-size:28px">0</b> ml</span><span>TAV : <b id="tav">0 %</b></span><span class="muted" id="arr"></span></div></div>' +
        '<p class="muted outil-note" id="outnote"></p>'
      : '<p class="lead-autres">Calcule le coût matière d’un cocktail, puis son prix de vente HT et TTC avec un coefficient multiplicateur.</p>' +
        choixCocktail("outck", "Recette libre") + '<div id="outprix"></div>';
    app.innerHTML = '<div class="wrap section"><p class="eyebrow">Outils</p><h1 class="display" style="font-size:clamp(52px,8vw,92px)">' +
      (t === "tav" ? "Calcul du TAV" : "Prix de vente") + "</h1>" + bascule + '<div class="outil">' + corps + "</div></div>";
    var sel = document.getElementById("outck");
    if (t === "tav") {
      initCalc();
      sel.addEventListener("change", function () {
        var c = cocktail(sel.value);
        var d = c ? c.ing.filter(function (i) { return doseMl(i[0]) !== null; }).map(function (i) { return [i[1], doseMl(i[0]), 0]; }) : null;
        initCalcRemplace(d);
        document.getElementById("outnote").textContent = c ? "Les volumes du " + c.n + " sont repris de la recette (les ingrédients sans dose en ml ne comptent pas). Complète le degré de chaque ingrédient." : "";
      });
    } else {
      function rendre() {
        var c = cocktail(sel.value), box = document.getElementById("outprix");
        if (c) { box.innerHTML = blocCout(c); var d = document.getElementById("cout"); d.open = true; d.classList.add("cout-outil"); initCout(c); }
        else { box.innerHTML = blocCoutLibre(); initCoutLibre(); }
      }
      sel.addEventListener("change", rendre);
      rendre();
    }
  }
  function initCalcRemplace(d) {
    var old = document.getElementById("rows"), neu = old.cloneNode(false);
    old.parentNode.replaceChild(neu, old);
    var add = document.getElementById("add"), add2 = add.cloneNode(true);
    add.parentNode.replaceChild(add2, add);
    initCalc(d || undefined);
  }
  function blocCoutLibre() {
    return '<div class="cout cout-outil"><div class="cout-corps" style="padding-top:20px"><p class="muted cout-aide">Ajoute les ingrédients de ta recette. Les prix déjà saisis pour un produit du même nom sont repris automatiquement.</p>' +
      '<div id="lrows"></div><button type="button" class="add" id="ladd">+ Ajouter un ingrédient</button>' +
      '<div class="cout-ligne"><div class="cout-nom"><b>Garniture et autres</b><small>Coût estimé</small></div><label>Coût estimé (€)<input type="number" min="0" step="0.01" inputmode="decimal" id="lgarn" placeholder="ex. 0,15"></label><output class="cout-val" id="lgv">—</output></div>' +
      '<div class="cout-total"><div><span>Coût matière HT</span><b id="ctot">—</b></div>' +
      '<label class="coef">Coefficient multiplicateur<input type="number" min="1" step="0.1" inputmode="decimal" id="ccoef" value="4"></label>' +
      '<div><span>Prix de vente HT</span><b id="cht">—</b></div><div><span>TVA 20 %</span><b id="ctva">—</b></div>' +
      '<div class="ttc"><span>Prix de vente TTC</span><b id="cttc">—</b></div></div>' +
      '<p class="muted cout-formule">Coût d’une dose = dose (ml) ÷ contenance (ml) × prix de la bouteille · Prix de vente HT = coût matière × coefficient · Prix TTC = prix HT × 1,20</p></div></div>';
  }
  function initCoutLibre() {
    var prix = lirePrix(), rows = document.getElementById("lrows"), coef = document.getElementById("ccoef");
    if (prix.coef) coef.value = prix.coef;
    var data = [["", 40, "", 70]];
    function num(x) { var n = parseFloat(String(x).replace(",", ".")); return isNaN(n) ? null : n; }
    function draw() {
      rows.innerHTML = data.map(function (d, i) {
        return '<div class="cout-ligne cout-libre"><label>Ingrédient<input data-i="' + i + '" data-k="0" value="' + esc(d[0]) + '" placeholder="ex. Gin"></label>' +
          '<label>Dose (ml)<input type="number" min="0" step="1" inputmode="decimal" data-i="' + i + '" data-k="1" value="' + d[1] + '"></label>' +
          '<label>Prix bouteille HT (€)<input type="number" min="0" step="0.01" inputmode="decimal" data-i="' + i + '" data-k="2" value="' + d[2] + '" placeholder="ex. 18"></label>' +
          '<label>Contenance (cl)<input type="number" min="1" step="1" inputmode="decimal" data-i="' + i + '" data-k="3" value="' + d[3] + '"></label>' +
          '<output class="cout-val" id="lv' + i + '">—</output><button type="button" class="rm" data-rm="' + i + '" aria-label="Retirer cet ingrédient">×</button></div>';
      }).join("");
      calc();
    }
    function calc() {
      var tot = 0;
      data.forEach(function (d, i) {
        var dose = num(d[1]), p = num(d[2]), cl = num(d[3]), out = document.getElementById("lv" + i);
        if (dose !== null && p !== null && cl) { var v = dose / (cl * 10) * p; tot += v; out.textContent = euros(v); } else out.textContent = "—";
      });
      var g = num(document.getElementById("lgarn").value) || 0; tot += g;
      document.getElementById("lgv").textContent = euros(g);
      var ht = tot * (num(coef.value) || 0);
      document.getElementById("ctot").textContent = euros(tot);
      document.getElementById("cht").textContent = euros(ht);
      document.getElementById("ctva").textContent = euros(ht * 0.2);
      document.getElementById("cttc").textContent = euros(ht * 1.2);
    }
    rows.addEventListener("input", function (e) {
      var t = e.target; if (t.dataset.i === undefined) return;
      var d = data[+t.dataset.i]; d[+t.dataset.k] = t.value;
      var cle = norm(d[0]);
      if (+t.dataset.k === 0 && cle) {
        // nom reconnu : on reprend le prix et la contenance mémorisés
        if (prix[cle + "|prix"] && !d[2]) { d[2] = prix[cle + "|prix"]; rows.querySelector('[data-i="' + t.dataset.i + '"][data-k="2"]').value = d[2]; }
        if (prix[cle + "|cl"]) { d[3] = prix[cle + "|cl"]; rows.querySelector('[data-i="' + t.dataset.i + '"][data-k="3"]').value = d[3]; }
      }
      if (cle && (+t.dataset.k === 2 || +t.dataset.k === 3)) { prix[cle + "|" + (+t.dataset.k === 2 ? "prix" : "cl")] = t.value; ecrirePrix(prix); }
      calc();
    });
    rows.addEventListener("click", function (e) { var b = e.target.closest("[data-rm]"); if (!b) return; data.splice(+b.dataset.rm, 1); draw(); });
    document.getElementById("ladd").addEventListener("click", function () { data.push(["", 0, "", 70]); draw(); });
    document.getElementById("lgarn").addEventListener("input", calc);
    coef.addEventListener("input", function () { prix.coef = coef.value; ecrirePrix(prix); calc(); });
    draw();
  }

  /* ---------- Entraînement ---------- */
  var MODES_ENTR = [
    { id: "image", titre: "Reconnaître", texte: "Une aquarelle, quatre noms : retrouve le cocktail." },
    { id: "fiche", titre: "Fiche technique", texte: "Verre, méthode, garniture, alcool de base, catégorie, type." },
    { id: "doses", titre: "Les doses", texte: "Retrouve la bonne dose d’un ingrédient dans la recette." },
    { id: "mix", titre: "Tout mélangé", texte: "Un peu de tout, pour réviser avant l’évaluation." }
  ];
  var CLE_SCORE = "socle-entrainement-v1";
  function lireScores() { try { return JSON.parse(localStorage.getItem(CLE_SCORE) || "{}") || {}; } catch (e) { return {}; } }
  function melanger(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function choix4(bonne, pool) {
    var autres = melanger(pool.filter(function (x, i) { return x && norm(x) !== norm(bonne) && pool.indexOf(x) === i; })).slice(0, 3);
    return melanger([bonne].concat(autres));
  }
  function questionPour(c, mode) {
    if (mode === "mix") mode = ["image", "fiche", "fiche", "doses"][Math.floor(Math.random() * 4)];
    if (mode === "image") {
      return { c: c, type: "image", q: "Quel est ce cocktail ?", bonne: c.n, choix: choix4(c.n, C.map(function (x) { return x.n; })),
        expl: c.c + " · " + METHODES[c.m] + " · Verre " + VERRES[c.v] };
    }
    if (mode === "doses") {
      var ings = c.ing.filter(function (i) { return doseMl(i[0]) !== null; });
      if (ings.length) {
        var ing = ings[Math.floor(Math.random() * ings.length)], ml = doseMl(ing[0]);
        var pool = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100].filter(function (x) { return x !== ml && Math.abs(x - ml) <= Math.max(25, ml); });
        return { c: c, type: "doses", q: "Quelle dose de " + ing[1].toLowerCase() + " dans le " + c.n + " ?", bonne: ml + " ml",
          choix: choix4(ml + " ml", melanger(pool).map(function (x) { return x + " ml"; })),
          expl: "Recette : " + c.ing.map(function (i) { return (i[0] ? i[0] + " " : "") + i[1].toLowerCase(); }).join(", ") + "." };
      }
    }
    var types = [
      ["Dans quel verre sert-on le " + c.n + " ?", "Verre " + VERRES[c.v], C.map(function (x) { return "Verre " + VERRES[x.v]; }).concat(Object.keys(VERRES).map(function (k) { return "Verre " + VERRES[k]; }))],
      ["Quelle est la méthode de réalisation du " + c.n + " ?", METHODES[c.m], Object.keys(METHODES).map(function (k) { return METHODES[k]; }).concat(["Blender"])],
      ["Quelle est la garniture du " + c.n + " ?", c.g, C.map(function (x) { return x.g; })],
      ["Quel est l’alcool de base du " + c.n + " ?", alcool(c.base) ? alcool(c.base).n : "", A.map(function (x) { return x.n; })],
      ["Le " + c.n + " est-il un short drink ou un long drink ?", c.c, ["Short drink", "Long drink"]],
      ["À quel moment sert-on le " + c.n + " ?", c.t, ["All day cocktail", "Before dinner", "After dinner"]]
    ].filter(function (x) { return x[1]; });
    var k = types[Math.floor(Math.random() * types.length)];
    var ch = k[2].length <= 3 ? k[2].filter(function (x, i) { return k[2].indexOf(x) === i; }) : choix4(k[1], k[2]);
    return { c: c, type: "fiche", q: k[0], bonne: k[1], choix: ch, expl: c.c + " · " + c.t + " · " + METHODES[c.m] + " · Verre " + VERRES[c.v] + " · Garniture : " + c.g.toLowerCase() };
  }
  function viewEntrainement() {
    setNav("outils");
    document.title = "Entraînement — Outils — Socle des Cocktails";
    var reglage = { mode: "image", scope: "Tous", nb: 10 };
    var serie = [], pos = 0, score = 0, erreurs = [], repondu = false;
    app.innerHTML = '<div class="wrap section"><p class="eyebrow">Outils</p><h1 class="display" style="font-size:clamp(52px,8vw,92px)">Entraînement</h1>' +
      basculeOutils("entrainement") + '<div class="entr" id="entr" aria-live="polite"></div></div>';
    var zone = document.getElementById("entr");
    function cocktailsChoisis() { return C.filter(function (c) { return filtreOk(c, reglage.scope); }); }
    function accueil() {
      var sc = lireScores(), nf = lireFav().length;
      zone.innerHTML = '<p class="lead-autres">Choisis un mode, puis teste-toi sur les 36 cocktails du Socle ou seulement sur tes favoris.</p>' +
        '<div class="entr-modes" role="radiogroup" aria-label="Mode">' + MODES_ENTR.map(function (m) {
          var b = sc[m.id];
          return '<button type="button" role="radio" class="entr-mode" data-m="' + m.id + '" aria-checked="' + (m.id === reglage.mode) + '"><b>' + m.titre + "</b><span>" + m.texte + "</span>" +
            (b ? '<small>Meilleur score : ' + b.s + " / " + b.n + "</small>" : "") + "</button>";
        }).join("") + "</div>" +
        '<div class="entr-reglages"><div class="filters" role="group" aria-label="Cocktails">' +
          ["Tous", "Short drink", "Long drink", "Favoris"].map(function (f) {
            return '<button type="button" data-scope="' + f + '" aria-pressed="' + (f === reglage.scope) + '"' + (f === "Favoris" && !nf ? " disabled" : "") + ">" + (f === "Favoris" ? "Mes favoris (" + nf + ")" : f) + "</button>";
          }).join("") + '</div><div class="filters" role="group" aria-label="Nombre de questions">' +
          [10, 20].map(function (n) { return '<button type="button" data-nb="' + n + '" aria-pressed="' + (n === reglage.nb) + '">' + n + " questions</button>"; }).join("") +
        '</div></div><p><button type="button" class="btn-go" id="go">Commencer</button></p>';
      zone.querySelectorAll("[data-m]").forEach(function (b) { b.addEventListener("click", function () { reglage.mode = b.dataset.m; accueil(); }); });
      zone.querySelectorAll("[data-scope]").forEach(function (b) { b.addEventListener("click", function () { reglage.scope = b.dataset.scope; accueil(); }); });
      zone.querySelectorAll("[data-nb]").forEach(function (b) { b.addEventListener("click", function () { reglage.nb = +b.dataset.nb; accueil(); }); });
      document.getElementById("go").addEventListener("click", function () { lancer(); });
    }
    function lancer(liste) {
      var pool = liste || cocktailsChoisis();
      if (!pool.length) pool = C;
      var tirage = [];
      while (tirage.length < (liste ? liste.length : reglage.nb)) tirage = tirage.concat(melanger(pool));
      serie = tirage.slice(0, liste ? liste.length : reglage.nb).map(function (c) { return questionPour(c, reglage.mode); });
      pos = 0; score = 0; erreurs = [];
      poser();
    }
    function poser() {
      var q = serie[pos]; repondu = false;
      zone.innerHTML = '<div class="entr-haut"><span>Question ' + (pos + 1) + " / " + serie.length + '</span><span>Score : ' + score + '</span><button type="button" class="entr-stop" id="stop">Arrêter</button></div>' +
        '<div class="entr-barre" aria-hidden="true"><span style="width:' + Math.round(pos / serie.length * 100) + '%"></span></div>' +
        '<div class="entr-q">' + (q.type === "image" ? '<img class="entr-img" src="img/cocktails/' + q.c.s + '.jpg" alt="Aquarelle du cocktail à retrouver">' :
          '<img class="entr-img petit" src="img/cocktails/' + q.c.s + '.jpg" alt="">') +
        "<h2>" + esc(q.q) + '</h2><div class="entr-choix">' + q.choix.map(function (x, i) {
          return '<button type="button" data-i="' + i + '"><span class="k">' + (i + 1) + "</span>" + esc(x) + "</button>";
        }).join("") + '</div><div id="retour"></div></div>';
      document.getElementById("stop").addEventListener("click", accueil);
      zone.querySelectorAll(".entr-choix button").forEach(function (b) { b.addEventListener("click", function () { repondre(+b.dataset.i); }); });
      var h = zone.querySelector("h2"); h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true });
    }
    function repondre(i) {
      if (repondu) return; repondu = true;
      var q = serie[pos], ok = norm(q.choix[i]) === norm(q.bonne);
      if (ok) score++; else erreurs.push(q);
      zone.querySelectorAll(".entr-choix button").forEach(function (b, k) {
        b.disabled = true;
        if (norm(q.choix[k]) === norm(q.bonne)) b.classList.add("bon");
        else if (k === i) b.classList.add("faux");
      });
      document.getElementById("retour").innerHTML = '<div class="entr-retour ' + (ok ? "ok" : "ko") + '"><b>' + (ok ? "Bonne réponse !" : "Raté : c’était « " + esc(q.bonne) + " ».") + "</b>" +
        "<p>" + esc(q.expl) + '</p><div class="entr-btns"><a href="#/cocktail/' + q.c.s + '" target="_blank" rel="noopener">Voir la fiche du ' + esc(q.c.n) + "</a>" +
        '<button type="button" class="btn-go" id="suiv">' + (pos + 1 < serie.length ? "Question suivante" : "Voir mon résultat") + "</button></div></div>";
      var sv = document.getElementById("suiv"); sv.focus();
      sv.addEventListener("click", function () { pos++; if (pos < serie.length) poser(); else resultat(); });
    }
    function resultat() {
      var n = serie.length, pct = score / n;
      var sc = lireScores(), b = sc[reglage.mode];
      if (!b || score / n > b.s / b.n) { sc[reglage.mode] = { s: score, n: n }; try { localStorage.setItem(CLE_SCORE, JSON.stringify(sc)); } catch (e) {} }
      var msg = pct === 1 ? "Parfait, rien à redire !" : pct >= .8 ? "Très bien, tu maîtrises !" : pct >= .5 ? "Pas mal : encore un peu de révision." : "Courage : revois les fiches et recommence.";
      var vus = {};
      zone.innerHTML = '<div class="entr-fin"><p class="eyebrow">Résultat</p><div class="entr-score"><b>' + score + "</b><span>/ " + n + "</span></div><p class=\"entr-msg\">" + msg + "</p>" +
        (erreurs.length ? '<h2 class="h2">À revoir</h2><ul class="entr-erreurs">' + erreurs.filter(function (q) { if (vus[q.c.s]) return false; vus[q.c.s] = 1; return true; }).map(function (q) {
          return '<li><a href="#/cocktail/' + q.c.s + '"><img src="img/cocktails/' + q.c.s + '.jpg" alt=""><span><b>' + esc(q.c.n) + "</b><small>" + esc(q.q) + " → " + esc(q.bonne) + "</small></span></a></li>";
        }).join("") + "</ul>" : "") +
        '<div class="entr-btns">' + (erreurs.length ? '<button type="button" class="btn-go" id="revoir">Rejouer mes erreurs</button>' : "") +
        '<button type="button" class="btn-go sec" id="rejouer">Nouvelle série</button><button type="button" class="btn-go sec" id="menu">Changer de mode</button></div></div>';
      var r = document.getElementById("revoir");
      if (r) r.addEventListener("click", function () { lancer(erreurs.map(function (q) { return q.c; })); });
      document.getElementById("rejouer").addEventListener("click", function () { lancer(); });
      document.getElementById("menu").addEventListener("click", accueil);
    }
    zone.addEventListener("keydown", function (e) {
      if (/^[1-4]$/.test(e.key) && !repondu) { var b = zone.querySelector('.entr-choix [data-i="' + (+e.key - 1) + '"]'); if (b) { e.preventDefault(); repondre(+e.key - 1); } }
    });
    accueil();
  }

  /* ---------- Coût matière et prix de vente ---------- */
  var CLE_PRIX = "socle-prix-v1";
  function lirePrix() { try { return JSON.parse(localStorage.getItem(CLE_PRIX) || "{}") || {}; } catch (e) { return {}; } }
  function ecrirePrix(p) { try { localStorage.setItem(CLE_PRIX, JSON.stringify(p)); } catch (e) {} }
  function euros(x) { return x.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }); }
  function doseMl(d) { var m = /^(\d+(?:[.,]\d+)?)\s*ml$/i.exec((d || "").trim()); return m ? parseFloat(m[1].replace(",", ".")) : null; }
  function contenanceDefaut(nom) {
    var n = norm(nom);
    if (/champagne|prosecco|vin /.test(n)) return 75;
    if (/eau gazeuse|soda|ginger|tonic|cola|jus|nectar|puree|lait|creme fraiche/.test(n)) return 100;
    return 70;
  }
  function blocCout(c) {
    var lignes = c.ing.map(function (i, k) {
      var ml = doseMl(i[0]);
      var champ = ml !== null
        ? '<label>Prix bouteille HT (€)<input type="number" min="0" step="0.01" inputmode="decimal" data-k="' + k + '" data-f="prix" placeholder="ex. 18"></label>' +
          '<label>Contenance (cl)<input type="number" min="1" step="1" inputmode="decimal" data-k="' + k + '" data-f="cl" value="' + contenanceDefaut(i[1]) + '"></label>'
        : '<label>Coût estimé (€)<input type="number" min="0" step="0.01" inputmode="decimal" data-k="' + k + '" data-f="fixe" placeholder="ex. 0,10"></label>';
      return '<div class="cout-ligne"><div class="cout-nom"><b>' + esc(i[1]) + "</b><small>" + esc(i[0] || "Selon la recette") + "</small></div>" + champ +
        '<output class="cout-val" id="cv' + k + '">—</output></div>';
    }).join("");
    lignes += '<div class="cout-ligne"><div class="cout-nom"><b>Garniture</b><small>' + esc(c.g) + '</small></div>' +
      '<label>Coût estimé (€)<input type="number" min="0" step="0.01" inputmode="decimal" data-k="g" data-f="fixe" placeholder="ex. 0,15"></label><output class="cout-val" id="cvg">—</output></div>';
    return '<details class="cout" id="cout"><summary><span>Coût matière et prix de vente</span><small>Calculer le prix de vente du ' + esc(c.n) + "</small></summary>" +
      '<div class="cout-corps"><p class="muted cout-aide">Saisis le prix d’achat HT des bouteilles : le coût de chaque dose est calculé selon la recette. Les prix sont mémorisés sur cet appareil et repris dans tous les cocktails qui utilisent le même produit.</p>' +
      lignes +
      '<div class="cout-total"><div><span>Coût matière HT</span><b id="ctot">—</b></div>' +
        '<label class="coef">Coefficient multiplicateur<input type="number" min="1" step="0.1" inputmode="decimal" id="ccoef" value="4"></label>' +
        '<div><span>Prix de vente HT</span><b id="cht">—</b></div><div><span>TVA 20 %</span><b id="ctva">—</b></div>' +
        '<div class="ttc"><span>Prix de vente TTC</span><b id="cttc">—</b></div></div>' +
      '<p class="muted cout-formule">Coût d’une dose = dose (ml) ÷ contenance (ml) × prix de la bouteille · Prix de vente HT = coût matière × coefficient · Prix TTC = prix HT × 1,20</p></div></details>';
  }
  function initCout(c) {
    var box = document.getElementById("cout");
    if (!box) return;
    var prix = lirePrix();
    function cle(k, f) { var nom = k === "g" ? "garniture:" + c.s : norm(c.ing[k][1]); return nom + "|" + f; }
    box.querySelectorAll("input[data-k]").forEach(function (inp) {
      var v = prix[cle(inp.dataset.k, inp.dataset.f)];
      if (v !== undefined && v !== "") inp.value = v;
    });
    var coef = document.getElementById("ccoef");
    if (prix["coef"]) coef.value = prix["coef"];
    function num(x) { var n = parseFloat(String(x).replace(",", ".")); return isNaN(n) ? null : n; }
    function calc() {
      var tot = 0, complet = true;
      c.ing.forEach(function (i, k) {
        var out = document.getElementById("cv" + k), ml = doseMl(i[0]), cout = null;
        if (ml !== null) {
          var p = num(box.querySelector('[data-k="' + k + '"][data-f="prix"]').value), cl = num(box.querySelector('[data-k="' + k + '"][data-f="cl"]').value);
          if (p !== null && cl) cout = ml / (cl * 10) * p;
        } else {
          var f = num(box.querySelector('[data-k="' + k + '"][data-f="fixe"]').value);
          cout = f === null ? 0 : f;
        }
        if (cout === null) { complet = false; out.textContent = "—"; } else { tot += cout; out.textContent = euros(cout); }
      });
      var g = num(box.querySelector('[data-k="g"]').value) || 0;
      document.getElementById("cvg").textContent = euros(g); tot += g;
      var k2 = num(coef.value) || 0, ht = tot * k2;
      document.getElementById("ctot").textContent = euros(tot) + (complet ? "" : " *");
      document.getElementById("cht").textContent = euros(ht);
      document.getElementById("ctva").textContent = euros(ht * 0.2);
      document.getElementById("cttc").textContent = euros(ht * 1.2);
      box.classList.toggle("incomplet", !complet);
    }
    box.addEventListener("input", function (e) {
      var t = e.target;
      if (t.dataset.k !== undefined) prix[cle(t.dataset.k, t.dataset.f)] = t.value;
      if (t === coef) prix["coef"] = t.value;
      ecrirePrix(prix); calc();
    });
    calc();
  }

  /* ---------- Mode tableau : la fiche en plein écran, tout visible d'un coup ---------- */
  var tableau = null;
  function contenuTableau(c) {
    var recette = c.ing.map(function (i) {
      return '<li><span class="d">' + esc(i[0] || "—") + '</span><span class="n">' + esc(i[1]) + "</span></li>";
    }).join("");
    var ident = [["Méthode", METHODES[c.m] + (c.outil ? " — " + c.outil : "")], ["TAV", c.tav + " %"], ["Catégorie", c.c], ["Type", c.t], ["Garniture", c.g]];
    var vars = c.vars ? '<h3>' + (c.vars.length > 1 ? "Variantes" : "Variante") + "</h3><ul class=\"tb-vars\">" +
      c.vars.map(function (v) { return "<li><b>" + esc(v[0]) + "</b> " + esc(v[1]) + "</li>"; }).join("") + "</ul>" : "";
    return '<div class="tb-col tb-c1">' +
        '<p class="tb-eyebrow">' + c.c + " · " + c.t + "</p>" +
        '<h2 class="tb-nom">' + embleme(c.s, "e-tb") + "<span>" + esc(c.n) + "</span></h2>" +
        '<p class="tb-profil">' + esc(c.p) + "</p>" +
        '<div class="tb-pic"><img src="img/cocktails/' + c.s + '.jpg" alt=""></div>' +
        '<p class="tb-histo">' + esc(c.h) + "</p></div>" +
      '<div class="tb-col tb-c2"><h3>Recette</h3><ul class="tb-recette">' + recette + "</ul>" +
        '<div class="tb-id"><div class="tb-verre"><img src="img/verres/' + c.v + '.jpg" alt=""><span><small>Verre</small><b>' + VERRES[c.v] + "</b></span></div><dl>" +
        ident.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl></div></div>" +
      '<div class="tb-col tb-c3"><h3>' + (c.techTitre || "Technique") + '</h3><ol class="tb-tech">' +
        c.tech.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>" +
        (c.nb ? '<p class="tb-nb"><b>N.B. :</b> ' + esc(c.nb) + "</p>" : "") + vars + "</div>";
  }
  function ajusterTableau() {
    if (!tableau) return;
    var page = tableau.querySelector(".tb-page");
    if (optsTableau.zoom) {
      // Contenu libre : on cherche le plus grand zoom qui tient sans défilement.
      var z = page.querySelector(".tb-zoom"), lo = 0.35, hi = 2.2;
      for (var k = 0; k < 14; k++) {
        var mid = (lo + hi) / 2; z.style.zoom = mid;
        if (page.scrollHeight <= page.clientHeight + 1 && page.scrollWidth <= page.clientWidth + 1) lo = mid; else hi = mid;
      }
      z.style.zoom = lo;
      return;
    }
    var u = Math.min(window.innerWidth / 92, window.innerHeight / 46);
    page.style.fontSize = u + "px";
    var cols = page.querySelectorAll(".tb-col");
    function deborde() { for (var i = 0; i < cols.length; i++) if (cols[i].scrollHeight > cols[i].clientHeight + 1) return true; return false; }
    var n = 0;
    while (deborde() && n++ < 40) { u *= 0.95; page.style.fontSize = u + "px"; }
    // Le nom ne doit jamais être coupé : on réduit sa taille s'il dépasse la colonne.
    var nom = page.querySelector(".tb-nom"), col = page.querySelector(".tb-c1"), t = 4.6;
    nom.style.fontSize = t + "em";
    while (nom.scrollWidth > col.clientWidth + 1 && t > 2) { t -= 0.1; nom.style.fontSize = t + "em"; }
  }
  var optsTableau = null;
  function afficherTableau(item) {
    tableau.querySelector(".tb-page").className = "tb-page " + (optsTableau.classe || "");
    tableau.querySelector(".tb-page").innerHTML = optsTableau.rendu(item);
    optsTableau.courant = item;
    if (optsTableau.apres) optsTableau.apres(item);
    ajusterTableau();
    Array.prototype.forEach.call(tableau.querySelectorAll("img"), function (im) { if (!im.complete) im.addEventListener("load", ajusterTableau, { once: true }); });
  }
  function fermerTableau() {
    if (!tableau) return;
    document.removeEventListener("keydown", toucheTableau);
    window.removeEventListener("resize", ajusterTableau);
    tableau.remove(); tableau = null;
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
    route();
  }
  function toucheTableau(e) {
    if (!tableau) return;
    var l = optsTableau.liste, i = l.indexOf(optsTableau.courant);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      var x = l[(i + (e.key === "ArrowRight" ? 1 : -1) + l.length) % l.length];
      history.replaceState(null, "", optsTableau.hash(x));
      afficherTableau(x);
    } else if (e.key === "Escape" && !document.fullscreenElement) fermerTableau();
  }
  function ouvrirTableau(opts) {
    optsTableau = opts;
    tableau = document.createElement("div");
    tableau.className = "tableau";
    tableau.setAttribute("role", "dialog");
    tableau.setAttribute("aria-label", "Fiche en plein écran");
    tableau.innerHTML = '<div class="tb-barre"><span>' + (opts.aide || "← → changer de cocktail") + ' · Échap pour quitter</span>' +
      '<button type="button" class="tb-fermer" aria-label="Quitter le plein écran">✕</button></div><div class="tb-page"></div>';
    document.body.appendChild(tableau);
    tableau.querySelector(".tb-fermer").addEventListener("click", fermerTableau);
    document.addEventListener("keydown", toucheTableau);
    window.addEventListener("resize", ajusterTableau);
    afficherTableau(opts.courant);
    if (tableau.requestFullscreen) tableau.requestFullscreen().then(ajusterTableau).catch(function () {});
    tableau.querySelector(".tb-fermer").focus();
  }

  /* Plein écran d'un alcool */
  function contenuTableauAlcool(a) {
    var id = a.id.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("");
    var cks = (alcool(a.s) ? cocktailsDe(a.s) : []).map(function (c) { return "<li>" + esc(c.n) + "</li>"; }).join("");
    var secs = a.sec.map(function (sec) {
      var body = "";
      if (sec.steps) body = '<ol class="tb-tech">' + sec.steps.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol>";
      else if (sec.list) body = '<ul class="tb-liste">' + sec.list.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      else if (sec.table) body = '<table class="tb-table"><thead><tr>' + sec.table[0].map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr></thead><tbody>" +
        sec.table.slice(1).map(function (r) { return "<tr>" + r.map(function (c, i) { return i === 0 ? "<td><b>" + c + "</b></td>" : "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
      else if (sec.text) body = '<p class="tb-texte">' + sec.text + "</p>";
      return '<section class="tb-sec"><h3>' + sec.t + "</h3>" + body + "</section>";
    }).join("");
    return '<div class="tb-col tb-c1">' +
        '<p class="tb-eyebrow">' + esc(a.famille) + "</p>" +
        '<h2 class="tb-nom"><span>' + esc(a.titre) + "</span></h2>" +
        (a.img ? '<div class="tb-pic tb-bouteille"><img src="img/bouteilles/' + a.img + '" alt=""></div>' : '<div class="tb-pic">' + embleme("x-" + a.s, "e-tb-grand") + "</div>") +
        '<p class="tb-intro">' + a.intro + "</p></div>" +
      '<div class="tb-col tb-c2"><div class="tb-id tb-id-alc"><h3>Carte d’identité</h3><dl>' + id + "</dl></div>" +
        (cks ? '<h3 class="tb-ck-t">' + pluriel(cocktailsDe(a.s).length, "cocktail") + ' du Socle</h3><ul class="tb-cks">' + cks + "</ul>" : "") + "</div>" +
      '<div class="tb-col tb-c3">' + secs + "</div>";
  }

  document.addEventListener("fullscreenchange", function () { if (!document.fullscreenElement && tableau) fermerTableau(); else ajusterTableau(); });

  /* ---------- Connaissances ---------- */
  function viewSavoirs(rub) {
    var r = RUBRIQUES.filter(function (x) { return x[0] === rub; })[0] || RUBRIQUES[0];
    setNav("savoirs");
    document.title = r[1] + " — Socle des Cocktails";
    var menu = RUBRIQUES.map(function (x, i) {
      return '<li><a href="#/savoirs/' + x[0] + '"' + (x[0] === r[0] ? ' aria-current="page"' : "") + '><span class="n">0' + (i + 1) + "</span>" + x[1] + "</a></li>";
    }).join("");
    var html = htmlSavoir(r);
    app.innerHTML = '<div class="wrap"><div class="savoirs"><aside><p class="eyebrow">Connaissances</p><nav aria-label="Rubriques"><ul>' + menu + '</ul></nav></aside>' +
      '<div class="content"><h1 class="display">' + r[1] + "</h1>" + html +
      '<p><button type="button" class="btn-tableau" id="btnTableau">' + ICON_ECRAN + "Afficher en plein écran</button></p></div></div></div>";
    if (r[0] === "lexique") initLexique();
    document.getElementById("btnTableau").addEventListener("click", function () {
      app.innerHTML = "";
      ouvrirTableau({ liste: RUBRIQUES, courant: r, classe: "tb-savoir", aide: "← → changer de rubrique", zoom: true,
        rendu: function (x) { return '<div class="tb-zoom"><p class="tb-eyebrow">Connaissances</p><h2 class="tb-titre">' + x[1] + "</h2>" + htmlSavoir(x) + "</div>"; },
        apres: function (x) { if (x[0] === "lexique") initLexique(); },
        hash: function (x) { return "#/savoirs/" + x[0]; } });
    });
  }

  function htmlSavoir(r) {
    var html = "";
    switch (r[0]) {
      case "pratiques":
        html = '<p class="lead">Le guide des bonnes pratiques pour créer ou revisiter un cocktail.</p><div class="rules">' +
          S.pratiques.map(function (p, i) { return '<div class="rule"><span class="n">' + (i + 1) + "</span><h3>" + p[0] + "</h3><p>" + p[1] + "</p></div>"; }).join("") + "</div>" +
          '<div class="three-s"><div><b>Sweet</b><span>Le sucré, la douceur</span></div><div><b>Sour</b><span>L’acidité, le lien</span></div><div><b>Strong</b><span>La puissance, le corps</span></div></div>';
        break;
      case "categories":
        html = '<p class="lead">Moyen mnémotechnique : la <b>catégorie</b> = la <b>contenance</b>, le <b>type</b> = le <b>temps</b>.</p>' +
          '<div class="sections" style="padding-bottom:0"><section class="block"><h3>Les catégories</h3><div class="var-list">' +
          S.categories.map(function (x) { return "<div><b>" + x[0] + "</b><span>" + x[1] + "</span></div>"; }).join("") + '</div></section>' +
          '<section class="block"><h3>Les types</h3><div class="var-list">' +
          S.types.map(function (x) { return "<div><b>" + x[0] + "</b><span>" + x[1] + "</span></div>"; }).join("") + "</div></section></div>";
        break;
      case "familles":
        html = '<p class="lead">Les familles liées au Socle. Comme il existe de nombreux autres cocktails, il existe de nombreuses autres familles.</p>' +
          '<div class="block table-scroll"><table><thead><tr><th>Famille</th><th>Catégorie</th><th>Réalisation</th><th>Composition</th><th>Le plus connu</th></tr></thead><tbody>' +
          S.familles.map(function (f) { return "<tr><td data-nolink><b>" + f[0] + "</b></td><td>" + f[1] + "</td><td>" + f[2] + "</td><td>" + f[3] + "</td><td>" + f[4] + "</td></tr>"; }).join("") + "</tbody></table></div>";
        break;
      case "methodes":
        html = '<p class="lead">Les trois méthodes de réalisation des cocktails du Socle, étape par étape.</p>' +
          S.methodes.map(function (m) {
            var t = S.techniques.filter(function (x) { return METHODES[m.s] === x[0]; })[0];
            var nb = C.filter(function (c) { return c.m === m.s; }).length;
            return '<section class="method"><h2 class="display">' + m.n + "</h2><p>" + (t ? t[1] : "") + " " + pluriel(nb, "cocktail") + ' du Socle.</p><ol class="steps">' +
              m.steps.map(function (s) { return "<li><span>" + s + "</span></li>"; }).join("") + "</ol></section>";
          }).join("");
        break;
      case "verrerie":
        var verre = function (v) {
          var used = C.filter(function (c) { return c.v === v[0]; });
          return '<div class="glass"><img src="img/verres/' + v[0] + '.jpg" alt="" loading="lazy"><b>' + v[1] + "</b><small>" +
            (used.length ? used.map(function (c) { return '<a href="#/cocktail/' + c.s + '">' + esc(c.n) + "</a>"; }).join(", ") : "Pas de cocktail du Socle") + "</small></div>";
        };
        html = '<p class="lead">Chaque cocktail a son verre. Sous chaque verre, les cocktails du Socle qui y sont servis.</p>' +
          '<h2 class="h2">Les incontournables</h2><div class="glass-grid">' + S.incontournables.map(verre).join("") + "</div>" +
          '<h2 class="h2">Les complémentaires</h2><div class="glass-grid">' + S.complementaires.map(verre).join("") + "</div>";
        break;
      case "materiel":
        html = '<p class="lead">Les outils du barman à connaître et à savoir nommer.</p><div class="glass-grid">' +
          S.materiel.map(function (m) { return '<div class="glass"><img src="img/materiel/' + m[0] + '.jpg" alt="" loading="lazy"><b>' + m[1] + "</b><small>" + m[2] + "</small></div>"; }).join("") + "</div>";
        break;
      case "tav":
        html = '<p class="lead">Le titre alcoométrique volumique (TAV) indique le pourcentage d’alcool pur dans le cocktail. Il aide à proposer une offre adaptée à une consommation responsable.</p>' +
          '<div class="formula"><span class="big">TAV = Σ (volume × degré) ÷ volume total</span><p style="margin:10px 0 0;color:#D9D3C7">Exemple de l’Americano : (20 × 14,5) + (50 × 25) + (50 × 0) = 1 540. 1 540 ÷ 120 ml = 12,83, soit un <b style="color:#fff">TAV de 13 %</b>.</p></div>' +
          '<p style="margin-top:22px"><a class="btn-outil" href="#/outils/tav">Ouvrir le calculateur de TAV' + ICON_NEXT + '</a></p>';
        break;
      case "lexique":
        html = '<p class="lead">Le vocabulaire professionnel du bar, de A à Z.</p>' +
          '<label class="muted" for="lx" style="display:block;font-size:14px;font-weight:700;margin-bottom:6px">Chercher un mot</label><input class="lex-search" id="lx" type="search" placeholder="Dry shake, zeste, float…">' +
          '<dl class="lexique" id="lexl"></dl>';
        break;
    }
    return html;
  }

  function initCalc(depart) {
    var rows = document.getElementById("rows");
    var data = depart || [["Vermouth rouge", 20, 14.5], ["Bitter", 50, 25], ["Eau gazeuse", 50, 0]];
    function draw() {
      rows.innerHTML = data.map(function (d, i) {
        return '<div class="calc-row"><div class="nm"><label for="n' + i + '">Ingrédient</label><input id="n' + i + '" data-i="' + i + '" data-k="0" value="' + esc(d[0]) + '"></div>' +
          '<div><label for="v' + i + '">Volume (ml)</label><input id="v' + i + '" data-i="' + i + '" data-k="1" type="number" min="0" step="1" inputmode="decimal" value="' + d[1] + '"></div>' +
          '<div><label for="d' + i + '">Degré (%)</label><input id="d' + i + '" data-i="' + i + '" data-k="2" type="number" min="0" max="100" step="0.5" inputmode="decimal" value="' + d[2] + '"></div>' +
          '<button type="button" class="rm" data-rm="' + i + '" aria-label="Retirer ' + esc(d[0] || "cet ingrédient") + '">×</button></div>';
      }).join("");
      calc();
    }
    function calc() {
      var vol = 0, alc = 0;
      data.forEach(function (d) { var v = parseFloat(d[1]) || 0, g = parseFloat(d[2]) || 0; vol += v; alc += v * g; });
      document.getElementById("vol").textContent = vol;
      document.getElementById("tav").textContent = vol ? (Math.round(alc / vol * 10) / 10).toString().replace(".", ",") + " %" : "0 %";
      document.getElementById("arr").textContent = vol ? "Arrondi à l’unité : " + Math.round(alc / vol) + " %" : "";
    }
    rows.addEventListener("input", function (e) {
      var t = e.target; if (!t.dataset.i) return;
      data[+t.dataset.i][+t.dataset.k] = t.value;
      calc();
    });
    rows.addEventListener("click", function (e) {
      var b = e.target.closest("[data-rm]"); if (!b) return;
      data.splice(+b.dataset.rm, 1); draw();
    });
    document.getElementById("add").addEventListener("click", function () { data.push(["", 0, 0]); draw(); });
    draw();
  }

  function initLexique() {
    var input = document.getElementById("lx"), list = document.getElementById("lexl");
    function draw() {
      var v = norm(input.value.trim());
      var items = S.lexique.filter(function (x) { return !v || norm(x[0] + " " + x[1]).indexOf(v) !== -1; });
      list.innerHTML = items.length ? items.map(function (x) { return "<div><dt>" + x[0] + "</dt><dd>" + x[1] + "</dd></div>"; }).join("") : '<div><dd>Aucun mot trouvé.</dd></div>';
      lierCocktails(list);
    }
    input.addEventListener("input", draw);
    draw();
  }

  function viewIntrouvable() {
    app.innerHTML = '<div class="wrap empty"><h1 class="display" style="font-size:64px">Page introuvable</h1><p><a href="#/">Retour à l’accueil</a></p></div>';
  }

  /* ---------- Routeur ---------- */
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("?"), path = parts[0].split("/"), params = new URLSearchParams(parts[1] || "");
    if (!path[0]) viewAccueil();
    else if (path[0] === "alcool") viewAlcool(path[1]);
    else if (path[0] === "cocktail") viewCocktail(path[1], params.get("de"));
    else if (path[0] === "cocktails") viewCocktails();
    else if (path[0] === "galerie") viewGalerie();
    else if (path[0] === "autres") viewAutres();
    else if (path[0] === "outils") viewOutils(path[1]);
    else if (path[0] === "autre") viewAutre(path[1]);
    else if (path[0] === "savoirs") viewSavoirs(path[1]);
    else viewIntrouvable();
    lierCocktails(app, path[0] === "cocktail" ? path[1] : null);
    if (path[0] === "alcool" || path[0] === "autre" || path[0] === "savoirs") lierTermes(app.querySelector(".alc-hero, .savoirs") ? app : null, "#/" + path[0] + "/" + (path[1] || ""));
    if (window.fermerRecherche) window.fermerRecherche();
    app.classList.remove("entree"); void app.offsetWidth; app.classList.add("entree");
    // Retour arrière : on revient exactement où l'on était ; nouvelle page : en haut.
    var st0 = history.state, y = st0 && st0.h === location.hash && typeof st0.y === "number" ? st0.y : 0;
    window.scrollTo({ top: y, behavior: "instant" });
    if (y) { requestAnimationFrame(function () { window.scrollTo({ top: y, behavior: "instant" }); }); setTimeout(function () { if (Math.abs(window.scrollY - y) > 4) window.scrollTo({ top: y, behavior: "instant" }); }, 250); }
    var h1 = app.querySelector("h1"); if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  }
  /* Mémorise la position de défilement de chaque page dans l'historique */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  function memoriser() {
    try { history.replaceState({ y: Math.round(window.scrollY), h: location.hash }, ""); } catch (e) {}
  }
  var memoPos = 0;
  window.addEventListener("scroll", function () {
    if (memoPos) clearTimeout(memoPos);
    var h = location.hash;
    memoPos = setTimeout(function () { memoPos = 0; if (location.hash === h) memoriser(); }, 120);
  }, { passive: true });
  // Juste avant de quitter la page par un lien : on note la position exacte.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href^='#']");
    if (a) { if (memoPos) { clearTimeout(memoPos); memoPos = 0; } memoriser(); }
  }, true);
  window.addEventListener("hashchange", route);
  initSearch();
  route();

  /* ---------- Retour en haut ---------- */
  var haut = document.getElementById("haut");
  function majHaut() { haut.classList.toggle("visible", window.scrollY > 500); }
  window.addEventListener("scroll", majHaut, { passive: true });
  haut.addEventListener("click", function () {
    var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduit ? "auto" : "smooth" });
    var h1 = app.querySelector("h1"); if (h1) h1.focus({ preventScroll: true });
  });
  majHaut();
})();
