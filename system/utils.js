"use strict";

/**
 * UTILS MODULE
 * Tập hợp các hàm tiện ích dùng chung (DOM, UI, Device, Time, String, Object, Console).
 */
const Utils = (() => {

    // --- DOM ---
    const id = (name) => document.getElementById(name);
    const qs = (sel) => document.querySelector(sel);
    const qsa = (sel) => document.querySelectorAll(sel);
    const create = (tag) => document.createElement(tag);

    // --- UI ---
    const show = (el) => el?.classList.remove("hidden");
    const hide = (el) => el?.classList.add("hidden");
    const toggle = (el) => el?.classList.toggle("hidden");
    const isHidden = (el) => el ? el.classList.contains("hidden") : true;

    // --- DEVICE ---
    const vibrate = (ms = Config.CAMERA.VIBRATE) => navigator.vibrate?.(ms);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // --- TIME ---
    const now = () => new Date();
    const formatTime = (date = new Date()) => date.toLocaleTimeString("vi-VN");
    const formatDate = (date = new Date()) => date.toLocaleDateString("vi-VN");

    // --- STRING ---
    const upper = (txt) => String(txt).toUpperCase();
    const lower = (txt) => String(txt).toLowerCase();
    const trim = (txt) => String(txt).trim();

    // --- OBJECT ---
    const clone = (obj) => structuredClone(obj);

    // --- CONSOLE ---
    const log = (...args) => console.log(...args);
    const warn = (...args) => console.warn(...args);
    const error = (...args) => console.error(...args);

    return { 
        id, qs, qsa, create, 
        show, hide, toggle, isHidden, 
        vibrate, sleep, 
        now, formatTime, formatDate, 
        upper, lower, trim, 
        clone, 
        log, warn, error 
    };
})();
