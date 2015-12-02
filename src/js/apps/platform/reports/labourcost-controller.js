"use strict";

/******************************************************************************************

Labour Cost Report controller

******************************************************************************************/

var SORT_FIELD_DEFAULT = "name";
var SORT_REVERSE_DEFAULT = false;

var app = angular.module("labourcost.controller", [
	"labourcost.service"
]);

app.controller("ctrlLabourCost", ["$rootScope", "$scope", "$filter", "navigation", "labourcost", function LabourCostCtrl($rootScope, $scope, $filter, $navigation, $labourcost) {
	// Set the navigation tabs
	$navigation.select({
		forward: "reports",
		selected: "labourreport"
	});

    this.costReport = null;

	$labourcost.getCostReport().then(function(costReport) {
        this.setData(costReport);
	}.bind(this));

    $scope.costProviders = null;
    $scope.costDirectContractors = null;

    $scope.sortField = SORT_FIELD_DEFAULT;
    $scope.sortReverse = SORT_REVERSE_DEFAULT;

    this.setData = function (costReport) {
        this.costReport = costReport;

        $scope.costProviders = this.costReport.providers;
        $scope.costDirectContractors = this.costReport.directContractors;
        $scope.costTotal = this.costReport.total;

        this.applySort();
    }.bind(this);

    $scope.toggleSort = function (field, reverse) {
        if (field === $scope.sortField) {
            $scope.sortReverse = !$scope.sortReverse;
        }
        else {
            $scope.sortField = field;
            $scope.sortReverse = reverse;
        }

        this.applySort();
    }.bind(this);

    this.applySort = function () {
        var costProviders = this.costReport.providers;
        var costDirectContractors = this.costReport.directContractors;

        if ($scope.sortField !== "name") {
            costProviders = costProviders.concat(costDirectContractors);
            costDirectContractors = null;
        }

        $scope.costProviders = costProviders;
        $scope.costDirectContractors = costDirectContractors;
        $scope.costTotal = this.costReport.total;
    }

    $scope.isSortBy = function (field, reverse) {
        return field === $scope.sortField && (reverse === undefined ? true : reverse === $scope.sortReverse);
    }.bind(this);
}]);
