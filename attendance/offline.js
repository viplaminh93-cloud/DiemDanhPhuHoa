//======================================
// OFFLINE SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const OfflineService = (()=>{

    //----------------------------------
    // LOAD
    //----------------------------------

    function load(){

        try{

            return JSON.parse(

                localStorage.getItem(

                    Config.OFFLINE.STORAGE_KEY

                ) || "[]"

            );

        }

        catch(error){

            console.error(error);

            return [];

        }

    }

    //----------------------------------
    // SAVE
    //----------------------------------

    function save(queue){

        localStorage.setItem(

            Config.OFFLINE.STORAGE_KEY,

            JSON.stringify(queue)

        );

        renderQueueBadge();

    }

    //----------------------------------
    // PUSH
    //----------------------------------

    function push(request){

        const queue = load();

        queue.push(request);

        save(queue);

    }

    //----------------------------------
    // PEEK
    //----------------------------------

    function peek(){

        const queue = load();

        return queue.length

            ? queue[0]

            : null;

    }

    //----------------------------------
    // POP
    //----------------------------------

    function pop(){

        const queue = load();

        queue.shift();

        save(queue);

    }

    //----------------------------------
    // CLEAR
    //----------------------------------

    function clear(){

        save([]);

    }

    //----------------------------------
    // LENGTH
    //----------------------------------

    function length(){

        return load().length;

    }

    //----------------------------------
    // HAS QUEUE
    //----------------------------------

    function hasQueue(){

        return length() > 0;

    }

    //----------------------------------
    // SYNC
    //----------------------------------

    async function sync(){

        if(!navigator.onLine){

            return;

        }

        if(!hasQueue()){

            return;

        }

        debug(

            MODULE.OFFLINE,

            "Start Sync"

        );

        App.syncing = true;

        renderQueueBadge();

        while(hasQueue()){

            const request = peek();

            if(!request){

                break;

            }

            try{

                const result =

                    await AttendanceAPI.resend(

                        request

                    );

                if(result.success){

                    pop();

                }

                else{

                    break;

                }

            }

            catch(error){

                console.error(error);

                break;

            }

        }

        App.syncing = false;

        renderQueueBadge();

        debug(

            MODULE.OFFLINE,

            "Finish Sync"

        );

    }

    //----------------------------------
    // PUBLIC
    //----------------------------------

    return{

        load,

        save,

        push,

        peek,

        pop,

        clear,

        length,

        hasQueue,

        sync

    };

})();


//======================================
// ONLINE EVENT
//======================================

window.addEventListener(

    "online",

    ()=>{

        OfflineService.sync();

    }

);
