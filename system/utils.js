//======================================
// UTILS
// Giáo xứ Phú Hòa
//======================================

"use strict";


//======================================
// DOM
//======================================

function id(name){

    return document.getElementById(name);

}


function qs(selector){

    return document.querySelector(selector);

}


function qsa(selector){

    return document.querySelectorAll(selector);

}


function create(tag){

    return document.createElement(tag);

}



//======================================
// UI
//======================================

function show(element){

    if(!element){

        return;

    }

    element.classList.remove("hidden");

}


function hide(element){

    if(!element){

        return;

    }

    element.classList.add("hidden");

}


function toggle(element){

    if(!element){

        return;

    }

    element.classList.toggle("hidden");

}


function isHidden(element){

    if(!element){

        return true;

    }

    return element.classList.contains("hidden");

}



//======================================
// DEVICE
//======================================

function vibrate(

    ms = CONFIG.CAMERA.VIBRATE

){

    if(!navigator.vibrate){

        return;

    }

    navigator.vibrate(ms);

}


function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(

            resolve,

            ms

        );

    });

}



//======================================
// TIME
//======================================

function now(){

    return new Date();

}


function formatTime(date = new Date()){

    return date.toLocaleTimeString(

        "vi-VN"

    );

}


function formatDate(date = new Date()){

    return date.toLocaleDateString(

        "vi-VN"

    );

}



//======================================
// STRING
//======================================

function upper(text){

    return String(text)

        .toUpperCase();

}


function lower(text){

    return String(text)

        .toLowerCase();

}


function trim(text){

    return String(text)

        .trim();

}



//======================================
// OBJECT
//======================================

function clone(object){

    return structuredClone(object);

}



//======================================
// DEBUG
//======================================

function log(...args){

    console.log(

        ...args

    );

}


function warn(...args){

    console.warn(

        ...args

    );

}


function error(...args){

    console.error(

        ...args

    );

}


//======================================
// TOKEN
//======================================

function setToken(token){

    CONFIG.AUTH.TOKEN = token;

}

function getToken(){

    return CONFIG.AUTH.TOKEN || "";

}

function setUser(email,role){

    CONFIG.AUTH.EMAIL = email;

    CONFIG.AUTH.ROLE = role;

}
