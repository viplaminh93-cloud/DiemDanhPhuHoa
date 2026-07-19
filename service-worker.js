//======================================
// SERVICE WORKER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * SERVICE WORKER
 *
 * Chức năng:
 * - Cache App Shell
 * - Offline First
 * - Version Cache
 *
 * Không chứa business.
 * ======================================
 */

const CACHE_VERSION = "1.0.1";

const CACHE_NAME = "phuhoa-" + CACHE_VERSION;


//======================================
// APP SHELL
//======================================

const APP_FILES = [

    "./manifest.json",

    "./login/login.html",
    "./login/login.css",
    "./login/login.controller.js",
    "./login/login.service.js",
    "./login/login.renderer.js",

    "./attendance/attendance.html",
    "./attendance/attendance.css",

    "./attendance/app.js",
    "./attendance/api.js",
    "./attendance/offline.js",

    "./attendance/attendance.controller.js",
    "./attendance/attendance.service.js",
    "./attendance/attendance.renderer.js",

    "./attendance/camera/camera.service.js",
    "./attendance/camera/camera.controller.js",

    "./attendance/popup/popup.renderer.js",
    "./attendance/popup/popup.service.js",

    "./report/report.controller.js",
    "./report/report.service.js",
    "./report/report.renderer.js",
    
    "./system/version.js",
    "./system/config.js",
    "./system/constants.js",
    "./system/core.js",
    "./system/model.js",
    "./system/utils.js",
    "./system/debug.js",
    "./system/renderer.js",
    "./system/auth.js",

    //----------------------------------
    // Icons
    //----------------------------------
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/apple-touch-icon.png",
    "./icons/favicon.ico"

];


//======================================
// INSTALL
//======================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(async cache => {

            for (const file of APP_FILES) {

                try {

                    const response = await fetch(file);

                    if (!response.ok) {

                        console.error("404:", file);

                        continue;

                    }

                    await cache.put(file, response.clone());

                }

                catch (e) {

                    console.error("CACHE FAIL:", file, e);

                }

            }

        })

    );

    self.skipWaiting();

});


//======================================
// ACTIVATE
//======================================

self.addEventListener(

    "activate",

    event=>{

        event.waitUntil(

            caches.keys()

                .then(keys=>{

                    return Promise.all(

                        keys.map(key=>{

                            if(

                                key !== CACHE_NAME

                            ){

                                return caches.delete(

                                    key

                                );

                            }

                        })

                    );

                })

                .then(()=>{

                    return self.clients.claim();

                })

        );

    }

);


//======================================
// FETCH
//======================================

self.addEventListener(

    "fetch",

    event=>{

        //----------------------------------
        // Chỉ cache GET
        //----------------------------------

        if(

            event.request.method !== "GET"

        ){

            return;

        }

        //----------------------------------
        // Điều hướng trang
        //----------------------------------

        if(

            event.request.mode ===

            "navigate"

        ){

            event.respondWith(

                fetch(event.request)

                .catch(()=>{

                    return caches.match(

                        "/QuanLyTNTT/login/login.html"

                    );

                })

            );

            return;

        }

        //----------------------------------
        // Offline First
        //----------------------------------

        event.respondWith(

            caches.match(

                event.request

            )

            .then(cache=>{

                if(cache){

                    return cache;

                }

                return fetch(

                    event.request

                );

            })

        );

    }

);
