sap.ui.define([
    "com/sap/myhr/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/base/Log",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, Log,Spreadsheet,exportLibrary) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        return BaseController.extend("com.sap.myhr.controller.recruitManagerment.recruitPage", {
            onInit: function () {
                // const actionModel = new JSONModel(sap.ui.require.toUrl("com/sap/myhr/model/actionSelect.json"));
                // this.setModel(actionModel, "actionModel");
                // actionModel.attachRequestCompleted(() => {
                //     const oData = actionModel.getData();
                //     oData.ActionSet.push({
                //         Key: "C",
                //         Value: "查看全部数据"
                //     });
                //     actionModel.setData(oData);

                // })

                // this.getRouter().getRoute("jdBase").attachPatternMatched(this._onPatternMatched, this);
                // this.getRouter().attachRouteMatched(this._onRouteMatched, this);
                // Log.info("onInit...................");
            },
            _onRouteMatched: function (oEvent) {
                var sPath = oEvent.getParameter("name");
                Log.info("onRouteMatched..................." + sPath);
                // leave current page
                if (sPath === "jdBase") {
                    const oPage = this.byId("recruitPage");
                    oPage.removeAllContent();
                    oPage.insertContent()
                }
            },
            onSave: function (oEvent) {
                this.getModel().submitChanges();
            },
            onUpload: function (oEvent) {
                var oArr = [{ id: 2000, description: "测试2000" }, { id: 3000, description: "测试3000" }];
                var oTable = this.byId("customerTable");
                var oBinding =  oTable.getBinding("rows");
                var sPath = oBinding.getPath();
                var oModel = this.getModel();
                var oContext = oModel.createEntry("/Menu", {
                    properties: { id: 2000, description: "测试2000" },
                });
                var sNewPath = oContext.getPath();
                oTable.bindRows(sNewPath);
          


            },
            onExport: function() {
                var aCols, oRowBinding, oSettings, oSheet, oTable;
    
                if (!this._oTable) {
                    this._oTable = this.byId("customerTable");
                }
    
                oTable = this._oTable;
                oRowBinding = oTable.getBinding("rows");
                aCols = this._createColumnConfig();
    
                var oModel = oRowBinding.getModel();
    
                oSettings = {
                    workbook: {
                        columns: aCols,
                        context:{
                            sheetName: 'Custom metadata'
                        }
                    },
                    dataSource: {
                        type: "odata",
                        dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
                        serviceUrl: null,
                        headers: oModel.getHeaders ? oModel.getHeaders() : null,
                        count: oRowBinding.getLength ? oRowBinding.getLength() : null,
                        useBatch: true // Default for ODataModel V2
                    },
                    fileName: "Table export sample.xlsx",
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
    
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
            },
            _createColumnConfig: function() {
                var aCols = [];
    
                aCols.push({
                    label:"编号",
                    property: "id",
                    type: EdmType.Number
                });
    
                aCols.push({
                    Label:"描述",
                    property: "description",
                    type: EdmType.String
                });
    
    
                return aCols;
            }


        });
    });
