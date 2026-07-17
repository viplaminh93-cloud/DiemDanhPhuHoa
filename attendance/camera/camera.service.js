"use strict";

const CameraService = (() => {
    let html5QrCode = null;

    return {
        start: async (callback) => {
            html5QrCode = new Html5Qrcode("reader");
            await html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                (decodedText) => callback(decodedText),
                (errorMessage) => { /* Bỏ qua lỗi quét liên tục */ }
            );
        },
        stop: async () => {
            if (html5QrCode) await html5QrCode.stop();
        },
        pause: async () => {
            if (html5QrCode) await html5QrCode.pause();
        },
        resume: async () => {
            if (html5QrCode) await html5QrCode.resume();
        },
        exists: () => {
            return typeof Html5Qrcode !== 'undefined';
        }
    };
})();
