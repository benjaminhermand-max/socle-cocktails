// Fonctionnement hors connexion : le site est mis en cache à la première visite.
// Changer VERSION à chaque mise à jour du contenu pour rafraîchir le cache.
const VERSION = "socle-v2";
const FICHIERS = ["./", "app.js", "data/alcools.js", "data/cocktails.js", "data/savoirs.js", "img/accueil/poster.jpg", "img/bouteilles/bitter.png", "img/bouteilles/cachaca.png", "img/bouteilles/champagne.png", "img/bouteilles/cognac.png", "img/bouteilles/gin.png", "img/bouteilles/liqueurs.png", "img/bouteilles/rhum.png", "img/bouteilles/tequila.png", "img/bouteilles/vermouth-martini.png", "img/bouteilles/vermouth.png", "img/bouteilles/vodka.png", "img/bouteilles/whisky.png", "img/bouteilles/xeres.png", "img/cocktails/americano.jpg", "img/cocktails/aviation.jpg", "img/cocktails/bamboo.jpg", "img/cocktails/bellini.jpg", "img/cocktails/bloody-mary.jpg", "img/cocktails/bramble.jpg", "img/cocktails/caipirinha.jpg", "img/cocktails/champagne-cocktail.jpg", "img/cocktails/cosmopolitan.jpg", "img/cocktails/daiquiri.jpg", "img/cocktails/dark-and-stormy.jpg", "img/cocktails/dry-martini.jpg", "img/cocktails/espresso-martini.jpg", "img/cocktails/fizz.jpg", "img/cocktails/french-75.jpg", "img/cocktails/gin-basil-smash.jpg", "img/cocktails/horses-neck.jpg", "img/cocktails/mai-tai.jpg", "img/cocktails/manhattan.jpg", "img/cocktails/margarita.jpg", "img/cocktails/mint-julep.jpg", "img/cocktails/mojito.jpg", "img/cocktails/moscow-mule.jpg", "img/cocktails/negroni.jpg", "img/cocktails/old-fashioned.jpg", "img/cocktails/paloma.jpg", "img/cocktails/penicillin.jpg", "img/cocktails/pina-colada.jpg", "img/cocktails/planters-punch.jpg", "img/cocktails/pornstar-martini.jpg", "img/cocktails/rum-swizzle.jpg", "img/cocktails/sex-on-the-beach.jpg", "img/cocktails/sidecar.jpg", "img/cocktails/sour.jpg", "img/cocktails/spritz.jpg", "img/cocktails/tequila-sunrise.jpg", "img/icone/apple-touch-icon.png", "img/icone/favicon-32.png", "img/icone/icone-192.png", "img/icone/icone-512.png", "img/materiel/bec-verseur.jpg", "img/materiel/cuillere-bar.jpg", "img/materiel/doseur.jpg", "img/materiel/eplucheur.jpg", "img/materiel/passoire-cocktail.jpg", "img/materiel/passoire-fine.jpg", "img/materiel/passoire-julep.jpg", "img/materiel/pilon.jpg", "img/materiel/presse-agrumes.jpg", "img/materiel/shaker-boston.jpg", "img/materiel/shaker-continental.jpg", "img/materiel/shaker-trois-pieces.jpg", "img/materiel/verre-melange.jpg", "img/verres/absinthe.jpg", "img/verres/biere.jpg", "img/verres/copa.jpg", "img/verres/coupe.jpg", "img/verres/degustation.jpg", "img/verres/digestif.jpg", "img/verres/fantaisie.jpg", "img/verres/flute.jpg", "img/verres/highball.jpg", "img/verres/hurricane.jpg", "img/verres/julep.jpg", "img/verres/martini.jpg", "img/verres/mule.jpg", "img/verres/nick-nora.jpg", "img/verres/old-fashioned.jpg", "img/verres/punch.jpg", "img/verres/shot.jpg", "img/verres/tiki.jpg", "img/verres/toddy.jpg", "img/verres/vin.jpg", "index.html", "manifest.webmanifest", "style.css"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((cles) => Promise.all(cles.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Réseau d'abord (contenu toujours à jour), cache en secours (hors connexion).
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range")) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      if (r.ok && new URL(e.request.url).origin === location.origin) {
        const copie = r.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copie));
      }
      return r;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match("./")))
  );
});
