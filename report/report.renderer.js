//======================================
// REPORT RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportRenderer = (()=>{

    //----------------------------------
    // SUMMARY
    //----------------------------------

    function renderSummary(data){
        Renderer.text("tongCount", data.total || 0);
        Renderer.text("leCount", data.le || 0);
        Renderer.text("glCount", data.giaoly || 0);
    }

    //----------------------------------
    // LIST
    //----------------------------------

    function renderList(list){
        let html = "";
        list.forEach(item=>{html += `
            <div class="report-row">
                <div class="report-left">
                    <div class="report-name">${item.hoten}</div>
                    <div class="report-class">${item.lop}</div>
                </div>

                <div class="report-right">
                    <div class="report-type">${item.loai}</div>
                    <div class="report-time">${item.gio}</div>
                </div>
            </div>`;});

        if(html===""){html=`
            <div class="report-row">Chưa có dữ liệu.</div>`;
                     }

        Renderer.html("reportList",html);
    }


    
    //----------------------------------

    return{renderSummary, renderList };

})();



    let processing = false;
