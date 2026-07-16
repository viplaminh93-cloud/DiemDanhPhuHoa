//==================================================
// STUDENTS CONTROLLER
//
// Điều phối module Students
//
//==================================================

"use strict";

Auth.requireLogin();

//======================================
// INIT
//======================================

window.addEventListener(

    "load",

    initStudents

);

//======================================
// INIT
//======================================

async function initStudents(){

    await StudentService.load();

    StudentRenderer.renderList(

        StudentService.getAll()

    );

}

//======================================
// SEARCH
//======================================

id("txtSearch").addEventListener(

    "input",

    onSearch

);

function onSearch(){

    const keyword =

        id("txtSearch")

        .value

        .trim()

        .toLowerCase();

    if(keyword===""){

        StudentRenderer.renderList(

            StudentService.getAll()

        );

        return;

    }

    StudentRenderer.renderList(

        StudentService.search(keyword)

    );

}

//======================================
// CLOSE MODAL
//======================================

id("studentModal")

.addEventListener(

    "click",

    e=>{

        if(

            e.target.id==="studentModal"

        ){

            StudentRenderer.closeModal();

        }

    }

);
