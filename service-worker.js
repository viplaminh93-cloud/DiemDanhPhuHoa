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

const CACHE_VERSION = "1.0.0";

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

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    // Ngoại trừ các file bạn KHÔNG muốn cache (ví dụ: data từ Google Script)
    if (event.request.url.includes('/exec')) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Lấy từ cache trước
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // Nếu fetch thành công, cập nhật cache với bản mới nhất
                if (networkResponse.ok) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            });

            // Trả về cache ngay lập tức, nếu không có mới đợi network
            return cachedResponse || fetchPromise;
        })
    );
});
