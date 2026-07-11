//======================================
// UTILS
// Giáo xứ Phú Hòa
//======================================

"use strict";


//======================================
// LẤY ELEMENT THEO ID
//======================================

function id(name){

    return document.getElementById(name);

}


//======================================
// QUERY SELECTOR
//======================================

function qs(selector){

    return document.querySelector(selector);

}


//======================================
// HIỆN
//======================================

function show(element){

    element.classList.remove("hidden");

}


//======================================
// ẨN
//======================================

function hide(element){

    element.classList.add("hidden");

}


//======================================
// RUNG
//======================================

function vibrate(ms = 50){

    if(navigator.vibrate){

        navigator.vibrate(ms);

    }

}


//======================================
// LOG
//======================================

function log(){

    console.log(...arguments);

}


console.log("utils.js loaded");
