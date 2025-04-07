sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    'sap/ui/Device',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, Device) {
        "use strict";

        return BaseController.extend("com.sap.myhr.controller.App", {
            onInit: function () {
                var oViewModel,
                    fnSetAppNotBusy,
                    iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

                oViewModel = new JSONModel({
                    busy: true,
                    delay: 0
                });
                this.setModel(oViewModel, "appView");
                //              metadata加载完成回调函数
                fnSetAppNotBusy = function () {
                    oViewModel.setProperty("/busy", false);
                    oViewModel.setProperty("/delay", iOriginalBusyDelay);
                };
                var oSideModel = new JSONModel({
                    selectedKey: "",
                    menu: {}
                });
                this.setModel(oSideModel, "side");
                this.getOwnerComponent().getModel().metadataLoaded()
                    .then(fnSetAppNotBusy);
                this.getOwnerComponent().getModel().read("/Menu", {
                    success: function (oData) {
                        const oMenu = this._transTree(oData.results);
                        this.getModel("side").setProperty("/menu", oMenu);
                    }.bind(this), error: function (oError) {

                    }
                })


                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
                this.getRouter().attachRouteMatched(this.onRouteChange.bind(this));


            },

            onRouteChange: function (oEvent) {
                var sName = oEvent.getParameter('name');
                this.getModel('side').setProperty('/selectedKey', sName);

                // if (Device.system.phone) {
                //     this.onSideNavButtonPress();
                // }
            },
            /**
             * Returns a promises which resolves with the resource bundle value of the given key <code>sI18nKey</code>
             *
             * @public
             * @param {string} sI18nKey The key
             * @param {string[]} [aPlaceholderValues] The values which will repalce the placeholders in the i18n value
             * @returns {Promise<string>} The promise
             */
            getBundleText: function (sI18nKey, aPlaceholderValues) {
                return this.getBundleTextByModel(sI18nKey, this.getModel("i18n"), aPlaceholderValues);
            },
            /**
             * transform menu data to tree structure
             * @param {Array} aData Menu data
             * @private
             * @returns 
             */
            _transTree: function (aData) {
                const aResult = [];
                const oMap = {};
                // check aData is Array
                if (!Array.isArray(aData)) {
                    return []
                }
                aData.forEach(oItem => {
                    // add a attribute named children to item
                    oItem.children = [];
                    // build a dictionary
                    const iKey = oItem.id;
                    oMap[iKey] = oItem;
                });

                aData.forEach(oItem => {
                    const parent = oMap[oItem.pid];
                    if (parent) {
                        // if has parent,add it to children attribute
                        parent.children.push(oItem);
                    } else {
                        // if no parent,add it to result
                        aResult.push(oItem);
                    }
                });

                return aResult;
            }
        });
    });
