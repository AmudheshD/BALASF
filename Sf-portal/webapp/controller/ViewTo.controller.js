/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (Controller, History,MessageToast) {
	"use strict";

	return Controller.extend("test.routing-sample.controller.ViewTo", {

		//Attarch event
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("TargetViewToParameter").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			
			alert(oEvent.getParameter("arguments").parameter.split(';'));

		},
		onNavBack: function (oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetViewFrom", true);
			}
		},
		onRes:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TargetViewRes", {});
		},
		onResWithParameter: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetViewToRes", {
					parameter: "test"
				});
			},
			onPress: function() {
			var id = this.getView().byId("user");
			var pwd = this.getView().byId("pass");
			var x = "/sap/opu/odata/sap/ZBK_SF_ODATA_SRV/";
			var mod = new sap.ui.model.odata.ODataModel(x, true);
			var url = "WfPasswrd='" + pwd.getValue() + "',Id='" + id.getValue() + "'";
			mod.read("/zod_sf_loginSet(" + url + ")", {
				
				success: function(oData, oResponse) {
					window.console.log(oData);
					if (oData.Status === "Success") {
						var successmeg = "Login was successfull";
						MessageToast.show(successmeg);
						var obj = sap.ui.core.UIComponent.getRouterFor(this);
						obj.navTo("TargetViewRes");

					} else {
						var failmeg = "Check your credintials";
						MessageToast.show(failmeg);
					}
				}.bind(this)
			});

		}
	});

});