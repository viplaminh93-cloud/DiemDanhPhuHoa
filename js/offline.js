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

    renderQueueBadge();

}



//======================================
// PEEK REQUEST
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

    renderQueueBadge();

    return item;

}

//======================================
// CLEAR QUEUE
//======================================
function clearQueue(){

    saveQueue([]);

    renderQueueBadge();

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

    debug(
        MODULE.OFFLINE,
        "Queue length = " + queueLength()
    );

    while(hasQueue()){
    
        debug(
            MODULE.OFFLINE,
            "Remaining = " + queueLength()
        );
    
        const request = peekQueue();
    
        debug(
            MODULE.OFFLINE,
            "Send: " + request.maso
        );
    
        try{
        
            const data = await resendRequest(request);
        
            if(data && data.success){
        
                debug(
                    MODULE.OFFLINE,
                    "Server OK"
                );
        
                popQueue();
        
                debug(
                    MODULE.OFFLINE,
                    "Removed from queue"
                );
        
            }
            else{
        
                debug(
                    MODULE.OFFLINE,
                    "Server rejected"
                );
        
                break;
        
            }
        
        }
        catch(err){
        
            debug(
                MODULE.OFFLINE,
                "Sync failed: " + err.message
            );
        
            break;
        
        }
    
    }

    debug(
        MODULE.OFFLINE,
        "Sync finished"
    );

}




//======================================
// ONLINE
//======================================

window.addEventListener(

    "online",

    ()=>{

        debug(

            MODULE.OFFLINE,

            "Network online"

        );

        syncQueue();

    }

);





debug(

    MODULE.OFFLINE,

    "offline.js loaded"

);
