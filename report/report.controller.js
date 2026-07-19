//======================================
// REPORT CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportController = (()=>{

    //----------------------------------
    // LOAD
    //----------------------------------

    async function load(){

        try{

            Renderer.text("reportDate", Utils.formatDate());
console.log("lỗi 1");
            const data = await ReportService.load();
console.log("lỗi 2");
            if(!data || data.success===false){
                alert (data?.message || "Không tải được báo cáo.");
                return;
            }
console.log("lỗi 3");
            ReportRenderer.renderSummary(data);
console.log("lỗi 4");
            ReportRenderer.renderList(data.list || []);
        }

        catch(error){
            Debug.write(error);
            alert ("Lỗi tải báo cáo.");
        }

    }

    //----------------------------------
    // REFRESH
    //----------------------------------

    async function refresh() {await load();}

    //----------------------------------

    return{load, refresh};

})();
