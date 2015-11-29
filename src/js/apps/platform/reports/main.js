"use strict";

/******************************************************************************************

Labour Analysis main controller

******************************************************************************************/

require("./labourcost-controller.js");
require("./labourcost-service.js");

var app = angular.module("reports", [
	"labourcost.controller",
	"labourcost.service"
]);

app.config(["$routeProvider", function($routeProvider) {
	// Report routes
	$routeProvider.when("/report-labour-cost", { templateUrl: "labourcost-content.html" });
}]);

app.run(["$rootScope", "appsections", "navigation", function($rootScope, $appsections, $navigation) {
	// Add app button
	$appsections.add({
		title: "Reports",
		icon: "app-reports",
		app: "report-labour-cost",
		accesslist: [ "reports" ]
	});

	$navigation.add({
		reports: {
			pagetitle: "Reports",
			mainheading: "Labour cost report",
			labourreport: {
				title: "Labour cost report", icon: null,
				app: "report-labour-cost", command: null,
				action: false, back: false
			}
		}
	});
}]);
