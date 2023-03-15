sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/base/Log",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/m/ColumnListItem",
    "sap/m/Input",
    "sap/ui/core/Fragment",
],

    function (MessageToast, Controller, Device, Log, Filter, JSONModel, ColumnListItem, Input, Fragment) {
        "use strict";

        return Controller.extend("project1.controller.VehicleMaster", {
            onInit: function () {
                var VechicleData = {
                    VechicleNo: "",
                    VechicelType: "",
                    FuelType: "",
                    EngineCapacity: "",
                    MotorCertificate: "",
                    LastMotorMilage: "",
                    MotorDueDate: "",
                    TaxReferenc: "",
                    TaxDueDate: "",
                    InsuranceCertificateNo: "",
                    InsuranceDate: "",
                    IncStatus: "",
                    DriverLicenseNo: "",
                    DriverName: "",
                    ExpiryDate: "",
                    LicensePoints: "",
                    LastUpdatedDate: "",
                    StartDate: "",
                    EndDate: "",
                    MOTValidUpto: "",
                    Status: "",
                    Approver: "",
                    TaxValidUpto: "",
                    TaxType: "",
                    TaxAmount: ""
                },
                    oModel = new JSONModel(VechicleData);
                this.getView().setModel(oModel, "Vechicle");

                var oData = {
                    value: false,
                    value1: false,
                    value2: false,
                    value3: false,
                    value4: false
                },
                    oModelVisiblity = new JSONModel(oData);
                this.getView().setModel(oModelVisiblity, "Visiblity");

                var vehicleData = this.getOwnerComponent().getModel("device").getProperty("/data");
                if (vehicleData !== undefined) {
                    if (vehicleData.length > 0) {
                        this.onPressGoToDetail(false, vehicleData);
                    }
                }

            },
            getElementUsingId: function (Id) {
                var element = sap.ui.core.Fragment.byId(this.getView().getId() + "--ADD--", Id);
                return element;
            },


            onPressGoToDetail: function (oEvent, vehicleData) {
                if (!oEvent) {
                    this.sNumber = vehicleData[0];
                } else {                   
                    this.sNumber = oEvent.getSource().mProperties.title;                  
                }
                this.getView().byId("detail").setVisible(true);
                this.getView().byId("_IDForm1").bindElement("/VehicleDetail('" + this.sNumber + "')");
                var oTemp = new ColumnListItem({
                    cells: [
                        new Input({
                            value: "{insurcert}",
                            editable: "{Visiblity>/value1}"
                        }), new Input({
                            value: "{insurancedate}",
                            editable: "{Visiblity>/value1}"
                        }), new Input({
                            value: "{status}",
                            editable: "{Visiblity>/value1}"
                        })
                    ]
                });

                var oFilters = [new sap.ui.model.Filter("vannum", sap.ui.model.FilterOperator.EQ, this.sNumber)];
                this.getView().byId("idInsTable").bindItems({
                    path: '/Insurance',
                    template: oTemp,
                    filters: oFilters,
                });

                var oTempDriv = new ColumnListItem({
                    cells: [
                        new Input({
                            value: "{driverlic}",
                            editable: "{Visiblity>/value2}"
                        }), new Input({
                            value: "{drivername}",
                            editable: "{Visiblity>/value2}"
                        }), new Input({
                            value: "{driverlicexp}",
                            editable: "{Visiblity>/value2}"
                        }),
                        new Input({
                            value: "{driverlicpts}",
                            editable: "{Visiblity>/value2}"
                        }),
                        new Input({
                            value: "{lastupdate}",
                            editable: "{Visiblity>/value2}"
                        }),
                        new Input({
                            value: "{startdate}",
                            editable: "{Visiblity>/value2}"
                        }),
                        new Input({
                            value: "{enddate}",
                            editable: "{Visiblity>/value2}"
                        })
                    ]
                });

                this.getView().byId("idDrivTable").bindItems({
                    path: '/Driver',
                    template: oTempDriv,
                    filters: oFilters,
                });

                var oTemplateMot = new ColumnListItem({
                    cells: [
                        new Input({
                            value: "{lastupdate}",
                            editable: "{Visiblity>/value3}"

                        }),
                        new Input({
                            value: "{status}",
                            editable: "{Visiblity>/value3}"

                        }),
                        new Input({
                            value: "{ApproverName}",
                            editable: "{Visiblity>/value3}"

                        })
                    ]
                });

                this.getView().byId("_idMotTable").bindItems({
                    path: '/Mot',
                    template: oTemplateMot,
                    filters: oFilters,
                });

                var oTemplateTax = new ColumnListItem({
                    cells: [
                        new Input({
                            value: "{lastupdate}",
                            editable: "{Visiblity>/value4}"

                        }),
                        new Input({
                            value: "{TaxType}",
                            editable: "{Visiblity>/value4}"
                        }),
                        new Input({
                            value: "{TaxAmount}",
                            editable: "{Visiblity>/value4}"

                        })
                    ]
                });

                this.getView().byId("_idTable").bindItems({
                    path: '/Tax',
                    template: oTemplateTax,
                    filters: oFilters,
                });
            },

            changeFieldVisiblity: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value = true;
                this.getView().getModel("Visiblity").setData(oData);
            },

            changeFieldVisiblityFalse: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value = false;
                this.getView().getModel("Visiblity").setData(oData);
            },

            onEdit: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value1 = true;
                this.getView().getModel("Visiblity").setData(oData);
            },
            onEditDriver: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value2 = true;
                this.getView().getModel("Visiblity").setData(oData);
            },
            onEditMOT: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value3 = true;
                this.getView().getModel("Visiblity").setData(oData);
            },
            onEditTax: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value4 = true;
                this.getView().getModel("Visiblity").setData(oData);
            },
            changeInsuranceFieldVisiblityFalse: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value1 = false;
                this.getView().getModel("Visiblity").setData(oData);
            },
            changeDriverFieldVisiblity: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value2 = false;
                this.getView().getModel("Visiblity").setData(oData);
            },
            changeMOTFieldVisiblity: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value3 = false;
                this.getView().getModel("Visiblity").setData(oData);
            },
            changeTaxFieldVisiblity: function () {
                var oData = this.getView().getModel("Visiblity").getData();
                oData.value4 = false;
                this.getView().getModel("Visiblity").setData(oData);
            },


            // onSearch: function () {
            //     var oView = this.getView(),
            //         sValue = oView.byId("searchField").getValue(),
            //         oFilter = new Filter("vannum", sap.ui.model.FilterOperator.StartsWith, sValue);

            //     oView.byId("_IDGenList1").getBinding("items").filter(oFilter, sap.ui.model.FilterType.Application);
            // },

            onSuggest: function () {

            },

            onUploadFile: function () {
                //This code is used for uploading xlsx sheets

                var oFileUpload = this.getElementUsingId("fileUploader");
                var domRef = oFileUpload.oFileUpload;
                var file = domRef.files[0];
                var that = this;

                this.fileName = this.getElementUsingId("fileUploader")
                    .getValue() + ".csv";
                this.fileType = file.type;
                this.json_object = null;

                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    //console.log(workbook);

                    workbook.SheetNames.forEach(function (sheetName) {

                        var XL_row_object =
                            XLSX.utils.sheet_to_row_object_array(
                                workbook.Sheets[sheetName]);
                        if (XL_row_object.length !== 0) {

                            that.callBackend(XL_row_object);

                        }

                    })

                };
                reader.onerror = function (ex) {
                    alert("error");
                };

                reader.readAsBinaryString(file);

            },

            callBackend: function (XL_row_object) {
                var oModel = this.getOwnerComponent().getModel(),
                    payloadDataobj,
                    vehicledetailObj,
                    insuranceObj,
                    driverObj,
                    oBindingListMaster = this.byId("_IDGenList1").getBinding("items"),
                    // oModel.setHeaders({
                    //     "content-type": "application/json;charset=uif-8"
                    // });

                    dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });

                for (var i = 0; i < XL_row_object.length; i++) {
                    if (XL_row_object[i].Vechicle_No) {
                        payloadDataobj = {
                            "vannum": XL_row_object[i].Vechicle_No,
                            "vehicletype": XL_row_object[i].Vechicle_Type,
                            "fueltype": XL_row_object[i].Fuel_Type,
                        };
                        //payloadData.push(payloadDataobj);
                    }


                    oBindingListMaster.create(payloadDataobj);

                    var oBindingVehicleDetail = this.getView().getModel().bindList("/VehicleDetail");

                    if (XL_row_object[i].Vechicle_No) {
                        vehicledetailObj = {
                            "det_vannum": XL_row_object[i].Vechicle_No,
                            "enginecap": XL_row_object[i].Engine_Capacity,
                            "motcert": XL_row_object[i].Motor_Certificate,
                            "lastmotmleage": XL_row_object[i].Last_Motor_Milage,
                            "motduedate": dateFormat.format(new Date(XL_row_object[i].Motor_Due_Date)),
                            "taxrefNo": XL_row_object[i].Tax_Referenc,
                            "taxduedate": dateFormat.format(new Date(XL_row_object[i].Tax_Due_Date)),
                        }
                        oBindingVehicleDetail.create(vehicledetailObj);
                    }


                    var oBindingVehicleDetail = this.getView().getModel().bindList("/Insurance");
                    if (XL_row_object[i].Vechicle_No && XL_row_object[i].Insurance_Certificate) {
                        insuranceObj = {
                            "insurcert": XL_row_object[i].Insurance_Certificate,
                            "vannum": XL_row_object[i].Vechicle_No,
                            "insurancedate": dateFormat.format(new Date(XL_row_object[i].Insurance_Date)),
                            "status": XL_row_object[i].Insurance_Status
                        }
                        oBindingVehicleDetail.create(insuranceObj);
                    }


                    var oBindingVehicleDetail = this.getView().getModel().bindList("/Driver");

                    if (XL_row_object[i].Vechicle_No && XL_row_object[i].Driver_License_No) {
                        driverObj = {
                            "driverlic": XL_row_object[i].Driver_License_No,
                            "vannum": XL_row_object[i].Vechicle_No,
                            "drivername": XL_row_object[i].Driver_Name,
                            "driverlicexp": dateFormat.format(new Date(XL_row_object[i].License_Expiry_Data)),
                            "driverlicpts": XL_row_object[i].License_Points,
                            "lastupdate": dateFormat.format(new Date(XL_row_object[i].Last_Updated_Data)),
                            "startdate": dateFormat.format(new Date(XL_row_object[i].Start_Date)),
                            "enddate": dateFormat.format(new Date(XL_row_object[i].End_Date)),
                        }
                        oBindingVehicleDetail.create(driverObj);
                    }
                    var oBindingMot = this.getView().getModel().bindList("/Mot"),
                        MotObj = {
                            "vannum": XL_row_object[i].Vechicle_No,
                            "lastupdate": dateFormat.format(new Date(XL_row_object[i].Mot_Valid_upto)),
                            "status": XL_row_object[i].Mot_Status,
                            "ApproverName": XL_row_object[i].Approver,
                        };
                    oBindingMot.create(MotObj);

                    var oBindingMot = this.getView().getModel().bindList("/Tax"),
                        MotObj = {
                            "vannum": XL_row_object[i].Vechicle_No,
                            "lastupdate": dateFormat.format(new Date(XL_row_object[i].Tax_Valid_Upto)),
                            "TaxType": XL_row_object[i].Tax_Type,
                            "TaxAmount": XL_row_object[i].Tax_Amount,
                        };
                    oBindingMot.create(MotObj);
                }
                this._valueHelpDialog.close();
            },

            addNewVehicle: function () {
                if (!this._valueHelpDialog) {
                    Fragment.load({
                        id: this.getView().getId() + "--ADD--",
                        name: "project1.fragments.CreateNew",
                        controller: this
                    }).then(function (frg) {
                        this._valueHelpDialog = new sap.m.Dialog({
                            title: "Create Record For New Vechicle",
                            content: frg,
                            contentWidth: "90%",
                            beginButton: new sap.m.Button({
                                type: sap.m.ButtonType.Emphasized,
                                text: "Save",
                                press: function () {
                                    this.saveNewRecord();
                                }.bind(this)
                            }),
                            endButton: new sap.m.Button({
                                text: "Cancel",
                                press: function () {
                                    this._valueHelpDialog.close();
                                }.bind(this)
                            })
                        });
                        this.getView().addDependent(this._valueHelpDialog);
                        this._valueHelpDialog.open();
                    }.bind(this));
                } else {
                    this._valueHelpDialog.open();
                }

            },
            // onaddInsuranceRow: function () {

            //     var oItem = new sap.m.ColumnListItem({
            //         cells: [new sap.m.Input({
            //             value: "{Vechicle>/InsuranceCertificateNo}",
            //             editable: "{Visiblity>/value1}"
            //         }), new sap.m.Input({
            //             value: "{Vechicle>/InsuranceDate}",
            //             editable: "{Visiblity>/value1}"
            //         })]
            //     });

            //     var oTable = this.getView().byId("idInsTable");
            //     oTable.addItem(oItem);
            // },
            onaddInsuranceRow: function () {
                var oBindingVehicleInc = this.getView().byId("idInsTable").getBinding("items"),
                    //vechicleData = this.getView().getModel("Vechicle").getData(),
                    //dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" }),
                    insuranceObj = {
                        "insurcert": "",
                        "vannum": this.sNumber,
                        "insurancedate": ""
                    };
                oBindingVehicleInc.create(insuranceObj);
            },
            // onaddDriverRow: function () {

            //     var oItem = new sap.m.ColumnListItem({
            //         cells: [new sap.m.Input({
            //             value: "{Vechicle>/DriverLicenseNo}",
            //             editable: "{Visiblity>/value1}"
            //         }), new sap.m.Input({
            //             value: "{Vechicle>/DriverName}",
            //             editable: "{Visiblity>/value1}"
            //         }),
            //         new sap.m.Input({
            //             value: "{Vechicle>/ExpiryDate}",
            //             editable: "{Visiblity>/value1}"
            //         }),
            //         new sap.m.Input({
            //             value: "{Vechicle>/LicensePoints}",
            //             editable: "{Visiblity>/value1}"
            //         }),
            //         new sap.m.Input({
            //             value: "{Vechicle>/LastUpdatedDate}",
            //             editable: "{Visiblity>/value1}"
            //         }),
            //         new sap.m.Input({
            //             value: "{Vechicle>/StartDate}",
            //             editable: "{Visiblity>/value1}"
            //         }),
            //         new sap.m.Input({
            //             value: "{Vechicle>/EndDate}",
            //             editable: "{Visiblity>/value1}"
            //         })]
            //     });

            //     var oTable = this.getView().byId("idInsTable");
            //     oTable.addItem(oItem);
            // },
            onaddDriverRow: function () {
                var oBindingVehicleDetail = this.getView().byId("idDrivTable").getBinding("items"),
                    // dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" }),
                    // vechicleData = this.getView().getModel("Vechicle").getData(),
                    driverObj = {
                        "driverlic": "",
                        "vannum": this.sNumber,
                        "drivername": "",
                        "driverlicexp": "",
                        "driverlicpts": "",
                        "lastupdate": "",
                        "startdate": "",
                        "enddate": "",
                    };
                oBindingVehicleDetail.create(driverObj);
            },
            saveNewRecord: function () {
                var vechicleData = this.getView().getModel("Vechicle").getData();
                vechicleData.FuelType = this.getElementUsingId("_IDLabelFuTypeSelect").getSelectedKey();

                var oBindingListMaster = this.byId("_IDGenList1").getBinding("items")
                if (vechicleData.VechicleNo) {
                    var payloadDataobj = {
                        "vannum": vechicleData.VechicleNo,
                        "vehicletype": vechicleData.VechicelType,
                        "fueltype": vechicleData.FuelType,

                    };
                    oBindingListMaster.create(payloadDataobj);
                }

                var oBindingVehicleDetail = this.getView().getModel().bindList("/VehicleDetail");
                if (vechicleData.VechicleNo) {
                    var vehicledetailObj = {
                        "det_vannum": vechicleData.VechicleNo,
                        "enginecap": vechicleData.EngineCapacity,
                        "motcert": vechicleData.MotorCertificate,
                        "lastmotmleage": vechicleData.LastMotorMilage,
                        "motduedate": vechicleData.MotorDueDate,
                        "taxrefNo": vechicleData.TaxReferenc,
                        "taxduedate": vechicleData.TaxDueDate
                    }
                    oBindingVehicleDetail.create(vehicledetailObj);
                }

                var oBindingVehicleInsurance = this.getView().getModel().bindList("/Insurance");
                if (vechicleData.VechicleNo && vechicleData.InsuranceCertificateNo) {
                    var insuranceObj = {
                        "insurcert": vechicleData.InsuranceCertificateNo,
                        "vannum": vechicleData.VechicleNo,
                        "insurancedate": vechicleData.InsuranceDate,
                        "status": vechicleData.IncStatus
                    };
                    oBindingVehicleInsurance.create(insuranceObj);
                }

                var oBindingVehicleDriver = this.getView().getModel().bindList("/Driver"),
                    driverObj = {
                        "driverlic": vechicleData.DriverLicenseNo,
                        "vannum": vechicleData.VechicleNo,
                        "drivername": vechicleData.DriverName,
                        "driverlicexp": vechicleData.ExpiryDate,
                        "driverlicpts": vechicleData.LicensePoints,
                        "lastupdate": vechicleData.LastUpdatedDate,
                        "startdate": vechicleData.StartDate,
                        "enddate": vechicleData.EndDate,
                    };
                oBindingVehicleDriver.create(driverObj);

                var oBindingMot = this.getView().getModel().bindList("/Mot"),
                    MotObj = {
                        "vannum": vechicleData.VechicleNo,
                        "lastupdate": vechicleData.MOTValidUpto,
                        "status": vechicleData.Status,
                        "ApproverName": vechicleData.Approver,
                    };
                oBindingMot.create(MotObj);

                var oBindingMot = this.getView().getModel().bindList("/Tax"),
                    MotObj = {
                        "vannum": vechicleData.VechicleNo,
                        "lastupdate": vechicleData.TaxValidUpto,
                        "TaxType": vechicleData.TaxType,
                        "TaxAmount": vechicleData.TaxAmount,
                    };
                oBindingMot.create(MotObj);

                this._valueHelpDialog.close();
            },
            onSearch: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("vannum", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                // update list binding
                var oList = this.byId("_IDGenList1");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }
        });
    })
