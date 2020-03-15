importScripts('/cache-polyfill.js');
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('Creativegun').then(function(cache) {
     return cache.addAll([
        // '/',
        '/PWA.html',
        '/PWA.css',
        '/titas.js',
        '/js.about.js',
        '/js/foods.js',
        '/js/foodfantasy.js',
        '/js/login',
        '/js/otherpages',
        '/js/recipies',
        '/js/reviews',
        '/js/searchlist',
        '/js/rightClickDisable',
        '/js/knowmore_topRecipies_target',
        '/js/knowmore_topRecipies.js',
        '/assets/logo.svg',
        '/js/index.js',
        '/assets/logo.png',
        '/About.html',
        '/Account.html',
        '/Contests.html',
        '/foodfantasy.html',
        '/Policies.html',
        '/Recipies.html',
        '/Reviews.html',
        '/index.html'

     ]);
   })
 );
});


self.addEventListener('fetch', function(event) {

console.log(event.request.url);

event.respondWith(

caches.match(event.request).then(function(response) {

return response || fetch(event.request);

})

);

});