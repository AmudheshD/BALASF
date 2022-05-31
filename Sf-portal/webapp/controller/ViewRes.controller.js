/*eslint-disable no-console, no-alert */
sap.ui.define([
			"sap/ui/core/mvc/Controller",
			"sap/ui/core/routing/History",
			"sap/ui/model/json/JSONModel"
		], function(Controller, History, JSONModel) {
			"use strict";

			return Controller.extend("test.routing-sample.controller.ViewRes", {

				//Attarch event
			onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("TargetViewResParameter").attachPatternMatched(this._onRouteMatched, this);

		},

		_onRouteMatched: function(oEvent) {

			alert(oEvent.getParameter("arguments").parameter.split(';'));

		},
		onNavBack: function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetViewFrom", true);
			}
		},
		notiRes: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TargetPlannedOrder", {});
		},
		workorderRes:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TargetProductionOrder", {});
		}

					});

			});