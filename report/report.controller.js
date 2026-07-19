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

            const data = await ReportService.load();

            if(!data || data.success===false){
                PopupService.error(data?.message || "Không tải được báo cáo.");
                return;
            }

            ReportRenderer.renderSummary(data);

            ReportRenderer.renderList(data.list || []);
        }

        catch(error){
            Debug.write(error);
            PopupService.error("Lỗi tải báo cáo.");
        }

    }

    //----------------------------------
    // REFRESH
    //----------------------------------

    async function refresh() {await load();}

    //----------------------------------

    return{load, refresh};

})();
