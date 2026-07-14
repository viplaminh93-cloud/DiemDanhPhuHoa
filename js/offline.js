//======================================
// OFFLINE
//======================================

"use strict";


//======================================
// LOAD QUEUE
//======================================

function loadQueue(){

    const json = localStorage.getItem(

        CONFIG.OFFLINE.STORAGE_KEY

    );

    if(!json){

        return [];

    }

    try{

        return JSON.parse(json);

    }

    catch(err){

        console.error(err);

        return [];

    }

}



//======================================
// SAVE QUEUE
//======================================

function saveQueue(queue){

    localStorage.setItem(

        CONFIG.OFFLINE.STORAGE_KEY,

        JSON.stringify(queue)

    );

}



//======================================
// SAVE REQUEST
//======================================

function saveRequest(request){

    const queue = loadQueue();

    queue.push(request);

    saveQueue(queue);

}



//======================================
// PEEK SIZE
//======================================

function peekQueue(){

    const queue = loadQueue();

    return queue[0];

}

//======================================
// POP QUEUE
//======================================

function popQueue(){

    const queue = loadQueue();

    const item = queue.shift();

    saveQueue(queue);

    return item;

}

//======================================
// CLEAR QUEUE
//======================================
function clearQueue(){

    saveQueue([]);

}


//======================================
// QUEUE SIZE
//======================================

function queueLength(){

    return loadQueue().length;

}


//======================================
// HAS QUEUE
//======================================

function hasQueue(){

    return queueLength() > 0;

}






//======================================
// SYNC QUEUE
//======================================

async function syncQueue(){

    debug(
        MODULE.OFFLINE,
        "Sync start"
    );

    while(hasQueue()){

        debug(
            MODULE.OFFLINE,
            "Remaining = " + queueLength()
        );

        break;

    }

    debug(
        MODULE.OFFLINE,
        "Sync finished"
    );

}





debug(

    MODULE.OFFLINE,

    "offline.js loaded"

);
