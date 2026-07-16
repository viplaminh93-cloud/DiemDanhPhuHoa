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

const CACHE_NAME =

    "phuhoa-" +

    APP_VERSION.VERSION;


//======================================
// APP SHELL
//======================================

const APP_FILES = [

    //----------------------------------
    // Attendance
    //----------------------------------

    "/attendance/attendance.html",

    "/attendance/attendance.css",

    "/attendance/attendance.controller.js",

    "/attendance/attendance.service.js",

    "/attendance/attendance.renderer.js",

    "/attendance/api.js",

    "/attendance/app.js",

    "/attendance/offline.js",

    "/attendance/popup.service.js",

    "/attendance/popup.renderer.js",

    //----------------------------------
    // Dashboard
    //----------------------------------

    "/dashboard/dashboard.html",

    "/dashboard/dashboard.css",

    "/dashboard/dashboard.controller.js",

    "/dashboard/dashboard.service.js",

    "/dashboard/dashboard.renderer.js",

    //----------------------------------
    // Students
    //----------------------------------

    "/students/students.html",

    "/students/students.css",

    "/students/students.controller.js",

    "/students/students.service.js",

    "/students/students.renderer.js",

    //----------------------------------
    // Login
    //----------------------------------

    "/login/login.html",

    "/login/login.css",

    "/login/login.controller.js",

    "/login/login.service.js",

    "/login/login.renderer.js",

    //----------------------------------
    // System
    //----------------------------------

    "/system/version.js",

    "/system/config.js",

    "/system/constants.js",

    "/system/core.js",

    "/system/utils.js",

    "/system/debug.js",

    "/system/model.js",

    "/system/renderer.js",

    "/system/auth.js",

    //----------------------------------
    // Assets
    //----------------------------------

    "/manifest.json",

    "/icons/icon-192.png",

    "/icons/icon-512.png",

    "/icons/maskable-512.png"

];


//======================================
// INSTALL
//======================================

self.addEventListener(

    "install",

    event=>{

        event.waitUntil(

            caches

                .open(CACHE_NAME)

                .then(cache=>{

                    return cache.addAll(

                        APP_FILES

                    );

                })

        );

        self.skipWaiting();

    }

);


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

                        "/attendance/attendance.html"

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
