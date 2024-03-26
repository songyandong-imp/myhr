sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    'sap/ui/Device',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,JSONModel,Device) {    
        "use strict";

        return BaseController.extend("com.sap.myhr.controller.App", {
            onInit: function () {
                var oSideModel = new JSONModel({
                    selectedKey: ""
                });
                this.setModel(oSideModel, "side");
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
                this.getRouter().attachRouteMatched(this.onRouteChange.bind(this));
            },
            onRouteChange: function (oEvent) {
                var sName = oEvent.getParameter('name');
                this.getModel('side').setProperty('/selectedKey', oEvent.getParameter('name'));

                if (Device.system.phone) {
                    this.onSideNavButtonPress();
                }
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
            }
        });
    });
