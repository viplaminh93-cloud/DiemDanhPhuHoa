//======================================
// OFFLINE SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const OfflineService = (()=>{

    const STORAGE_KEY = "attendance_offline_queue";

    //----------------------------------
    // LOAD
    //----------------------------------

    function load(){

        try{

            return JSON.parse(

                localStorage.getItem(STORAGE_KEY)

                || "[]"

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

            STORAGE_KEY,

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

        if(queue.length){

            queue.shift();

            save(queue);

        }

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

    }

    //----------------------------------
    // BADGE
    //----------------------------------

    function renderQueueBadge(){

        const badge =

            Utils.id("queueBadge");

        const count =

            Utils.id("queueCount");

        if(

            !badge ||

            !count

        ){

            return;

        }

        const total = length();

        count.innerText = total;

        if(total){

            badge.classList.remove("hidden");

        }

        else{

            badge.classList.add("hidden");

        }

    }

    //----------------------------------

    window.addEventListener(

        "online",

        sync

    );

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

        sync,

        renderQueueBadge

    };

})();
