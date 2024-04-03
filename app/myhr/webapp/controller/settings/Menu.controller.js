sap.ui.define([
    "com/sap/myhr/controller/BaseController",
    "sap/ui/core/syncStyleClass",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, syncStyleClass, Fragment) {
        "use strict";

        return BaseController.extend("com.sap.myhr.controller.settings.Menu", {
            onInit: function () {
                this._oODataModel = this.getOwnerComponent().getModel();
                this.getRouter().getTargets().getTarget("menu").attachDisplay(null, this._onCreate, this);

            },
            /**
             * Event handle for save button was pressed
             * @param {sap.ui.base.Event} oEvent 
             */
            onSave: function (oEvent) {
                // var sPath = this.getView().getBindingContext().getPath();
                // var iPid = this.getModel().getProperty(sPath + "/pid");
                // if (iPid === 0) {
                //     this.getModel().setProperty(sPath + "/drillState", "leaf");
                // }

                this.getModel().submitChanges();
            },
            /**
             * Event handle for value help
             * @public
             */
            onValueHelpRequested: function () {
                if (!this._oValueHelpDialog) {
                    this._oValueHelpDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: "com.sap.myhr.view.settings.MenuValueHelpDialog",
                        controller: this
                    }).then(oDialog => {
                        syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
                        // connect dialog to the root view of this component (models, lifecycle)
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._oValueHelpDialog.then(oDialog => oDialog.open());
            },
            /**
             * Event handle for ok button was pressed
             * @param {sap.ui.base.Event} oEvent 
             * @function
             * @public
             */
            onValueHelpOkPress: function (oEvent) {
  
                const oTreeTable = this.byId("menu_tree_table");
                const aItemIndex = oTreeTable.getSelectedIndices();

                // check aItemIndex is array and is not empty
                if (Array.isArray(aItemIndex) && aItemIndex.length > 0) {
                    const oContent = oTreeTable.getContextByIndex(aItemIndex[0]);
                    const oData = oContent.getObject();
                    var sPath = this.getView().getBindingContext().getPath();
                    if (oData.hasOwnProperty("id")) {
                        this.getModel().setProperty(sPath + "/pid", oData.id);
                        this.byId("valueHelpDialog").close();
                    }
                }

            },
            /**
             * Event handle for closing dialog
             * @function
             * @public
             */
            onValueHelpCancelPress: function () {
                this.byId("valueHelpDialog").close();
            },


            /**
             * create entity for default model
             * @param {sap.ui.base.Event} oEvent 
             * @private
             */
            _onCreate: function (oEvent) {
                var oContext = this._oODataModel.createEntry("/Menu", {
                    // set defaule value
                    properties: { pid: 0 },
                    success: this._fnEntityCreated.bind(this),
                    error: this._fnEntityCreationFailed.bind(this)
                });

                this.getView().setBindingContext(oContext);
            },
            /**
             * Handles the success of creating an object
             *@param {object} oData the response of the save action
             * @private
             */
            _fnEntityCreated: function (oData) {
                var sObjectPath = this.getModel().createKey("Menu", oData);
            },

            /**
             * Handles the failure of creating/updating an object
             * @private
             */
            _fnEntityCreationFailed: function () {
                this.getModel("appView").setProperty("/busy", false);
            },
        });
    });