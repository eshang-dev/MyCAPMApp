sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel) {
        "use strict";
        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, "viewModel");
                this.callVehicleHeader();
            },
            callVehicleHeader: function () {
                var List = this.getOwnerComponent().getModel().bindList("/Vehicleheader");
                List.requestContexts().then(function (aContexts) {
                    var VehiclesData = {
                        "noOfVehicles": aContexts.length
                    };
                    this.getView().getModel("viewModel").setData(VehiclesData);
                    this.getOwnerComponent().getModel("device").setProperty("/data", aContexts, null, true);
                }.bind(this));
            },
            loadVehicleDetail: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView2");
            },
            showExpiryDetails: function () {
                if (!this.ExpiryDialog) {
                    Fragment.load({
                        id: this.getView().getId() + "--Expiry--",
                        name: "project1.fragments.ExpiredDetail",
                        Controller: this,
                    }).then(function (frg) {
                        this.ExpiryDialog = new sap.m.Dialog({
                            title: "Expiry Details",
                            content: frg,
                            contentWidth: "100%",
                            beginButton: new sap.m.Button({
                                type: sap.m.ButtonType.Emphasized,
                                text: "Notify",
                                press: function () {
                                    this.sendNotification();
                                }.bind(this)
                            }),
                            endButton: new sap.m.Button({
                                text: "Cancel",
                                press: function () {
                                    this.ExpiryDialog.close();
                                }.bind(this)
                            })
                        });
                        this.getView().addDependent(this.ExpiryDialog);
                        this.ExpiryDialog.open();
                    }.bind(this));
                } else {
                    this.getView().addDependent(this.ExpiryDialog);
                    this.ExpiryDialog.open();
                }
                var List = this.getOwnerComponent().getModel().bindList("/Expiry");
                var viewData = this.getView().getModel("viewModel").getData();
                List.requestContexts().then(function (aContexts) {
                    viewData.ExpiryData = aContexts;
                    this.getView().getModel("viewModel").setData(viewData);
                }.bind(this));
            },
            sendNotification: function () {
                var List = this.getOwnerComponent().getModel().bindList("/MailGet");
                List.requestContexts().then(function (aContexts) {
                    var ExpiryData = aContexts;
                    this.getView().getModel("viewModel").setData(viewData);
                }.bind(this));
            }
        });
    });
