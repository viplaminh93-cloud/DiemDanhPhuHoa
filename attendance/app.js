//======================================
// ATTENDANCE APP
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * ATTENDANCE APP
 *
 * Bootstrap module Attendance.
 * Không chứa Business.
 * ======================================
 */

window.addEventListener(

    "load",

    initializeAttendance

);

//======================================
// INIT
//======================================

function initializeAttendance(){

    console.log(
        "================================"
    );

    console.log(
        Config.APP.PARISH
    );
    
    console.log(
        Config.APP.NAME
    );

    console.log(

        "Version:",

        Version

    );

    console.log(
        "================================"
    );

//    renderQueueBadge();

    initializePWA();

}

//======================================
// PWA
//======================================

let installPrompt = null;

//======================================
// BEFORE INSTALL
//======================================

window.addEventListener(

    "beforeinstallprompt",

    event=>{

        event.preventDefault();

        installPrompt = event;

        Renderer.show(

            Utils.id("installBtn")

        );

        debug.log(

            MODULE.APP,

            "Install available"

        );

    }

);

//======================================
// INIT INSTALL
//======================================

function initializePWA(){

    const button =

        Utils.id("installBtn");

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        installApplication

    );

}

//======================================
// INSTALL APP
//======================================

async function installApplication(){

    if(!installPrompt){

        return;

    }

    installPrompt.prompt();

    await installPrompt.userChoice;

    installPrompt = null;

    Renderer.hide(

        Utils.id("installBtn")

    );

}

//======================================
// SERVICE WORKER
//======================================

if("serviceWorker" in navigator){

    window.addEventListener(

        "load",

        ()=>{

            navigator.serviceWorker

                .register(

                    "../service-worker.js"

                )

                .then(reg=>{

                    console.log(

                        "Service Worker OK",

                        reg

                    );

                })

                .catch(console.error);

        }

    );

}
