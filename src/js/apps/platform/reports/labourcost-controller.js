"use strict";

/******************************************************************************************

Labour Cost Report controller

******************************************************************************************/

var app = angular.module("labourcost.controller", [
	"labourcost.service"
]);

app.controller("ctrlLabourCost", ["$rootScope", "$scope", "navigation", "labourcost", function LabourCostCtrl($rootScope, $scope, $navigation, $labourcost) {
	// Set the navigation tabs
	$navigation.select({
		forward: "reports",
		selected: "labourreport"
	});

	$labourcost.getCostReport().then(function(costReport) {
		$scope.costReport = costReport;
	});
}]);
