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
  function alcool(slug) { for (var i = 0; i < A.length; i++) if (A[i].s === slug) return A[i]; return null; }
  function cocktail(slug) { for (var i = 0; i < C.length; i++) if (C[i].s === slug) return C[i]; return null; }

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function pluriel(n, mot) { return n + " " + mot + (n > 1 ? "s" : ""); }

  var ICON_BACK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
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
    var tiles = RUBRIQUES.map(function (r, i) {
      return '<a class="tile" href="#/savoirs/' + r[0] + '"><span class="num">0' + (i + 1) + '</span>' + r[1] + '</a>';
    }).join("");
    app.innerHTML =
      '<section class="hero"><div class="wrap">' +
        '<div class="hero-text"><p class="eyebrow">Référentiel officiel · Édition 2025 · 36 cocktails</p>' +
        '<h1 class="display">Choisis ton alcool.<br><span>Découvre ses cocktails.</span></h1>' +
        '<p class="lead">Chaque alcool a sa présentation pour le comprendre, puis la liste des cocktails du Socle où il est utilisé, jusqu’à la fiche technique complète.</p>' +
        '<div class="search" role="search"><label for="q">Trouver un cocktail</label>' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F5A52" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>' +
        '<input id="q" type="search" autocomplete="off" placeholder="Mojito, gin, shaker…" aria-controls="res"><ul class="results" id="res" hidden></ul></div></div>' +
        '<div class="hero-media"><video src="img/accueil/accueil.mp4" poster="img/accueil/poster.jpg" autoplay muted loop playsinline aria-label="Aquarelle animée d’un comptoir de bar avec un Negroni, un Dry Martini, un French 75 et un Mojito"></video></div>' +
      '</div></section>' +
      '<section class="section"><div class="wrap"><div class="section-head"><h2 class="display">Les alcools du Socle</h2><span class="muted">du plus utilisé au moins utilisé</span></div>' +
        '<div class="grid-alcools">' + cards + '</div></div></section>' +
      '<section class="band" id="connaissances"><div class="wrap section"><p class="eyebrow">Avant de commencer</p><h2 class="display" style="font-size:44px;margin-bottom:24px">Les connaissances à maîtriser</h2>' +
        '<div class="grid-savoirs">' + tiles + '</div></div></section>' +
      '<section class="section"><div class="wrap"><div class="cta-dark"><div><h2 class="display">Autres apéritifs &amp; digestifs</h2>' +
        '<p>Anisés, quinquinas, gentianes, vins doux naturels, armagnac, calvados… Cette rubrique arrive bientôt.</p></div><span class="pill-gold">Bientôt</span></div></div></section>';
    initSearch();
  }

  function initSearch() {
    var q = document.getElementById("q"), res = document.getElementById("res");
    if (!q) return;
    q.addEventListener("input", function () {
      var v = norm(q.value.trim());
      if (v.length < 2) { res.hidden = true; res.innerHTML = ""; return; }
      var hits = C.filter(function (c) {
        var hay = norm(c.n + " " + c.ing.map(function (i) { return i[1]; }).join(" ") + " " + METHODES[c.m] + " " + c.c);
        return hay.indexOf(v) !== -1;
      }).slice(0, 12);
      res.innerHTML = hits.length ? hits.map(function (c) {
        return '<li><a href="#/cocktail/' + c.s + '"><img src="img/cocktails/' + c.s + '.jpg" alt=""><span><b>' + esc(c.n) + '</b><small>' + esc(c.c + " · " + METHODES[c.m]) + '</small></span></a></li>';
      }).join("") : '<li class="muted" style="padding:10px">Aucun cocktail trouvé.</li>';
      res.hidden = false;
    });
    q.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { q.value = ""; res.hidden = true; }
      if (e.key === "Enter") { var a = res.querySelector("a"); if (a) location.hash = a.getAttribute("href"); }
    });
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

  function carteCocktail(c, slug) {
    var ings = c.ing.map(function (i) {
      var hl = slug && i[2] === slug;
      return '<li' + (hl ? ' class="hl"' : "") + '><span class="dose">' + esc(i[0] || "—") + "</span>" + esc(i[1]) + "</li>";
    }).join("");
    var badge = slug ? (c.base === slug ? '<span class="chip base">Alcool de base</span>' : '<span class="chip">Aussi dans la recette</span>') : "";
    return '<a class="card-cocktail" href="#/cocktail/' + c.s + (slug ? "?de=" + slug : "") + '">' +
      '<div class="pic"><img src="img/cocktails/' + c.s + '.jpg" alt="" loading="lazy"></div>' +
      '<div class="body"><div><div class="meta"><span class="cat">' + c.c + '</span><span class="muted">TAV ' + c.tav + ' %</span></div>' +
      "<h3>" + esc(c.n) + '</h3><p class="profil">' + esc(c.p) + "</p></div>" +
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
        '<p class="intro">' + a.intro + "</p></div>" +
        '<aside class="id-card"><h2 class="display">Carte d’identité</h2><dl>' + id + "</dl></aside></div>" +
      '<div class="sections">' + a.sec.map(renderSection).join("") + "</div></div>" +
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
  }

  /* ---------- Tous les cocktails ---------- */
  function viewCocktails() {
    setNav("cocktails");
    document.title = "Les 36 cocktails — Socle des Cocktails";
    var sorted = C.slice().sort(function (x, y) { return x.n.localeCompare(y.n, "fr"); });
    app.innerHTML = '<div class="wrap section"><div class="cocktails-head"><div><p class="eyebrow">Socle des Cocktails de Référence</p><h1 class="display" style="font-size:clamp(52px,8vw,92px)">Les 36 cocktails</h1></div>' +
      '<div class="filters" role="group" aria-label="Filtrer les cocktails">' +
      ["Tous", "Short drink", "Long drink"].map(function (f, i) { return '<button type="button" data-f="' + f + '" aria-pressed="' + (i === 0) + '">' + f + "</button>"; }).join("") +
      '</div></div><div class="grid-cocktails" id="liste"></div></div>';
    var grid = document.getElementById("liste");
    function draw(f) { grid.innerHTML = sorted.filter(function (c) { return f === "Tous" || c.c === f; }).map(function (c) { return carteCocktail(c, null); }).join(""); }
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
    setNav(de ? "alcools" : "cocktails");
    document.title = c.n + " — fiche technique";
    var from = de && alcool(de) ? alcool(de) : null;
    var back = from ? '<a class="back" href="#/alcool/' + from.s + '">' + ICON_BACK + "Cocktails : " + esc(from.n) + "</a>"
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
      '<section class="fiche-hero"><div class="txt"><p class="eyebrow">' + c.c + " · " + c.t + '</p><h1 class="display">' + esc(c.n) + '</h1><p class="profil">' + esc(c.p) + '</p><p class="histo">' + esc(c.h) + "</p></div>" +
        '<div class="pic"><img src="img/cocktails/' + c.s + '.jpg" alt="Illustration du cocktail ' + esc(c.n) + '"></div></section>' +
      '<div class="fiche-grid"><section class="block recette"><h2 class="h2">Recette</h2><ul>' + recette + "</ul>" +
        '<p class="order-note">Ingrédients dans l’ordre de la recette : du moins cher au plus cher.</p></section>' +
        '<aside class="identite"><h2 class="display">Carte d’identité</h2><dl>' + identHtml + "</dl></aside></div>" +
      '<div class="sections" style="padding-top:12px"><div><h2 class="h2">' + (c.techTitre || "Technique") + '</h2><ol class="technique">' +
        c.tech.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>" +
        (c.nb ? '<p class="nb"><b>N.B. :</b> ' + esc(c.nb) + "</p>" : "") + "</div>" + vars + "</div>" +
      '<nav class="prevnext" aria-label="Cocktail précédent ou suivant">' +
        '<a href="#/cocktail/' + prev.s + q + '">' + ICON_BACK + esc(prev.n) + "</a>" +
        '<a href="#/cocktail/' + next.s + q + '">' + esc(next.n) + ICON_NEXT + "</a></nav></div>";
  }

  /* ---------- Connaissances ---------- */
  function viewSavoirs(rub) {
    var r = RUBRIQUES.filter(function (x) { return x[0] === rub; })[0] || RUBRIQUES[0];
    setNav("savoirs");
    document.title = r[1] + " — Socle des Cocktails";
    var menu = RUBRIQUES.map(function (x, i) {
      return '<li><a href="#/savoirs/' + x[0] + '"' + (x[0] === r[0] ? ' aria-current="page"' : "") + '><span class="n">0' + (i + 1) + "</span>" + x[1] + "</a></li>";
    }).join("");
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
          S.familles.map(function (f) { return "<tr><td><b>" + f[0] + "</b></td><td>" + f[1] + "</td><td>" + f[2] + "</td><td>" + f[3] + "</td><td>" + f[4] + "</td></tr>"; }).join("") + "</tbody></table></div>";
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
          '<div class="calc"><h2 class="h2">Calculer le TAV d’un cocktail</h2><div id="rows"></div><button type="button" class="add" id="add">+ Ajouter un ingrédient</button>' +
          '<div class="calc-out" aria-live="polite"><span>Volume total : <b id="vol" style="font-size:28px">0</b> ml</span><span>TAV : <b id="tav">0 %</b></span><span class="muted" id="arr"></span></div></div>';
        break;
      case "lexique":
        html = '<p class="lead">Le vocabulaire professionnel du bar, de A à Z.</p>' +
          '<label class="muted" for="lx" style="display:block;font-size:14px;font-weight:700;margin-bottom:6px">Chercher un mot</label><input class="lex-search" id="lx" type="search" placeholder="Dry shake, zeste, float…">' +
          '<dl class="lexique" id="lexl"></dl>';
        break;
    }
    app.innerHTML = '<div class="wrap"><div class="savoirs"><aside><p class="eyebrow">Connaissances</p><nav aria-label="Rubriques"><ul>' + menu + '</ul></nav></aside>' +
      '<div class="content"><h1 class="display">' + r[1] + "</h1>" + html + "</div></div></div>";
    if (r[0] === "tav") initCalc();
    if (r[0] === "lexique") initLexique();
  }

  function initCalc() {
    var rows = document.getElementById("rows");
    var data = [["Vermouth rouge", 20, 14.5], ["Bitter", 50, 25], ["Eau gazeuse", 50, 0]];
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
    else if (path[0] === "savoirs") viewSavoirs(path[1]);
    else viewIntrouvable();
    window.scrollTo(0, 0);
    var h1 = app.querySelector("h1"); if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  }
  window.addEventListener("hashchange", route);
  route();
})();
