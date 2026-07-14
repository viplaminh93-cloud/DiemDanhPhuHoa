//======================================
// RENDERER
//======================================

"use strict";


//======================================
// RENDER TEXT
//======================================

function renderText(elementId,value){

    const obj=id(elementId);

    if(!obj){

        return;

    }

    obj.innerText=value??"";

}


//======================================
// RENDER IMAGE
//======================================

function renderImage(elementId,url){

    const img=id(elementId);

    if(!img){

        return;

    }

    img.src=url||"";

}



//======================================
// SHOW ELEMENT
//======================================

function renderShow(elementId){

    show(id(elementId));

}



//======================================
// HIDE ELEMENT
//======================================

function renderHide(elementId){

    hide(id(elementId));

}







//======================================
// STUDENT
//======================================

function renderStudentName(hocSinh){

    renderText(

        "overlayName",

        layHoTen(hocSinh)

    );

}


function renderStudentClass(hocSinh){

    renderText(

        "overlayClass",

        layLop(hocSinh)

    );

}



function renderStudentKhoi(hocSinh){

    renderText(

        "overlayKhoi",

        layKhoi(hocSinh)

    );

}


function renderStudentCode(hocSinh){

    renderText(

        "overlayCode",

        layMaSo(hocSinh)

    );

}



function renderStudentPhoto(hocSinh){

    renderImage(

        "overlayPhoto",

        layAnh(hocSinh)

    );

}




//======================================
// RENDER STUDENT
//======================================

function renderStudent(data){

    renderStudentName(data);

    renderStudentKhoi(data);

    renderStudentClass(data);

    renderStudentCode(data);

    renderStudentPhoto(data);

}





//======================================
// RENDER POPUP
//======================================

function renderPopup(data){

    renderStudent(data);

}





//======================================
// QUEUE BADGE
//======================================

function renderQueueBadge(){

    const count = queueLength();

    renderText(

        "queueCount",

        count

    );

    const badge = id("queueBadge");

    if(!badge){

        return;

    }

    if(count===0){

        hide(badge);

        return;

    }

    show(badge);

    if(App.syncing){

        badge.innerHTML=
        
            "<span class='queueIcon'>🔄</span> <span id='queueCount'>"
        
            + count +
        
            "</span>";
        
        badge.classList.add("syncing");

    }

    else{

        badge.innerHTML=
        
            "<span class='queueIcon'>📤</span> <span id='queueCount'>"
        
            + count +
        
            "</span>";

        badge.classList.remove("syncing");

    }

}


console.log("renderer.js loaded");
