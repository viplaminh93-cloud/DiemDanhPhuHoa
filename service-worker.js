//======================================
// SERVICE WORKER
//======================================

const CACHE_NAME = "phuhoa-v1";

const FILES = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./js/config.js",
    "./js/constants.js",
    "./js/model.js",
    "./js/core.js",
    "./js/renderer.js",
    "./js/debug.js",
    "./js/utils.js",
    "./js/camera.js",
    "./js/offline.js",
    "./js/attendance.js",
    "./js/api.js",
    "./js/popup.js",
    "./js/app.js"

];



//==========================
// Install
//==========================

self.addEventListener("install",event=>{

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache=>cache.addAll(FILES))

    );

    self.skipWaiting();

});



//==========================
// Activate
//==========================

self.addEventListener("activate",event=>{

    event.waitUntil(
    
        caches.keys().then(keys=>{
    
            return Promise.all(
    
                keys.map(key=>{
    
                    if(key!==CACHE_NAME){
    
                        return caches.delete(key);
    
                    }
    
                })
    
            );
    
        }).then(()=>self.clients.claim())
    
    );

});



//==========================
// Fetch
//==========================

self.addEventListener("fetch",event=>{

    if(event.request.method!=="GET"){

        return;

    }

    event.respondWith(

        caches.match(event.request)

        .then(cache=>{

            if(cache){

                return cache;

            }

            return fetch(event.request)

            .then(response=>{

                if(

                    !response ||

                    response.status!==200 ||

                    response.type!=="basic"

                ){

                    return response;

                }

                const clone=response.clone();

                caches.open(CACHE_NAME)

                .then(cache=>{

                    cache.put(

                        event.request,

                        clone

                    );

                });

                return response;

            });

        })

    );

});
