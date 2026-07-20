//======================================
// SERVICE WORKER
// Giáo xứ Phú Hòa
//======================================

"use strict";


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
                    if (!response.ok) {console.error("404:", file);
                        continue;
                    }
                    await cache.put(file, response.clone());
                } catch (e) {
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

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        }).then(() => {
            // DÒNG NÀY RẤT QUAN TRỌNG:
            return self.clients.claim(); 
        })
    );
});


//======================================
// FETCH
//======================================

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    // Ngoại trừ các request đến Google Script (vì dữ liệu cần lấy mới mỗi lần)
    if (event.request.url.includes('script.google.com') || event.request.url.includes('/exec')) {return; }
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Nếu có trong cache, trả về luôn (Stale-While-Revalidate chiến lược)
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // Kiểm tra nếu response hợp lệ
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    // CLONE trước khi put vào cache
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Có thể xử lý fallback ở đây nếu cần
            });

            return cachedResponse || fetchPromise;
        })
    );
});
